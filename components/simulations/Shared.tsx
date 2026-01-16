
import React, { useRef } from 'react';
import { Upload, Camera } from 'lucide-react';
import { LessonId } from '../../types';

export interface SimulationProps {
  lessonId: LessonId;
  globalImage?: string | null;
  setGlobalImage?: (url: string) => void;
}

export interface PostProdProps {
    image: string;
    onUpload: (url: string) => void;
}

// --- HELPER: IMAGE UPLOADER ---
export const ImageUploader: React.FC<{ onUpload: (url: string) => void }> = ({ onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                alert('Unsupported file format. Please upload JPEG, PNG, or WebP.');
                return;
            }
            const url = URL.createObjectURL(file);
            onUpload(url);
        }
    };
    return (
        <>
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-md transition-all border border-white/10 shadow-lg group"
                title="Upload Custom Image"
            >
                <Upload size={16} className="group-hover:scale-110 transition-transform"/>
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFile} 
                className="hidden" 
                accept="image/jpeg, image/png, image/webp" 
            />
        </>
    );
};

// --- GENERIC PLACEHOLDER ---
export const PlaceholderSim: React.FC<{ title: string }> = ({ title }) => (
    <div className="h-[50vh] min-h-[300px] flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/50 rounded-2xl border border-zinc-800">
        <Camera size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">Visualizer for {title}</p>
        <p className="text-sm">Interactive module coming soon.</p>
    </div>
);
