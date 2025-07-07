'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import { Button } from '@/components/ui/button';
import { Image, FileText, Video, Mic, Grid } from 'lucide-react';

export default function PerfilPage() {
  const [profile, setProfile] = useState({
    name: 'Tu Usuario',
    username: 'usuario123',
    email: 'usuario@email.com',
    bio: 'Biografía breve...',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    followers: 120,
    following: 80,
  });
  const [editMode, setEditMode] = useState(false);
  const [showStories, setShowStories] = useState(false);
  const [activeTab, setActiveTab] = useState('todas');

  // Definir primero los arrays individuales
  const imagenes = [
    { id: 1, url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg', type: 'imagen' },
    { id: 2, url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg', type: 'imagen' },
  ];
  const texto = [
    { id: 3, content: '¡Hola mundo!', type: 'texto' },
    { id: 4, content: 'Mi primer post de texto.', type: 'texto' },
  ];
  const video = [
    { id: 5, url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video' },
  ];
  const voz = [
    { id: 6, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', type: 'voz' },
  ];
  // Luego el objeto publicaciones
  const publicaciones = {
    todas: [...imagenes, ...texto, ...video, ...voz],
    imagenes,
    texto,
    video,
    voz,
  };

  return (
    <>
      <Navbar onCreatePost={() => {}} onOpenMessages={() => {}} />
      <div className="flex min-h-screen pt-16 bg-white">
        <div className={`hidden lg:block flex-shrink-0 transition-all duration-300 w-[72px] min-w-[72px] max-w-[72px]`}>
          <LeftSidebar onOpenMessages={() => {}} />
        </div>
        <main className="flex-1 flex-shrink-0 basis-3/5 p-8 flex flex-col items-center">
          <div className="w-full max-w-2xl flex flex-col items-center p-8 bg-white rounded-xl shadow border border-blue-100 mt-8">
            <div className="relative group mb-4">
              <img src={profile.avatar} alt="avatar" className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg object-cover" />
              {editMode && (
                <input type="file" accept="image/*" className="absolute bottom-0 right-0 opacity-0 w-32 h-32 cursor-pointer" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = ev => setProfile(p => ({ ...p, avatar: ev.target?.result as string }));
                    reader.readAsDataURL(file);
                  }
                }} />
              )}
            </div>
            {editMode ? (
              <>
                <input className="input w-full mb-2 text-center text-2xl font-bold" value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} />
                <input className="input w-full mb-2 text-center text-gray-500" value={profile.username} onChange={e => setProfile(p => ({...p, username: e.target.value}))} />
                <textarea className="input w-full mb-2 text-center text-gray-700" value={profile.bio} onChange={e => setProfile(p => ({...p, bio: e.target.value}))} />
                <Button size="sm" className="mb-2" onClick={() => setEditMode(false)}>Guardar</Button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <div className="text-gray-500 mb-1">@{profile.username}</div>
                <div className="flex items-center gap-6 mb-4">
                  <span><b>{profile.followers}</b> Seguidores</span>
                  <span><b>{profile.following}</b> Seguidos</span>
                </div>
                <p className="text-sm text-gray-700 mb-4 text-center">{profile.bio}</p>
                <div className="flex gap-2 mb-4">
                  <Button size="sm" onClick={() => setEditMode(true)}>Editar perfil</Button>
                  <Button size="sm" variant="outline">Compartir perfil</Button>
                </div>
              </>
            )}
            {/* Historias destacadas */}
            <div className="w-full flex flex-col items-center mb-6">
              <div className="flex gap-4 mb-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center bg-gray-100 cursor-pointer" onClick={() => setShowStories(true)}>
                    <span className="text-xs text-blue-700">Historia {i}</span>
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500">Historias destacadas</span>
            </div>
            {/* Tabs de publicaciones */}
            <div className="w-full">
              <div className="flex justify-center gap-4 mb-4">
                <Button size="sm" variant={activeTab==='todas'?'default':'outline'} onClick={()=>setActiveTab('todas')}><Grid className="w-5 h-5" /></Button>
                <Button size="sm" variant={activeTab==='imagenes'?'default':'outline'} onClick={()=>setActiveTab('imagenes')}><Image className="w-5 h-5" /></Button>
                <Button size="sm" variant={activeTab==='texto'?'default':'outline'} onClick={()=>setActiveTab('texto')}><FileText className="w-5 h-5" /></Button>
                <Button size="sm" variant={activeTab==='video'?'default':'outline'} onClick={()=>setActiveTab('video')}><Video className="w-5 h-5" /></Button>
                <Button size="sm" variant={activeTab==='voz'?'default':'outline'} onClick={()=>setActiveTab('voz')}><Mic className="w-5 h-5" /></Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {publicaciones[activeTab as keyof typeof publicaciones].map((pub) => {
                  if (pub.type === 'imagen' || pub.type === 'video' || pub.type === 'voz') {
                    // @ts-ignore
                    const url = pub.url;
                    if (pub.type === 'imagen') {
                      return <img key={pub.id} src={url} alt="img" className="rounded-lg w-full h-40 object-cover" />;
                    } else if (pub.type === 'video') {
                      return (
                        <video key={pub.id} controls className="rounded-lg w-full h-40 object-cover">
                          <source src={url} type="video/mp4" />
                        </video>
                      );
                    } else {
                      return (
                        <audio key={pub.id} controls className="w-full">
                          <source src={url} type="audio/mpeg" />
                        </audio>
                      );
                    }
                  } else if (pub.type === 'texto') {
                    // @ts-ignore
                    return <div key={pub.id} className="bg-blue-50 rounded-lg p-4 text-center">{pub.content}</div>;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </main>
        <div className="hidden xl:block flex-shrink-0 basis-1/5">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
