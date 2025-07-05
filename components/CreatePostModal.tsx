'use client';

import { useState } from 'react';
import { X, Image, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CreatePostModalProps {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // Handle post creation
    console.log('Creating post:', content);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-100">
          <CardTitle className="text-lg text-gray-900">Crear publicación</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4 p-6">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-gray-100">
              <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
              <AvatarFallback>TU</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm text-gray-900">Tu Usuario</div>
              <div className="text-xs text-gray-500">@tu_usuario</div>
            </div>
          </div>

          {/* Content Input */}
          <Textarea
            placeholder="¿Qué está pasando en la Patagonia?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-full">
                <Image className="h-4 w-4 mr-2" />
                Foto
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-full">
                <MapPin className="h-4 w-4 mr-2" />
                Ubicación
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                Evento
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-full">
                <Users className="h-4 w-4 mr-2" />
                Etiquetar
              </Button>
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="primary-gradient text-white rounded-full px-6"
            >
              Publicar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}