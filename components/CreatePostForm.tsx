'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Image, MapPin, Smile, Paperclip, Mic, Send, FileAudio, FileText, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import EmojiPicker from '@/components/ui/emoji-picker';
import { Dialog } from '@/components/ui/dialog';

interface CreatePostFormProps {
  onPostCreated?: (post: any) => void;
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<any[]>([]); // [{type, file, url}]
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob|null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventType, setEventType] = useState<'Cultural' | 'Científico' | 'Social' | 'Deportivo' | 'General'>('General');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const emojiRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const isEvent = !!eventTitle || !!eventDate || !!eventPlace;

  // Cerrar emoji picker al hacer clic fuera
  useEffect(() => {
    if (!showEmoji) return;
    const handleClick = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showEmoji]);

  // Grabar nota de voz
  const handleStartRecording = async () => {
    setRecording(true);
    audioChunks.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new window.MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
      setAudioBlob(blob);
      setAttachments(prev => [...prev, { type: 'audio', file: blob, url: URL.createObjectURL(blob) }]);
      setRecording(false);
    };
    mediaRecorder.start();
  };
  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  // Eliminar adjunto
  const handleRemoveAttachment = (idx: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== idx));
  };

  // Obtener ubicación
  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`https://maps.google.com/?q=${latitude},${longitude}`);
        setLocationLoading(false);
      },
      () => setLocationLoading(false),
      { enableHighAccuracy: true }
    );
  };
  // Eliminar ubicación
  const handleRemoveLocation = () => setLocation(null);

  // Enviar post
  const handleSubmit = () => {
    if (!content.trim() && attachments.length === 0 && !location && !isEvent) return;
    const newPost = {
      id: Date.now(),
      user: {
        name: 'Tu Usuario',
        username: '@tu_usuario',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      content: content.trim(),
      attachments,
      location,
      timestamp: 'ahora',
      likes: 0,
      comments: 0,
      shares: 0,
      event: isEvent ? {
        type: eventType,
        title: eventTitle,
        date: eventDate,
        place: eventPlace
      } : undefined
    };
    onPostCreated?.(newPost);
    setContent('');
    setAttachments([]);
    setAudioBlob(null);
    setLocation(null);
    setEventType('General');
    setEventTitle('');
    setEventDate('');
    setEventPlace('');
  };

  // Carrusel de imágenes
  const imageAttachments = attachments.filter((a: any) => a.type === 'image');
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map(file => ({
      type: 'image',
      file,
      url: URL.createObjectURL(file)
    }));
    setAttachments(prev => [...prev, ...newImages]);
  };
  const handlePrevImage = () => setActiveImage(i => (i === 0 ? imageAttachments.length - 1 : i - 1));
  const handleNextImage = () => setActiveImage(i => (i === imageAttachments.length - 1 ? 0 : i + 1));

  return (
    <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-gray-100">
            <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
            <AvatarFallback>TU</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3 relative">
            <Textarea
              placeholder="¿Qué está pasando?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[60px]"
            />
            {/* Emoji Picker visual */}
            <div ref={emojiRef} className="absolute right-0 z-50">
              <EmojiPicker 
                open={showEmoji} 
                onClose={() => setShowEmoji(false)} 
                onSelect={emoji => setContent(content + emoji)} 
              />
            </div>
            {/* Carrusel de imágenes */}
            {imageAttachments.length > 0 && (
              <div className="relative w-full max-w-xs mx-auto mb-2">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img src={imageAttachments[activeImage].url} alt="img" className="object-cover w-full h-full" />
                </div>
                {imageAttachments.length > 1 && (
                  <>
                    <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 border border-gray-300 hover:bg-blue-100"><ChevronLeft className="h-5 w-5" /></button>
                    <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 border border-gray-300 hover:bg-blue-100"><ChevronRight className="h-5 w-5" /></button>
                  </>
                )}
                <div className="flex justify-center gap-1 mt-2">
                  {imageAttachments.map((_, i) => (
                    <span key={i} className={`inline-block w-2 h-2 rounded-full ${i === activeImage ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                  ))}
                </div>
                <button onClick={() => handleRemoveAttachment(attachments.findIndex((a: any) => a === imageAttachments[activeImage]))} className="absolute top-2 right-2 bg-white/80 border border-gray-300 rounded-full p-0.5 text-xs hover:bg-red-500 hover:text-white transition-colors">✕</button>
              </div>
            )}
            {/* Resumen de evento debajo del textarea */}
            {isEvent && (
              <div className="flex items-center gap-2 bg-blue-50 rounded px-2 py-1 text-xs mt-2">
                <span className="font-semibold">{eventType}</span>
                <span>{eventTitle}</span>
                <span>{eventDate && new Date(eventDate).toLocaleString()}</span>
                <span>{eventPlace}</span>
                <button className="ml-2 text-red-500" onClick={() => { setEventTitle(''); setEventDate(''); setEventPlace(''); }}>✕</button>
              </div>
            )}
            {/* Modal de evento */}
            {showEventModal && (
              <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <h2 className="font-bold mb-4">Crear evento</h2>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs">Tipo
                        <select value={eventType} onChange={e => setEventType(e.target.value as any)} className="border rounded px-2 py-1 text-xs w-full">
                          <option value="Cultural">Cultural</option>
                          <option value="Científico">Científico</option>
                          <option value="Social">Social</option>
                          <option value="Deportivo">Deportivo</option>
                          <option value="General">General</option>
                        </select>
                      </label>
                      <label className="text-xs">Título
                        <input type="text" placeholder="Título del evento" value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="border rounded px-2 py-1 text-xs w-full" />
                      </label>
                      <label className="text-xs">Fecha y hora
                        <input type="datetime-local" value={eventDate} onChange={e => setEventDate(e.target.value)} className="border rounded px-2 py-1 text-xs w-full" />
                      </label>
                      <label className="text-xs">Lugar
                        <input type="text" placeholder="Lugar" value={eventPlace} onChange={e => setEventPlace(e.target.value)} className="border rounded px-2 py-1 text-xs w-full" />
                      </label>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setShowEventModal(false)}>Cancelar</Button>
                      <Button onClick={() => setShowEventModal(false)} disabled={!eventTitle || !eventDate || !eventPlace} className="bg-blue-600 text-white">Guardar</Button>
                    </div>
                  </div>
                </div>
              </Dialog>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Botón para subir múltiples imágenes alineado y funcional */}
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAddImage}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600 hover:bg-blue-50 rounded-full h-8 w-8"
                  onClick={() => imageInputRef.current?.click()}
                  aria-label="Subir imágenes"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full h-8 w-8 relative" onClick={handleGetLocation} disabled={locationLoading}>
                  <MapPin className={`h-4 w-4 ${locationLoading ? 'animate-pulse' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full h-8 w-8 relative" onClick={() => setShowEmoji(v => !v)}>
                  <Smile className="h-4 w-4" />
                </Button>
                {/* Botón Evento alineado */}
                <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full h-8 w-8" onClick={() => setShowEventModal(true)} aria-label="Agregar evento">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
              {/* Botón dinámico: micrófono o enviar */}
              {content.trim() || attachments.length > 0 ? (
                <Button 
                  onClick={handleSubmit}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </Button>
              ) : (
                recording ? (
                  <Button onClick={handleStopRecording} size="sm" className="bg-red-500 text-white rounded-full px-4"><Mic className="h-4 w-4 animate-pulse" /></Button>
                ) : (
                  <Button onClick={handleStartRecording} size="sm" className="bg-blue-600 text-white rounded-full px-4"><Mic className="h-4 w-4" /></Button>
                )
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}