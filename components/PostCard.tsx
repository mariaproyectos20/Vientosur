'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PostCardProps {
  post: {
    id: number;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 animate-gentle-float">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-gray-100">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm text-gray-900">{post.user.name}</span>
                <span className="text-xs text-gray-500">{post.user.username}</span>
              </div>
              <span className="text-xs text-gray-500">{post.timestamp}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-sm leading-relaxed text-gray-900">{post.content}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="relative">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Post Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className={`hover:bg-gray-100 rounded-full transition-colors ${
                  isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-700'
                }`}
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full text-gray-700">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full text-gray-700">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-gray-100 rounded-full transition-colors ${
                isSaved ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-700'
              }`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Post Stats */}
          <div className="mt-3 space-y-1">
            <div className="text-sm font-medium text-gray-900">
              {likes.toLocaleString()} me gusta
            </div>
            <div className="text-xs text-gray-500">
              {post.comments} comentarios • {post.shares} compartidos
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}