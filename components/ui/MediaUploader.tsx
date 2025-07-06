import React, { useState, useCallback } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import ReactCrop, { Crop } from 'react-image-crop';
import imageCompression from 'browser-image-compression';
import 'react-image-crop/dist/ReactCrop.css';

type Aspect = 1 | 0.8 | 1.91; // 1:1, 4:5, 1.91:1

const ASPECTS: { label: string; value: Aspect }[] = [
  { label: '1:1', value: 1 },
  { label: '4:5', value: 0.8 },
  { label: '1.91:1', value: 1.91 },
];

interface MediaUploaderProps {
  onUpload: (file: File, preview: string) => void;
  type: 'image' | 'video';
}

export default function MediaUploader({ onUpload, type }: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspect, setAspect] = useState<Aspect>(1);
  const [crop, setCrop] = useState<Crop>({ aspect: 1, unit: '%', width: 80, x: 10, y: 10 });
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (file: File) => {
    if (type === 'image' && !file.type.startsWith('image/')) return 'Solo imágenes permitidas';
    if (type === 'video') {
      if (!file.type.startsWith('video/')) return 'Solo videos permitidos';
    }
    return null;
  };

  const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null);
    if (fileRejections.length > 0) {
      setError('Archivo no permitido');
      return;
    }
    const f = acceptedFiles[0];
    const err = validateFile(f);
    if (err) {
      setError(err);
      return;
    }
    setFile(f);
    if (type === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else if (type === 'video') {
      const url = URL.createObjectURL(f);
      setPreview(url);
      const video = document.createElement('video');
      video.src = url;
      video.onloadedmetadata = () => {
        if (video.duration > 60) {
          setError('El video debe durar máximo 60 segundos');
          setFile(null);
          setPreview(null);
        }
      };
    }
  }, [type]);

  const onImageLoaded = (img: HTMLImageElement) => setImage(img);

  const handleCropAndUpload = async () => {
    if (!image || !crop.width || !crop.height) return;
    setLoading(true);
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
      image,
      crop.x * scaleX, crop.y * scaleY,
      crop.width * scaleX, crop.height * scaleY,
      0, 0, canvas.width, canvas.height
    );
    let blob: Blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.95)!);
    if (canvas.width > 1080) {
      blob = await imageCompression(blob, { maxWidthOrHeight: 1080, useWebWorker: true });
    }
    const croppedFile = new File([blob], file!.name, { type: 'image/jpeg' });
    const croppedUrl = URL.createObjectURL(blob);
    setLoading(false);
    onUpload(croppedFile, croppedUrl);
  };

  const handleAspectChange = (a: Aspect) => {
    setAspect(a);
    setCrop({ ...crop, aspect: a });
  };

  return (
    <div>
      <Dropzone
        onDrop={onDrop}
        accept={type === 'image' ? { 'image/*': [] } : { 'video/*': [] }}
        maxFiles={1}
        multiple={false}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'bg-blue-50' : ''}`}>
            <input {...getInputProps()} />
            <p>{type === 'image' ? 'Arrastra una imagen o haz clic aquí' : 'Arrastra un video o haz clic aquí'}</p>
          </div>
        )}
      </Dropzone>
      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
      {type === 'image' && preview && (
        <div className="mt-4">
          <div className="flex gap-2 mb-2">
            {ASPECTS.map(a => (
              <button
                key={a.label}
                className={`px-2 py-1 rounded ${aspect === a.value ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                onClick={() => handleAspectChange(a.value)}
                type="button"
              >
                {a.label}
              </button>
            ))}
          </div>
          <ReactCrop
            crop={crop}
            aspect={aspect}
            onChange={c => setCrop(c)}
            onImageLoaded={onImageLoaded}
            minWidth={100}
            minHeight={100}
            keepSelection
          >
            <img src={preview} alt="preview" className="max-w-full max-h-96 mx-auto" />
          </ReactCrop>
          <button
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCropAndUpload}
            disabled={loading}
            type="button"
          >
            {loading ? 'Procesando...' : 'Recortar y subir'}
          </button>
        </div>
      )}
      {type === 'video' && preview && (
        <div className="mt-4">
          <video src={preview} controls className="max-w-full max-h-96 mx-auto rounded" />
          <div className="text-xs text-gray-500 mt-2">Solo videos de máximo 60 segundos. Proporciones: 1:1, 4:5, 1.91:1</div>
        </div>
      )}
    </div>
  );
}
