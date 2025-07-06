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
		avatar:
			'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
		mutual: 3,
		isOnline: true,
		verified: true,
		reason: 'Fotógrafa de naturaleza',
	},
	{
		id: 2,
		name: 'Diego Montaña',
		username: '@diego_montana',
		avatar:
			'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
		mutual: 7,
		isOnline: false,
		verified: false,
		reason: 'Guía de montaña',
	},
	{
		id: 3,
		name: 'Sofia Viento',
		username: '@sofia_viento',
		avatar:
			'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
		mutual: 2,
		isOnline: true,
		verified: true,
		reason: 'Aventurera local',
	},
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
		featured: true,
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
		featured: false,
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
		featured: false,
	},
];

const trendingTopics = [
	{ tag: '#PatagoniaAdventure', posts: '2.4k', growth: '+15%', hot: true },
	{ tag: '#GlaciarPerito', posts: '1.8k', growth: '+8%', hot: true },
	{ tag: '#FitzRoy', posts: '1.2k', growth: '+12%', hot: false },
	{ tag: '#BallenasFranca', posts: '890', growth: '+5%', hot: false },
	{ tag: '#ElCalafate', posts: '756', growth: '+20%', hot: true },
	{ tag: '#TrekkingPatagonia', posts: '634', growth: '+3%', hot: false },
];

const communityHighlights = [
	{
		id: 1,
		title: 'Foto de la Semana',
		author: 'Ana Patagonia',
		description: 'Amanecer en Torres del Paine',
		likes: 234,
		image:
			'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
	},
	{
		id: 2,
		title: 'Aventurero del Mes',
		author: 'Carlos Viento',
		description: 'Completó 15 trekkings este mes',
		achievement: 'Explorer Badge',
		likes: 156,
	},
];

export default function RightSidebar() {
	return (
		<aside className="hidden xl:block w-72 h-full border-l border-gray-200 bg-white p-4 space-y-6">
			{/* Sugerencias de usuarios minimalistas */}
			<div>
				<h3 className="text-xs font-semibold text-gray-500 mb-2">Sugerencias</h3>
				<div className="space-y-3">
					{suggestedUsers.map((user) => (
						<div key={user.id} className="flex items-center space-x-3">
							<Avatar className="h-9 w-9 avatar-ring">
								<AvatarImage src={user.avatar} />
								<AvatarFallback>{user.name[0]}</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<div className="font-medium text-sm text-gray-900 flex items-center gap-1">
									{user.name}
									{user.verified && <span className="text-blue-500">✔</span>}
								</div>
								<div className="text-xs text-gray-400">{user.username}</div>
							</div>
							<Button size="sm" className="rounded-full px-3 py-1 text-xs bg-accent text-white">
								Seguir
							</Button>
						</div>
					))}
				</div>
			</div>
			{/* Tendencias minimalistas */}
			<div>
				<h3 className="text-xs font-semibold text-gray-500 mb-2">Tendencias</h3>
				<div className="space-y-1">
					{trendingTopics.map((topic) => (
						<div key={topic.tag} className="flex items-center justify-between text-xs text-gray-700">
							<span>{topic.tag}</span>
							<span className="text-gray-400">{topic.posts}</span>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
}