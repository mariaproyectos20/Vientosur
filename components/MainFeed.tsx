'use client';

import { useState, useEffect } from 'react';
import StoryBar from './StoryBar';
import PostCard from './PostCard';
import CreatePostForm from './CreatePostForm';

const initialPosts = [
	{
		id: 1,
		user: {
			name: 'Ana Patagonia',
			username: '@ana_patagonia',
			avatar:
				'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
		},
		content:
			'¡Increíble amanecer en el Glaciar Perito Moreno! La naturaleza patagónica nunca deja de sorprenderme 🏔️❄️',
		image:
			'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
		timestamp: '2h',
		likes: 234,
		comments: 45,
		shares: 12,
	},
	{
		id: 2,
		user: {
			name: 'Carlos Viento',
			username: '@carlos_viento',
			avatar:
				'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
		},
		content:
			'Organizando una nueva expedición al Fitz Roy. ¿Quién se apunta? 🏔️ #PatagoniaAdventure',
		image:
			'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
		timestamp: '4h',
		likes: 156,
		comments: 23,
		shares: 8,
	},
	{
		id: 3,
		user: {
			name: 'María Sur',
			username: '@maria_sur',
			avatar:
				'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
		},
		content:
			'Las ballenas ya llegaron a Puerto Madryn! La temporada promete ser espectacular 🐋',
		timestamp: '6h',
		likes: 89,
		comments: 12,
		shares: 3,
	},
];

export default function MainFeed() {
	const [posts, setPosts] = useState(initialPosts);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			(window as any).__MAIN_FEED_POSTS__ = posts;
		}
	}, [posts]);

	const handlePostCreated = (newPost: any) => {
		setPosts((prevPosts) => [newPost, ...prevPosts]);
	};

	return (
		<main className="max-w-xl mx-auto p-4 space-y-6">
			<StoryBar />
			<CreatePostForm onPostCreated={handlePostCreated} />
			<div className="space-y-6">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</main>
	);
}