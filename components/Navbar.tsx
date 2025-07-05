'use client';

import { Search, Home, Compass, MessageCircle, Heart, Plus, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  onCreatePost: () => void;
  onOpenMessages: () => void;
}

export default function Navbar({ onCreatePost, onOpenMessages }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/60 z-50 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="primary-gradient rounded-xl p-2.5 shadow-lg">
              <span className="text-white font-bold text-xl">VS</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Viento Sur</span>
              <div className="text-xs text-gray-500">Red Social Patagónica</div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar personas, lugares, eventos en la Patagonia..."
                className="pl-12 pr-4 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all rounded-full h-10 text-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 rounded-full relative">
              <Home className="h-5 w-5 text-blue-600" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
              <Compass className="h-5 w-5 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-gray-100 rounded-full relative"
              onClick={onOpenMessages}
            >
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 p-0 border-2 border-white">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 p-0 border-2 border-white">
                12
              </Badge>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-blue-50 rounded-full primary-gradient text-white shadow-lg"
              onClick={onCreatePost}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-blue-200 transition-all shadow-sm">
              <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
              <AvatarFallback>TU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}