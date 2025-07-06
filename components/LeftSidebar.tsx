'use client';

import { Home, Compass, MessageCircle, Heart, Bookmark, Users, Settings, MapPin, Calendar, TrendingUp, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CalendarModal from './CalendarModal';
import GenericModal from './GenericModal';
import StoriesModal from './StoriesModal';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const navigationItems = [
	{ icon: Home, label: 'Inicio', route: '/', active: true, count: 0 },
	{ icon: Compass, label: 'Explorar', route: '/explorar', active: false, count: 0 },
	{ icon: MessageCircle, label: 'Mensajes', route: '/mensajes', active: false, count: 3 },
	{ icon: Heart, label: 'Notificaciones', route: '/notificaciones', active: false, count: 12 },
	{ icon: Bookmark, label: 'Guardados', route: '/guardados', active: false, count: 0 },
	{ icon: Users, label: 'Comunidades', route: '/comunidades', active: false, count: 2 },
	{ icon: MapPin, label: 'Eventos', route: '/eventos', active: false, count: 5 },
	{ icon: Calendar, label: 'Mi Calendario', route: null, active: false, count: 0 },
	{ icon: Camera, label: 'Mis Historias', route: '/historias', active: false, count: 0 },
	{ icon: TrendingUp, label: 'Tendencias', route: '/tendencias', active: false, count: 0 },
	{ icon: Settings, label: 'Configuración', route: '/configuracion', active: false, count: 0 },
];

export default function LeftSidebar() {
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [messagesOpen, setMessagesOpen] = useState(false);
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const [savedOpen, setSavedOpen] = useState(false);
	const [communitiesOpen, setCommunitiesOpen] = useState(false);
	const [eventsOpen, setEventsOpen] = useState(false);
	const [storiesOpen, setStoriesOpen] = useState(false);
	const [trendsOpen, setTrendsOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [events, setEvents] = useState([]);
	const router = useRouter();

	// Obtener posts del feed global para extraer eventos
	useEffect(() => {
		// Buscar en window.__MAIN_FEED_POSTS__ si existe (lo inyectaremos desde MainFeed)
		if (typeof window !== 'undefined' && (window as any).__MAIN_FEED_POSTS__) {
			const posts = (window as any).__MAIN_FEED_POSTS__;
			const postEvents = posts
				.filter((p: any) => p.event)
				.map((p: any) => ({
					title: p.event.title,
					date: p.event.date,
					place: p.event.place,
				}));
			setEvents(postEvents);
		}
	}, [calendarOpen]);
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
						onClick={() => {
							switch (item.label) {
								case 'Inicio':
									router.push('/');
									break;
								case 'Explorar':
									router.push('/explorar');
									break;
								case 'Mensajes':
									setMessagesOpen(true);
									break;
								case 'Notificaciones':
									setNotificationsOpen(true);
									break;
								case 'Guardados':
									setSavedOpen(true);
									break;
								case 'Comunidades':
									setCommunitiesOpen(true);
									break;
								case 'Eventos':
									setEventsOpen(true);
									break;
								case 'Mi Calendario':
									setCalendarOpen(true);
									break;
								case 'Mis Historias':
									setStoriesOpen(true);
									break;
								case 'Tendencias':
									setTrendsOpen(true);
									break;
								case 'Configuración':
									setSettingsOpen(true);
									break;
								default:
									break;
							}
						}}
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
			<CalendarModal open={calendarOpen} onOpenChange={setCalendarOpen} events={events} />
			<StoriesModal open={storiesOpen} onOpenChange={setStoriesOpen} />
			{/* Modals para cada sección */}
			<GenericModal open={messagesOpen} onOpenChange={setMessagesOpen} title="Mensajes" />
			<GenericModal open={notificationsOpen} onOpenChange={setNotificationsOpen} title="Notificaciones" />
			<GenericModal open={savedOpen} onOpenChange={setSavedOpen} title="Guardados" />
			<GenericModal open={communitiesOpen} onOpenChange={setCommunitiesOpen} title="Comunidades" />
			<GenericModal open={eventsOpen} onOpenChange={setEventsOpen} title="Eventos" />
			<GenericModal open={trendsOpen} onOpenChange={setTrendsOpen} title="Tendencias" />
			<GenericModal open={settingsOpen} onOpenChange={setSettingsOpen} title="Configuración" />
		</aside>
	);
}