'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import Navbar from '@/components/Navbar';
import MessagesModal from '@/components/MessagesModal';
import { Button } from '@/components/ui/button';

export default function ConfiguracionPage() {
  const [messagesOpen, setMessagesOpen] = useState(false);
  // Estados copiados del modal de configuración
  const [profile, setProfile] = useState({
    name: 'Tu Usuario',
    email: 'usuario@email.com',
    bio: 'Biografía breve...',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [theme, setTheme] = useState('Claro');
  const [language, setLanguage] = useState('Español');
  const [publicProfile, setPublicProfile] = useState(true);
  const [allowDMs, setAllowDMs] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <>
      <Navbar onCreatePost={() => {}} onOpenMessages={() => setMessagesOpen(true)} />
      <div className="flex min-h-screen pt-16 bg-white">
        <div className="hidden lg:block flex-shrink-0 w-[72px] min-w-[72px] max-w-[72px]">
          <LeftSidebar onOpenMessages={() => setMessagesOpen(true)} />
        </div>
        <main className="flex-1 flex-shrink-0 basis-3/5 p-8 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-extrabold mb-8 text-blue-900 flex items-center gap-3">
              <span className="inline-block w-2 h-8 bg-blue-500 rounded-full mr-2"></span>
              Configuración de tu cuenta
            </h1>
            {/* Avatar grande editable */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <img src={profile.avatar} alt="avatar" className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-lg object-cover" />
                <button
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow-lg opacity-80 group-hover:opacity-100 transition"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  title="Cambiar foto"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = ev => setProfile(p => ({ ...p, avatar: ev.target?.result as string }));
                    reader.readAsDataURL(file);
                  }
                }} />
              </div>
              <div className="mt-2 text-lg font-semibold text-blue-800">{profile.name}</div>
              <div className="text-gray-500 text-sm">{profile.email}</div>
            </div>
            {/* Secciones en tarjetas */}
            <div className="space-y-8">
              {/* Cambiar contraseña */}
              <section className="bg-white rounded-xl shadow p-6 border border-blue-100">
                <h2 className="font-bold text-blue-700 mb-4 text-lg">Cambiar contraseña</h2>
                <input className="input w-full mb-2" type={showPassword ? 'text' : 'password'} placeholder="Contraseña actual" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                <input className="input w-full mb-2" type={showNewPassword ? 'text' : 'password'} placeholder="Nueva contraseña" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <div className="flex space-x-2 mb-2">
                  <label className="flex items-center text-xs"><input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} /> Mostrar actual</label>
                  <label className="flex items-center text-xs"><input type="checkbox" checked={showNewPassword} onChange={e => setShowNewPassword(e.target.checked)} /> Mostrar nueva</label>
                </div>
                <Button size="sm" onClick={() => {setCurrentPassword('');setNewPassword('');alert('Contraseña actualizada')}}>Actualizar contraseña</Button>
              </section>
              {/* Preferencias de notificaciones */}
              <section className="bg-white rounded-xl shadow p-6 border border-blue-100">
                <h2 className="font-bold text-blue-700 mb-4 text-lg">Notificaciones</h2>
                <label className="flex items-center space-x-2 mb-1">
                  <input type="checkbox" checked={notifEmail} onChange={e => setNotifEmail(e.target.checked)} /> <span>Email</span>
                </label>
                <label className="flex items-center space-x-2 mb-1">
                  <input type="checkbox" checked={notifPush} onChange={e => setNotifPush(e.target.checked)} /> <span>Push</span>
                </label>
              </section>
              {/* Tema */}
              <section className="bg-white rounded-xl shadow p-6 border border-blue-100">
                <h2 className="font-bold text-blue-700 mb-4 text-lg">Tema</h2>
                <select className="input w-full" value={theme} onChange={e => setTheme(e.target.value)}>
                  <option>Claro</option>
                  <option>Oscuro</option>
                  <option>Automático</option>
                </select>
              </section>
              {/* Privacidad */}
              <section className="bg-white rounded-xl shadow p-6 border border-blue-100">
                <h2 className="font-bold text-blue-700 mb-4 text-lg">Privacidad</h2>
                <label className="flex items-center space-x-2 mb-1">
                  <input type="checkbox" checked={publicProfile} onChange={e => setPublicProfile(e.target.checked)} /> <span>Perfil público</span>
                </label>
                <label className="flex items-center space-x-2 mb-1">
                  <input type="checkbox" checked={allowDMs} onChange={e => setAllowDMs(e.target.checked)} /> <span>Permitir mensajes directos</span>
                </label>
              </section>
              {/* Cuentas vinculadas */}
              <section className="bg-white rounded-xl shadow p-6 border border-blue-100">
                <h2 className="font-bold text-blue-700 mb-4 text-lg">Cuentas vinculadas</h2>
                <Button size="sm" variant="outline" onClick={() => alert('Google conectado')}>Conectar Google</Button>
                <Button size="sm" variant="outline" className="ml-2" onClick={() => alert('Facebook conectado')}>Conectar Facebook</Button>
              </section>
              {/* Idioma */}
              <section className="bg-white rounded-xl shadow p-6 border border-blue-100">
                <h2 className="font-bold text-blue-700 mb-4 text-lg">Idioma</h2>
                <select className="input w-full" value={language} onChange={e => setLanguage(e.target.value)}>
                  <option>Español</option>
                  <option>Inglés</option>
                </select>
              </section>
              {/* Cerrar sesión y eliminar cuenta */}
              <section className="bg-white rounded-xl shadow p-6 border border-blue-100 flex flex-col space-y-2 pt-2 border-t">
                <Button variant="destructive" onClick={() => {alert('Sesión cerrada');router.push('/')}}>Cerrar sesión</Button>
                <Button variant="outline" className="text-red-600 border-red-400" onClick={() => {if(confirm('¿Seguro que deseas eliminar tu cuenta?')){alert('Cuenta eliminada')}}}>Eliminar cuenta</Button>
              </section>
            </div>
          </div>
        </main>
        <div className="hidden xl:block flex-shrink-0 basis-1/5">
          <RightSidebar />
        </div>
      </div>
      <MessagesModal open={messagesOpen} onOpenChange={setMessagesOpen} />
    </>
  );
}
