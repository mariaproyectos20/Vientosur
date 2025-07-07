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
    <div className="min-h-screen bg-white">
      <Navbar 
        onCreatePost={() => setShowCreatePost(true)} 
        onOpenMessages={() => setShowMessaging(true)}
      />
      <div className="flex justify-center pt-16 px-4 lg:px-8 xl:px-16 2xl:px-0">
        {/* Sidebar Izquierdo */}
        <div className="hidden lg:block flex-shrink-0 basis-1/5">
          <LeftSidebar onOpenMessages={() => setShowMessaging(true)} />
        </div>
        {/* Feed Central */}
        <main className="flex-shrink-0 basis-3/5 max-w-full">
          <MainFeed />
        </main>
        {/* Sidebars Derechos */}
        <div className="hidden xl:flex flex-col flex-shrink-0 basis-1/5">
          <div className="mb-6">
            <ActivitySidebar onOpenMessages={() => setShowMessaging(true)} />
          </div>
          <div>
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