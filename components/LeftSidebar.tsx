'use client';

import { Home, Compass, MessageCircle, Heart, Bookmark, Users, Settings, MapPin, Calendar, TrendingUp, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

export default function LeftSidebar() {
	return (
		<aside className="hidden lg:block w-64 h-full border-r border-gray-200 bg-white p-4 space-y-6">
			{/* Perfil minimalista */}
			<div className="flex flex-col items-center space-y-2 pb-4 border-b border-gray-100">
				<Avatar className="h-16 w-16 avatar-ring">
					<AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1" />
					<AvatarFallback>TU</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<h3 className="font-bold text-base text-gray-900">Tu Usuario</h3>
					<p className="text-xs text-gray-500">@tu_usuario</p>
				</div>
			</div>
			{/* Navegación minimalista */}
			<nav className="space-y-1">
				{navigationItems.map((item) => (
					<Button
						key={item.label}
						variant={item.active ? 'default' : 'ghost'}
						className={`w-full flex items-center space-x-3 rounded-lg h-10 px-3 ${
							item.active
								? 'bg-accent text-white'
								: 'hover:bg-gray-100 text-gray-700'
						}`}
					>
						<item.icon className="h-5 w-5" />
						<span className="font-medium text-sm">{item.label}</span>
						{item.count > 0 && (
							<span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
								{item.count}
							</span>
						)}
					</Button>
				))}
			</nav>
		</aside>
	);
}