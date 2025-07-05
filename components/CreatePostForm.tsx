'use client';

import { useState } from 'react';
import { Image, MapPin, Calendar, Users, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface CreatePostFormProps {
  onPostCreated?: (post: any) => void;
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;

    // Create new post object
    const newPost = {
      id: Date.now(),
      user: {
        name: 'Tu Usuario',
        username: '@tu_usuario',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      content: content.trim(),
      timestamp: 'ahora',
      likes: 0,
      comments: 0,
      shares: 0
    };

    // Handle post creation
    console.log('Creating post:', newPost);
    onPostCreated?.(newPost);
    
    // Reset form
    setContent('');
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setContent('');
    setIsExpanded(false);
  };

  return (
    <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        {/* User Info */}
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-gray-100">
            <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
            <AvatarFallback>TU</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            {/* Content Input */}
            <Textarea
              placeholder="¿Qué está pasando en la Patagonia?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              className={`resize-none border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isExpanded ? 'min-h-[100px]' : 'min-h-[60px]'
              }`}
            />

            {/* Expanded Actions */}
            {isExpanded && (
              <div className="space-y-4">
                {/* Media Options */}
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-full">
                    <Image className="h-4 w-4 mr-2" />
                    Foto/Video
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
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-full">
                    <Smile className="h-4 w-4 mr-2" />
                    Emoji
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    {content.length > 0 && `${content.length}/280 caracteres`}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCancel}
                      className="text-gray-600 hover:bg-gray-100 rounded-full px-4"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={!content.trim()}
                      className="primary-gradient text-white rounded-full px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Collapsed Actions */}
            {!isExpanded && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full h-8 w-8">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full h-8 w-8">
                    <MapPin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  size="sm"
                  className="primary-gradient text-white rounded-full px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Publicar
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}