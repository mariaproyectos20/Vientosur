'use client';

import { useState } from 'react';
import { X, Search, Phone, Video, Info, Send, Smile, Image, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface MessagingPanelProps {
  onClose: () => void;
}

const conversations = [
  {
    id: 1,
    name: 'Ana Patagonia',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    lastMessage: '¡Hola! ¿Cómo estuvo el trekking?',
    timestamp: '2m',
    unread: 2,
    isOnline: true
  },
  {
    id: 2,
    name: 'Carlos Viento',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    lastMessage: 'Perfecto, nos vemos mañana',
    timestamp: '1h',
    unread: 0,
    isOnline: false
  },
  {
    id: 3,
    name: 'María Sur',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    lastMessage: 'Las fotos quedaron increíbles 📸',
    timestamp: '3h',
    unread: 1,
    isOnline: true
  },
  {
    id: 4,
    name: 'Diego Montaña',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    lastMessage: 'Gracias por la recomendación',
    timestamp: '1d',
    unread: 0,
    isOnline: false
  }
];

const messages = [
  {
    id: 1,
    text: '¡Hola! ¿Cómo estuvo el trekking al Fitz Roy?',
    sent: false,
    timestamp: '10:30'
  },
  {
    id: 2,
    text: '¡Increíble! Las vistas fueron espectaculares',
    sent: true,
    timestamp: '10:32'
  },
  {
    id: 3,
    text: 'Te mando algunas fotos que saqué',
    sent: true,
    timestamp: '10:32'
  },
  {
    id: 4,
    text: '¡Wow! Se ven hermosas. ¿Cuándo planeas volver?',
    sent: false,
    timestamp: '10:35'
  },
  {
    id: 5,
    text: 'Probablemente el próximo mes, ¿te animas a acompañarme?',
    sent: true,
    timestamp: '10:37'
  }
];

export default function MessagingPanel({ onClose }: MessagingPanelProps) {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-white max-w-5xl w-full h-[80vh] flex overflow-hidden shadow-2xl">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Mensajes</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar conversaciones..."
                className="pl-10 bg-gray-50 border-gray-200 rounded-full"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                  </Avatar>
                  {selectedConversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.isOnline ? 'Activo ahora' : 'Activo hace 2h'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-xs lg:max-w-md">
                  <div
                    className={`${
                      message.sent
                        ? 'message-bubble-sent'
                        : 'message-bubble-received'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${message.sent ? 'text-right' : 'text-left'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image className="h-5 w-5 text-gray-500" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="chat-input pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Smile className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Mic className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="primary-gradient text-white rounded-full h-10 w-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}