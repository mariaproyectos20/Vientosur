'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import MainFeed from '@/components/MainFeed';
import RightSidebar from '@/components/RightSidebar';
import CreatePostModal from '@/components/CreatePostModal';
import MessagingPanel from '@/components/MessagingPanel';
import ActivitySidebar from '@/components/ActivitySidebar';

export default function Home() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <Navbar 
        onCreatePost={() => setShowCreatePost(true)} 
        onOpenMessages={() => setShowMessaging(true)}
      />
      
      <div className="flex max-w-[1600px] mx-auto pt-16">
        {/* Left Sidebar - Navigation & Profile */}
        <div className="hidden lg:block w-72 fixed h-full">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-72 lg:mr-[640px] min-h-screen">
          <MainFeed />
        </div>

        {/* Right Sidebar Container - Two sidebars */}
        <div className="hidden lg:block w-[640px] fixed right-0 h-full flex">
          {/* Activity Sidebar - Notifications, Messages Preview */}
          <div className="w-80 border-l border-gray-200/60">
            <ActivitySidebar onOpenMessages={() => setShowMessaging(true)} />
          </div>

          {/* Info Sidebar - Suggestions, Events, Trends */}
          <div className="w-80 border-l border-gray-200/60">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}

      {/* Messaging Panel */}
      {showMessaging && (
        <MessagingPanel onClose={() => setShowMessaging(false)} />
      )}
    </div>
  );
}