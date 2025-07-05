'use client';

import { useState } from 'react';
import StoryBar from './StoryBar';
import PostCard from './PostCard';
import CreatePostForm from './CreatePostForm';
import { Card } from '@/components/ui/card';

const initialPosts = [
  {
    id: 1,
    user: {
      name: 'Ana Patagonia',
      username: '@ana_patagonia',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: '¡Increíble amanecer en el Glaciar Perito Moreno! La naturaleza patagónica nunca deja de sorprenderme 🏔️❄️',
    image: 'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    timestamp: '2h',
    likes: 234,
    comments: 45,
    shares: 12
  },
  {
    id: 2,
    user: {
      name: 'Carlos Viento',
      username: '@carlos_viento',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: 'Organizando una nueva expedición al Fitz Roy. ¿Quién se apunta? 🏔️ #PatagoniaAdventure',
    image: 'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    timestamp: '4h',
    likes: 156,
    comments: 23,
    shares: 8
  },
  {
    id: 3,
    user: {
      name: 'María Sur',
      username: '@maria_sur',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: 'Las ballenas ya llegaron a Puerto Madryn! La temporada promete ser espectacular 🐋',
    timestamp: '6h',
    likes: 89,
    comments: 12,
    shares: 3
  }
];

export default function MainFeed() {
  const [posts, setPosts] = useState(initialPosts);

  const handlePostCreated = (newPost: any) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Story Bar */}
      <StoryBar />

      {/* Create Post Form */}
      <CreatePostForm onPostCreated={handlePostCreated} />

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Loading More Indicator */}
      <Card className="bg-white border-gray-100 shadow-sm p-6">
        <div className="text-center text-gray-500">
          <div className="animate-pulse">Cargando más publicaciones...</div>
        </div>
      </Card>
    </div>
  );
}