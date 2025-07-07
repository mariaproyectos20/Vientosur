'use client';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import MessagingPanel from '@/components/MessagingPanel';
import { useState } from 'react';

export default function MensajesPage() {
  const [messagesOpen, setMessagesOpen] = useState(true);

  return (
    <>
      <Navbar onCreatePost={() => {}} onOpenMessages={() => {}} />
      <div className="flex min-h-screen pt-16 bg-white">
        <div className="hidden lg:block flex-shrink-0 w-[72px] min-w-[72px] max-w-[72px]">
          <LeftSidebar onOpenMessages={() => {}} />
        </div>
        <main className="flex-1 flex-shrink-0 basis-3/5 p-8 flex flex-col items-center">
          <div className="w-full">
            <MessagingPanel />
          </div>
        </main>
        <div className="hidden xl:block flex-shrink-0 basis-1/5">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
