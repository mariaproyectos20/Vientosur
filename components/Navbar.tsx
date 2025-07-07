'use client';

import { Search, MessageCircle, Heart, Plus, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavbarProps {
  onCreatePost: () => void;
  onOpenMessages: () => void;
}

export default function Navbar({ onCreatePost, onOpenMessages }: NavbarProps) {
  const router = useRouter();
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Funciones de navegación y acciones
  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'perfil':
        router.push('/perfil');
        break;
      case 'crear-publicacion':
        onCreatePost();
        break;
      case 'crear-evento':
        setShowCreateEvent(true); // Aquí puedes abrir un modal de evento
        break;
      case 'calendario':
        router.push('/calendario');
        break;
      case 'configuracion':
        router.push('/configuracion');
        break;
      case 'logout':
        // Aquí puedes limpiar el estado de sesión y redirigir
        alert('Sesión cerrada');
        router.push('/');
        break;
      default:
        break;
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="flex justify-center">
        <div className="w-full max-w-[1440px] flex items-center justify-between h-16 px-4 lg:px-8 xl:px-16">
          {/* Logo minimalista */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">VientoSur</span>
          </div>
          {/* Barra de búsqueda minimal */}
          <div className="hidden md:flex flex-1 mx-6 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar..."
                className="input-minimal pl-10 pr-4 h-9 text-sm"
              />
            </div>
          </div>
          {/* Iconos navegación */}
          <div className="flex items-center space-x-1">
            {/* Eliminados Home y Compass */}
            <Button variant="ghost" size="icon" className="icon-btn relative" onClick={onOpenMessages}>
              <MessageCircle className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 flex items-center justify-center rounded-full">3</span>
            </Button>
            <Button variant="ghost" size="icon" className="icon-btn relative">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 flex items-center justify-center rounded-full">12</span>
            </Button>
            {/* Eliminado botón crear post directo, ahora va en el menú */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 ml-2 cursor-pointer avatar-ring">
                  <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
                  <AvatarFallback>TU</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuItem onClick={() => handleMenuClick('perfil')}>Perfil</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Crear</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    <DropdownMenuItem onClick={() => handleMenuClick('crear-publicacion')}>Publicación</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMenuClick('crear-evento')}>Evento</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem onClick={() => handleMenuClick('calendario')}>Mi calendario</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('configuracion')}>Configuración</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => handleMenuClick('logout')}>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}