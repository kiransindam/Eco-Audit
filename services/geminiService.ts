import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AuditReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    ecoScore: {
      type: Type.NUMBER,
      description: "A score from 0 to 100 representing sustainability level based on visuals and description.",
    },
    scoreLabel: {
      type: Type.STRING,
      description: "A short label for the score (e.g., 'Getting Started', 'Needs Improvement', 'Eco-Conscious').",
    },
    summary: {
        type: Type.STRING,
        description: "A 2-sentence executive summary of the findings.",
    },
    keyObservations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          issue: { type: Type.STRING, description: "The core issue observed (e.g., 'Single-use Plastics')." },
          detail: { type: Type.STRING, description: "Specific detail grounded in the image (e.g., 'Styrofoam containers visible in prep area')." },
        },
        required: ["issue", "detail"],
      },
    },
    impactContext: {
      type: Type.STRING,
      description: "A data-informed statement about the environmental consequence (e.g., 'This volume of plastic waste contributes to ~X kg of landfill annually').",
    },
    actionableSteps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Action title." },
          description: { type: Type.STRING, description: "Specific, practical advice." },
          impactLevel: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
        },
        required: ["title", "description", "impactLevel"],
      },
    },
  },
  required: ["ecoScore", "scoreLabel", "keyObservations", "impactContext", "actionableSteps", "summary"],
};

export const fileToPart = (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateEcoAudit = async (
  files: File[],
  description: string
): Promise<AuditReport> => {
  try {
    const imageParts = await Promise.all(files.map(fileToPart));

    const prompt = `
      You are an elite sustainability auditor for small and medium businesses (B2B). 
      Analyze the attached images of a business workspace/operations and the provided description: "${description}".
      
      Your goal is to provide a specific, non-generic, and data-informed sustainability audit.
      
      1. Analyze visuals for waste, energy inefficiency, material usage, and layout issues.
      2. Analyze the text for context on operations.
      3. Calculate a realistic EcoScore (0-100). Be strict but fair.
      4. Provide specific observations proving you "looked" at the image.
      5. Suggest high-impact, low-cost actions suitable for a small business.
      
      Be professional, empowering, and solution-focused.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [...imageParts, { text: prompt }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a helpful expert consultant.",
        temperature: 0.4, 
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AuditReport;
    } else {
      throw new Error("No response generated");
    }
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    throw error;
  }
};
