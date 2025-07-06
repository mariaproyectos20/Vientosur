import React, { useState } from 'react';
import MediaUploader from './MediaUploader';

interface MediaUploadFlowProps {
  onMediaReady: (file: File, url: string, type: 'image' | 'video') => void;
}

export default function MediaUploadFlow({ onMediaReady }: MediaUploadFlowProps) {
  const [step, setStep] = useState<'select' | 'crop' | 'done'>('select');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-2 py-1 rounded ${mediaType === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setMediaType('image')}
        >Imagen</button>
        <button
          className={`px-2 py-1 rounded ${mediaType === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setMediaType('video')}
        >Video</button>
      </div>
      <MediaUploader
        type={mediaType}
        onUpload={(file, url) => {
          onMediaReady(file, url, mediaType);
          setStep('done');
        }}
      />
    </div>
  );
}
