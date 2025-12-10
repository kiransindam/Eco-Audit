import React, { useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import GlassCard from './GlassCard';
import { FileWithPreview } from '../types';

interface FileUploadProps {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileWithPreview[];
      setFiles((prev) => [...prev, ...newFiles].slice(0, 3)); // Limit to 3
    }
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <GlassCard className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-[#00F5A8]" />
        Workspace Visuals
      </h3>
      
      <div className="flex-1 flex flex-col gap-4">
        {files.length < 3 && (
          <label className="flex-1 border-2 border-dashed border-white/20 rounded-xl hover:border-[#00F5A8] hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px] group">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="p-4 rounded-full bg-white/5 group-hover:bg-[#00F5A8]/20 transition-colors mb-3">
              <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#00F5A8]" />
            </div>
            <p className="text-sm text-gray-300 font-medium">Click to upload photos</p>
            <p className="text-xs text-gray-500 mt-1">Upload 1-3 images (JPG, PNG)</p>
          </label>
        )}

        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {files.map((file) => (
              <div key={file.name} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                <img
                  src={file.preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFile(file.name)}
                  className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default FileUpload;