'use client';

import { Home, Compass, MessageCircle, Heart, Bookmark, Users, Settings, MapPin, Calendar, TrendingUp, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const navigationItems = [
  { icon: Home, label: 'Inicio', active: true, count: 0 },
  { icon: Compass, label: 'Explorar', active: false, count: 0 },
  { icon: MessageCircle, label: 'Mensajes', active: false, count: 3 },
  { icon: Heart, label: 'Notificaciones', active: false, count: 12 },
  { icon: Bookmark, label: 'Guardados', active: false, count: 0 },
  { icon: Users, label: 'Comunidades', active: false, count: 2 },
  { icon: MapPin, label: 'Eventos', active: false, count: 5 },
  { icon: Calendar, label: 'Mi Calendario', active: false, count: 0 },
  { icon: Camera, label: 'Mis Historias', active: false, count: 0 },
  { icon: TrendingUp, label: 'Tendencias', active: false, count: 0 },
  { icon: Settings, label: 'Configuración', active: false, count: 0 },
];

const quickStats = [
  { label: 'Publicaciones', value: '247', change: '+12' },
  { label: 'Seguidores', value: '1.2k', change: '+45' },
  { label: 'Siguiendo', value: '892', change: '+3' },
  { label: 'Me gusta', value: '3.4k', change: '+89' },
];

export default function LeftSidebar() {
  return (
    <div className="p-4 h-full overflow-y-auto scrollbar-thin bg-white/60 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Enhanced Profile Section */}
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <Avatar className="w-20 h-20 ring-4 ring-blue-100 shadow-lg">
                  <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
                  <AvatarFallback>TU</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Tu Usuario</h3>
                <p className="text-sm text-gray-500">@tu_usuario</p>
                <p className="text-xs text-gray-400 mt-1">Explorador Patagónico 🏔️</p>
              </div>
              
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-bold text-lg text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                    <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Navigation */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-600 px-3 mb-3">Navegación</h3>
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-between rounded-xl h-12 ${
                item.active 
                  ? 'primary-gradient text-white shadow-lg shadow-blue-500/25' 
                  : 'hover:bg-blue-50 text-gray-700 hover:text-blue-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.active 
                    ? 'bg-white/20 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {item.count}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Weather Widget */}
        <Card className="primary-gradient text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold">-2°C</div>
              <div className="text-sm opacity-90">El Calafate, Argentina</div>
              <div className="text-xs opacity-75">Viento: 15 km/h • Nublado</div>
              <div className="text-xs opacity-75">Sensación térmica: -5°C</div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3 text-gray-900">Acciones Rápidas</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start rounded-lg border-blue-200 hover:bg-blue-50">
                <Camera className="h-4 w-4 mr-2" />
                Crear Historia
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start rounded-lg border-blue-200 hover:bg-blue-50">
                <MapPin className="h-4 w-4 mr-2" />
                Crear Evento
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start rounded-lg border-blue-200 hover:bg-blue-50">
                <Users className="h-4 w-4 mr-2" />
                Invitar Amigos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}