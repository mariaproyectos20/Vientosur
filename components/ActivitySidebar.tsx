'use client';

import { useState } from 'react';
import { Bell, MessageCircle, Heart, UserPlus, Calendar, MapPin, MoreHorizontal, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivitySidebarProps {
  onOpenMessages: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'like',
    user: {
      name: 'Ana Patagonia',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: 'le gustó tu publicación sobre el Glaciar Perito Moreno',
    timestamp: '2m',
    unread: true
  },
  {
    id: 2,
    type: 'comment',
    user: {
      name: 'Carlos Viento',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: 'comentó: "¡Increíble vista! ¿Cuándo planeas volver?"',
    timestamp: '5m',
    unread: true
  },
  {
    id: 3,
    type: 'follow',
    user: {
      name: 'María Sur',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: 'comenzó a seguirte',
    timestamp: '1h',
    unread: true
  },
  {
    id: 4,
    type: 'event',
    user: {
      name: 'Diego Montaña',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: 'te invitó al evento "Trekking al Fitz Roy"',
    timestamp: '2h',
    unread: false
  },
  {
    id: 5,
    type: 'like',
    user: {
      name: 'Sofia Glaciar',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: 'y 12 personas más les gustó tu historia',
    timestamp: '3h',
    unread: false
  }
];

const recentMessages = [
  {
    id: 1,
    user: {
      name: 'Ana Patagonia',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    lastMessage: '¡Hola! ¿Cómo estuvo el trekking?',
    timestamp: '2m',
    unread: 2,
    isOnline: true
  },
  {
    id: 2,
    user: {
      name: 'Carlos Viento',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    lastMessage: 'Perfecto, nos vemos mañana',
    timestamp: '1h',
    unread: 0,
    isOnline: false
  },
  {
    id: 3,
    user: {
      name: 'María Sur',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    lastMessage: 'Las fotos quedaron increíbles 📸',
    timestamp: '3h',
    unread: 1,
    isOnline: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like': return <Heart className="h-4 w-4 text-red-500" />;
    case 'comment': return <MessageCircle className="h-4 w-4 text-blue-500" />;
    case 'follow': return <UserPlus className="h-4 w-4 text-green-500" />;
    case 'event': return <Calendar className="h-4 w-4 text-purple-500" />;
    default: return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

export default function ActivitySidebar({ onOpenMessages }: ActivitySidebarProps) {
  const [activeTab, setActiveTab] = useState<'notifications' | 'messages'>('notifications');
  const unreadNotifications = notifications.filter(n => n.unread).length;
  const unreadMessages = recentMessages.reduce((sum, msg) => sum + msg.unread, 0);

  return (
    <div className="h-full bg-white/60 backdrop-blur-sm border-r border-gray-200/60">
      {/* Header with Tabs */}
      <div className="p-4 border-b border-gray-200/60 bg-white/80">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeTab === 'notifications' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 relative rounded-md ${
              activeTab === 'notifications' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="h-4 w-4 mr-2" />
            Actividad
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs">
                {unreadNotifications}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeTab === 'messages' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('messages')}
            className={`flex-1 relative rounded-md ${
              activeTab === 'messages' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Mensajes
            {unreadMessages > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs">
                {unreadMessages}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {activeTab === 'notifications' ? (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Notificaciones</h3>
              <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:bg-blue-50">
                Marcar como leídas
              </Button>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg transition-all cursor-pointer ${
                    notification.unread 
                      ? 'bg-blue-50 border border-blue-100 hover:bg-blue-100' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.user.avatar} />
                        <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">{notification.user.name}</span>
                        <span className="text-gray-600 ml-1">{notification.content}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{notification.timestamp}</div>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full text-blue-600 text-sm">
              Ver todas las notificaciones
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-900">Mensajes Recientes</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-blue-600 hover:bg-blue-50"
                onClick={onOpenMessages}
              >
                Ver todos
              </Button>
            </div>

            <div className="space-y-3">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={onOpenMessages}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.user.avatar} />
                        <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {message.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{message.user.name}</h4>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
                        {message.unread > 0 && (
                          <Badge className="bg-blue-500 text-white text-xs h-5 w-5 p-0">
                            {message.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={onOpenMessages}
            >
              Abrir Chat Completo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}