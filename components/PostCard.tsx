'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight, FileText, Calendar, MapPin, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: {
    id: number;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
    content: string;
    attachments?: any[]; // [{type, file, url}]
    location?: string;
    timestamp: string;
    likes: number;
    comments?: number;
    shares: number;
    event?: {
      type: 'Cultural' | 'Científico' | 'Social' | 'Deportivo' | 'General';
      title: string;
      date: string; // ISO o formato legible
      place: string;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  const [interested, setInterested] = useState(0);
  const [isInterested, setIsInterested] = useState(false);
  const imageAttachments = post.attachments?.filter((a: any) => a.type === 'image') || [];
  const [activeImage, setActiveImage] = useState(0);

  // Proporciones tipo Instagram
  const [imageRatio, setImageRatio] = useState(1); // Por defecto cuadrada
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    let ratio = img.naturalWidth / img.naturalHeight;
    // Limitar a los rangos de Instagram
    if (ratio > 1.91) ratio = 1.91; // horizontal máximo
    if (ratio < 0.8) ratio = 0.8;   // vertical máximo (4:5)
    setImageRatio(ratio);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  const handleComment = () => {
    setShowCommentInput(true);
  };
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + `?post=${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  const handleSave = () => setIsSaved(!isSaved);
  const handlePrevImage = () => setActiveImage(i => (i === 0 ? imageAttachments.length - 1 : i - 1));
  const handleNextImage = () => setActiveImage(i => (i === imageAttachments.length - 1 ? 0 : i + 1));
  const handleInterested = () => {
    setIsInterested((prev) => !prev);
    setInterested((prev) => isInterested ? prev - 1 : prev + 1);
  };
  const handleAddToCalendar = () => {
    if (!post.event) return;
    const start = encodeURIComponent(post.event.date);
    const title = encodeURIComponent(post.event.title);
    const location = encodeURIComponent(post.event.place);
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start.replace(/[-:]/g, '').replace('.000Z','').replace('T','/')}/${start.replace(/[-:]/g, '').replace('.000Z','').replace('T','/')}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <div className="card-minimal">
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9 avatar-ring">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm text-gray-900">{post.user.name}</span>
              <span className="text-xs text-gray-400">{post.user.username}</span>
            </div>
            <span className="text-xs text-gray-400">{post.timestamp}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="icon-btn">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="px-3 pb-2">
        {/* Badge de evento y detalles */}
        {post.event && (
          <div className="mb-2 flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r flex items-center gap-1 ${
              post.event.type === 'Cultural' ? 'from-pink-500 to-purple-500' :
              post.event.type === 'Científico' ? 'from-blue-500 to-cyan-500' :
              post.event.type === 'Social' ? 'from-green-500 to-lime-500' :
              post.event.type === 'Deportivo' ? 'from-yellow-500 to-orange-500' :
              'from-gray-500 to-gray-400'
            }`}>
              <Calendar className="inline h-4 w-4 mr-1" />
              {post.event.type}
            </span>
            <span className="font-semibold text-sm text-gray-900">{post.event.title}</span>
            <span className="text-xs text-gray-500">{post.event.date && new Date(post.event.date).toLocaleString()}</span>
            {post.event.place && (
              <a href={`https://maps.google.com/?q=${encodeURIComponent(post.event.place)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-700 underline">
                <MapPin className="h-4 w-4" />{post.event.place}
              </a>
            )}
            {/* Botón agregar a calendario */}
            <Button size="icon" variant="ghost" className="text-blue-600 hover:bg-blue-50 rounded-full h-7 w-7" onClick={handleAddToCalendar} aria-label="Agregar a calendario">
              <Calendar className="h-4 w-4" />
            </Button>
            {/* Botón interesado */}
            <Button size="icon" variant={isInterested ? 'default' : 'ghost'} className={`rounded-full h-7 w-7 ${isInterested ? 'bg-green-500 text-white' : 'text-green-600 hover:bg-green-50'}`} onClick={handleInterested} aria-label="Estoy interesado">
              <Users className="h-4 w-4" />
            </Button>
            <span className="text-xs text-green-700">{interested}</span>
          </div>
        )}
        <p className="text-sm leading-relaxed text-gray-900">{post.content}</p>
      </div>
      {/* Carrusel de imágenes */}
      {imageAttachments.length > 0 && (
        <div
          className="relative w-full mb-2 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100"
          style={{ aspectRatio: imageRatio > 0 ? imageRatio : 1, minHeight: '320px' }}
        >
          <img
            src={imageAttachments[activeImage].url}
            alt="img"
            className="object-cover w-full h-full"
            onLoad={handleImageLoad}
            style={{ width: '100%', height: '100%', display: 'block', objectPosition: 'center' }}
          />
          {imageAttachments.length > 1 && (
            <>
              <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 border border-gray-300 hover:bg-blue-100 z-10"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 border border-gray-300 hover:bg-blue-100 z-10"><ChevronRight className="h-5 w-5" /></button>
              <div className="flex justify-center gap-1 mt-2 absolute bottom-2 left-0 right-0">
                {imageAttachments.map((_, i) => (
                  <span key={i} className={`inline-block w-2 h-2 rounded-full ${i === activeImage ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {/* Otros adjuntos */}
      {post.attachments && post.attachments.filter((a: any) => a.type !== 'image').length > 0 && (
        <div className="flex flex-wrap gap-4 mb-2 px-3">
          {post.attachments.filter((a: any) => a.type !== 'image').map((att, idx) => (
            <div key={idx} className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm w-28 h-28 flex items-center justify-center">
              {att.type === 'video' && (
                <video src={att.url} className="object-cover w-full h-full" controls preload="metadata" />
              )}
              {att.type === 'audio' && (
                <audio controls src={att.url} className="w-24 mx-auto" />
              )}
              {att.type === 'document' && (
                <a href={att.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-full h-full text-blue-600">
                  <FileText className="h-8 w-8 mb-1" />
                  <span className="text-xs text-center break-all px-1">{att.file?.name || 'Documento'}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Ubicación */}
      {post.location && (
        <div className="flex items-center gap-2 mb-2 text-blue-700 text-xs px-3">
          <a href={post.location} target="_blank" rel="noopener noreferrer" className="underline">Ver ubicación</a>
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className={`icon-btn ${isLiked ? 'text-red-500' : 'text-gray-700'}`}
              onClick={handleLike}
              aria-label="Me gusta"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="icon-btn text-gray-700" onClick={handleComment} aria-label="Comentar">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="icon-btn text-gray-700" onClick={handleShare} aria-label="Compartir">
              <Share2 className="h-5 w-5" />
            </Button>
            {copied && <span className="text-xs text-blue-600 ml-2">¡Enlace copiado!</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`icon-btn ${isSaved ? 'text-accent' : 'text-gray-700'}`}
            onClick={handleSave}
            aria-label="Guardar"
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <span className="font-medium text-gray-900">{likes.toLocaleString()} me gusta</span> · {post.comments ?? 0} comentarios · {post.shares} compartidos
        </div>
        {/* Input de comentario */}
        {showCommentInput && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-200 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe un comentario..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              autoFocus
            />
            <Button
              size="sm"
              className="bg-blue-600 text-white rounded-full px-3"
              onClick={() => { setComment(""); setShowCommentInput(false); }}
              disabled={!comment.trim()}
            >
              Enviar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}