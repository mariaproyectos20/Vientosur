'use client';

import { MapPin, Calendar, Users, TrendingUp, UserPlus, Star, Award, Zap, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const suggestedUsers = [
  {
    id: 1,
    name: 'Laura Glaciar',
    username: '@laura_glaciar',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    mutual: 3,
    isOnline: true,
    verified: true,
    reason: 'Fotógrafa de naturaleza'
  },
  {
    id: 2,
    name: 'Diego Montaña',
    username: '@diego_montana',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    mutual: 7,
    isOnline: false,
    verified: false,
    reason: 'Guía de montaña'
  },
  {
    id: 3,
    name: 'Sofia Viento',
    username: '@sofia_viento',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    mutual: 2,
    isOnline: true,
    verified: true,
    reason: 'Aventurera local'
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Trekking al Fitz Roy',
    date: '15 Dic',
    time: '06:00',
    location: 'El Chaltén',
    participants: 12,
    maxParticipants: 15,
    difficulty: 'Avanzado',
    price: 'Gratis',
    featured: true
  },
  {
    id: 2,
    title: 'Avistaje de Ballenas',
    date: '18 Dic',
    time: '09:00',
    location: 'Puerto Madryn',
    participants: 8,
    maxParticipants: 20,
    difficulty: 'Principiante',
    price: '$2500',
    featured: false
  },
  {
    id: 3,
    title: 'Fotografía Glaciar',
    date: '22 Dic',
    time: '07:30',
    location: 'El Calafate',
    participants: 15,
    maxParticipants: 15,
    difficulty: 'Intermedio',
    price: '$1800',
    featured: false
  }
];

const trendingTopics = [
  { tag: '#PatagoniaAdventure', posts: '2.4k', growth: '+15%', hot: true },
  { tag: '#GlaciarPerito', posts: '1.8k', growth: '+8%', hot: true },
  { tag: '#FitzRoy', posts: '1.2k', growth: '+12%', hot: false },
  { tag: '#BallenasFranca', posts: '890', growth: '+5%', hot: false },
  { tag: '#ElCalafate', posts: '756', growth: '+20%', hot: true },
  { tag: '#TrekkingPatagonia', posts: '634', growth: '+3%', hot: false }
];

const communityHighlights = [
  {
    id: 1,
    title: 'Foto de la Semana',
    author: 'Ana Patagonia',
    description: 'Amanecer en Torres del Paine',
    likes: 234,
    image: 'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1'
  },
  {
    id: 2,
    title: 'Aventurero del Mes',
    author: 'Carlos Viento',
    description: 'Completó 15 trekkings este mes',
    achievement: 'Explorer Badge',
    likes: 156
  }
];

export default function RightSidebar() {
  return (
    <div className="h-full bg-white/60 backdrop-blur-sm overflow-y-auto scrollbar-thin">
      <div className="p-4 space-y-6">
        {/* Community Highlights */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-900 flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Destacados de la Comunidad</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityHighlights.map((highlight) => (
              <div key={highlight.id} className="space-y-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                <div className="flex items-center justify-between">
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    {highlight.title}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Heart className="h-3 w-3" />
                    <span>{highlight.likes}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{highlight.author}</div>
                  <div className="text-xs text-gray-600">{highlight.description}</div>
                  {highlight.achievement && (
                    <Badge className="mt-1 bg-purple-100 text-purple-800 text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      {highlight.achievement}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Suggestions */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-900 flex items-center space-x-2">
              <UserPlus className="h-4 w-4 text-blue-600" />
              <span>Sugerencias para ti</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="space-y-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                      {user.verified && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Star className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center space-x-1">
                        <span>{user.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">{user.reason}</div>
                      <div className="text-xs text-gray-400">{user.mutual} amigos en común</div>
                    </div>
                  </div>
                  <Button size="sm" className="primary-gradient text-white text-xs px-4 rounded-full shadow-sm">
                    Seguir
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-blue-600 text-sm hover:bg-blue-50">
              Ver todas las sugerencias
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-900 flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Próximos eventos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className={`space-y-3 p-4 rounded-lg transition-colors cursor-pointer ${
                event.featured 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm' 
                  : 'hover:bg-gray-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      {event.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          Destacado
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <Badge variant="outline" className="text-xs">
                          {event.difficulty}
                        </Badge>
                        <span className="text-green-600 font-medium">{event.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {event.date}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{event.participants}/{event.maxParticipants} participantes</span>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50">
                    Unirse
                  </Button>
                </div>
                {/* Progress bar for participants */}
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-900 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Tendencias en Patagonia</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-blue-600">{topic.tag}</div>
                  {topic.hot && (
                    <Badge className="bg-red-100 text-red-600 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{topic.posts} posts</div>
                  <div className="text-xs text-green-600 font-medium">{topic.growth}</div>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-blue-600 text-sm hover:bg-blue-50">
              Ver todas las tendencias
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}