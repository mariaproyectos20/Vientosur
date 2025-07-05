'use client';

import { Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const stories = [
  {
    id: 1,
    name: 'Tu historia',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    isOwn: true,
    viewed: false
  },
  {
    id: 2,
    name: 'Ana P.',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    isOwn: false,
    viewed: false
  },
  {
    id: 3,
    name: 'Carlos V.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    isOwn: false,
    viewed: false
  },
  {
    id: 4,
    name: 'María S.',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    isOwn: false,
    viewed: true
  },
  {
    id: 5,
    name: 'Pedro M.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    isOwn: false,
    viewed: false
  }
];

export default function StoryBar() {
  return (
    <Card className="bg-white border-gray-100 shadow-sm">
      <CardContent className="p-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center space-y-2 min-w-0 cursor-pointer group"
            >
              <div className="relative">
                <Avatar 
                  className={`h-16 w-16 transition-transform group-hover:scale-105 ${
                    story.viewed ? 'story-ring-viewed' : 'story-ring'
                  }`}
                >
                  <AvatarImage src={story.avatar} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </Avatar>
                {story.isOwn && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs text-center text-gray-600 truncate max-w-[70px]">
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}