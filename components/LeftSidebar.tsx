'use client';

import { Home, User, MessageCircle, Settings, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalendarModal from './CalendarModal';
import GenericModal from './GenericModal';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const navigationItems = [
	{ icon: Home, label: 'Inicio', route: '/', active: true, count: 0 },
	{ icon: User, label: 'Perfil', route: '/perfil', active: false, count: 0 },
	{ icon: MessageCircle, label: 'Mensajes', route: '/mensajes', active: false, count: 3 },
	{ icon: Calendar, label: 'Mi Calendario', route: null, active: false, count: 0 },
	{ icon: TrendingUp, label: 'Tendencias', route: '/tendencias', active: false, count: 0 },
	{ icon: Settings, label: 'Configuración', route: '/configuracion', active: false, count: 0 },
];

interface LeftSidebarProps {
  onOpenMessages: () => void;
}

// Hook para detectar si el sidebar está contraído
function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const check = () => setCollapsed(document.body.classList.contains('sidebar-collapsed'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return collapsed;
}

export default function LeftSidebar({ onOpenMessages }: LeftSidebarProps) {
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [trendsOpen, setTrendsOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const [events, setEvents] = useState([]);
	const [profile, setProfile] = useState({
		name: 'Tu Usuario',
		email: 'usuario@email.com',
		bio: 'Biografía breve...',
		avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
	});
	const [theme, setTheme] = useState('Claro');
	const [language, setLanguage] = useState('Español');
	const [publicProfile, setPublicProfile] = useState(true);
	const [allowDMs, setAllowDMs] = useState(true);
	const [notifEmail, setNotifEmail] = useState(true);
	const [notifPush, setNotifPush] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [trends, setTrends] = useState([
		{ topic: '#VientoSur', posts: 120 },
		{ topic: '#ReactJS', posts: 98 },
		{ topic: '#NextJS', posts: 75 },
		{ topic: '#DesarrolloWeb', posts: 60 },
		{ topic: '#OpenAI', posts: 42 },
	]);
	const [selectedTrend, setSelectedTrend] = useState<{ topic: string; posts: number } | null>(null);
	const [trendPosts, setTrendPosts] = useState<{ id: number; user: string; content: string }[]>([]);
	const fileInputRef = useRef(null);
	const router = useRouter();
	const pathname = usePathname();
	const isConfigPage = pathname === '/configuracion';
	const isCollapsed = useSidebarCollapsed();

	// Obtener posts del feed global para extraer eventos
	useEffect(() => {
		// Buscar en window.__MAIN_FEED_POSTS__ si existe (lo inyectaremos desde MainFeed)
		if (typeof window !== 'undefined' && (window as any).__MAIN_FEED_POSTS__) {
			const posts = (window as any).__MAIN_FEED_POSTS__;
			const postEvents = posts
				.filter((p: any) => p.event)
				.map((p: any) => ({
					title: p.event.title,
					date: p.event.date,
					place: p.event.place,
				}));
			setEvents(postEvents);
		}
	}, [calendarOpen]);
	return (
		<aside className={`hidden lg:block h-full border-r border-gray-200 bg-white p-4 space-y-6 transition-all duration-300 ${isConfigPage ? 'w-[72px] min-w-[72px] max-w-[72px]' : 'w-64'}`}>
			{/* Navegación minimalista */}
			<nav className="space-y-1">
				{navigationItems.map((item) => (
					<Button
						key={item.label}
						variant={item.active ? 'default' : 'ghost'}
						className={`w-full flex items-center space-x-3 rounded-lg h-10 px-3 transition-colors duration-200 ${
							item.active
								? 'bg-white text-black' // Fondo blanco, texto e icono negro, sin borde
								: 'hover:bg-gray-200 text-gray-700'
						} ${isConfigPage ? 'justify-center' : ''}`}
						style={{ boxShadow: item.active ? '0 2px 8px 0 rgba(0,0,0,0.04)' : undefined }}
						onClick={() => {
							switch (item.label) {
								case 'Inicio':
									router.push('/');
									break;
								case 'Perfil':
									setProfileOpen(true);
									break;
								case 'Mensajes':
									onOpenMessages();
									break;
								case 'Mi Calendario':
									setCalendarOpen(true);
									break;
								case 'Tendencias':
									setTrendsOpen(true);
									break;
								case 'Configuración':
									setSettingsOpen(true);
									break;
								default:
									break;
							}
						}}
					>
						<item.icon className={`h-6 w-6 ${item.active ? 'text-blue-600' : 'text-gray-900'} transition-colors duration-200`} style={{ strokeWidth: 2 }} />
						{!isConfigPage && (
							<span className="font-medium text-sm">{item.label}</span>
						)}
						{item.count > 0 && !isConfigPage && (
							<span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
								{item.count}
							</span>
						)}
					</Button>
				))}
			</nav>
			<CalendarModal open={calendarOpen} onOpenChange={setCalendarOpen} events={events} />
			<GenericModal open={trendsOpen} onOpenChange={v => { setTrendsOpen(v); setSelectedTrend(null); }} title={selectedTrend ? `Posts de ${selectedTrend.topic}` : "Tendencias"}>
				<div className="p-4">
					{!selectedTrend ? (
						<>
							<h3 className="font-semibold text-lg mb-4">Tendencias actuales</h3>
							<ul className="space-y-3">
								{trends.map((trend, idx) => (
									<li key={trend.topic} className="flex items-center justify-between hover:bg-gray-100 rounded px-3 py-2 cursor-pointer" onClick={() => {
										setSelectedTrend(trend);
										// Simulación de posts reales para la tendencia
										setTrendPosts([
											{ id: 1, user: 'Ana', content: `¡Me encanta ${trend.topic}!` },
											{ id: 2, user: 'Luis', content: `¿Quién más sigue ${trend.topic}?` },
											{ id: 3, user: 'Sofía', content: `Recomiendo recursos sobre ${trend.topic}` },
										]);
									}}>
										<span className="font-medium text-blue-700">{trend.topic}</span>
										<span className="text-xs text-gray-500">{trend.posts} posts</span>
									</li>
								))}
							</ul>
							<Button className="mt-6 w-full" onClick={() => setTrends([
								...trends,
								{ topic: `#NuevaTendencia${trends.length+1}`, posts: Math.floor(Math.random()*100) }
							])}>
								Agregar tendencia de ejemplo
							</Button>
						</>
					) : (
						<>
							<Button size="sm" variant="outline" className="mb-4" onClick={() => setSelectedTrend(null)}>
								← Volver a tendencias
							</Button>
							<h3 className="font-semibold text-lg mb-4">Posts de {selectedTrend.topic}</h3>
							<ul className="space-y-4">
								{trendPosts.map(post => (
									<li key={post.id} className="border rounded p-3 bg-gray-50">
										<div className="font-semibold text-sm text-blue-800 mb-1">{post.user}</div>
										<div className="text-gray-800 text-sm">{post.content}</div>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			</GenericModal>
			<GenericModal open={settingsOpen} onOpenChange={setSettingsOpen} title="Configuración">
				<div className="space-y-6 p-2">
					{/* Editar perfil */}
					<section>
						<h4 className="font-semibold mb-2">Editar perfil</h4>
						<div className="flex items-center space-x-3 mb-2">
							<Button size="sm" variant="outline" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Cambiar foto</Button>
							<input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => {
								const file = e.target.files?.[0];
								if (file) {
									const reader = new FileReader();
									reader.onload = ev => setProfile(p => ({ ...p, avatar: ev.target?.result as string }));
									reader.readAsDataURL(file);
								}
							}} />
						</div>
						<input className="input w-full mb-2" placeholder="Nombre" value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} />
						<textarea className="input w-full mb-2" placeholder="Biografía" rows={2} value={profile.bio} onChange={e => setProfile(p => ({...p, bio: e.target.value}))} />
						<input className="input w-full mb-2" placeholder="Email" value={profile.email} onChange={e => setProfile(p => ({...p, email: e.target.value}))} />
						<Button size="sm" className="mt-1" onClick={() => alert('Perfil actualizado')}>Guardar cambios</Button>
					</section>
					{/* Cambiar contraseña */}
					<section>
						<h4 className="font-semibold mb-2">Cambiar contraseña</h4>
						<input className="input w-full mb-2" type={showPassword ? 'text' : 'password'} placeholder="Contraseña actual" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
						<input className="input w-full mb-2" type={showNewPassword ? 'text' : 'password'} placeholder="Nueva contraseña" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
						<div className="flex space-x-2 mb-2">
							<label className="flex items-center text-xs"><input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} /> Mostrar actual</label>
							<label className="flex items-center text-xs"><input type="checkbox" checked={showNewPassword} onChange={e => setShowNewPassword(e.target.checked)} /> Mostrar nueva</label>
						</div>
						<Button size="sm" onClick={() => {setCurrentPassword('');setNewPassword('');alert('Contraseña actualizada')}}>Actualizar contraseña</Button>
					</section>
					{/* Preferencias de notificaciones */}
					<section>
						<h4 className="font-semibold mb-2">Notificaciones</h4>
						<label className="flex items-center space-x-2 mb-1">
							<input type="checkbox" checked={notifEmail} onChange={e => setNotifEmail(e.target.checked)} /> <span>Email</span>
						</label>
						<label className="flex items-center space-x-2 mb-1">
							<input type="checkbox" checked={notifPush} onChange={e => setNotifPush(e.target.checked)} /> <span>Push</span>
						</label>
					</section>
					{/* Tema */}
					<section>
						<h4 className="font-semibold mb-2">Tema</h4>
						<select className="input w-full" value={theme} onChange={e => setTheme(e.target.value)}>
							<option>Claro</option>
							<option>Oscuro</option>
							<option>Automático</option>
						</select>
					</section>
					{/* Privacidad */}
					<section>
						<h4 className="font-semibold mb-2">Privacidad</h4>
						<label className="flex items-center space-x-2 mb-1">
							<input type="checkbox" checked={publicProfile} onChange={e => setPublicProfile(e.target.checked)} /> <span>Perfil público</span>
						</label>
						<label className="flex items-center space-x-2 mb-1">
							<input type="checkbox" checked={allowDMs} onChange={e => setAllowDMs(e.target.checked)} /> <span>Permitir mensajes directos</span>
						</label>
					</section>
					{/* Cuentas vinculadas */}
					<section>
						<h4 className="font-semibold mb-2">Cuentas vinculadas</h4>
						<Button size="sm" variant="outline" onClick={() => alert('Google conectado')}>Conectar Google</Button>
						<Button size="sm" variant="outline" className="ml-2" onClick={() => alert('Facebook conectado')}>Conectar Facebook</Button>
					</section>
					{/* Idioma */}
					<section>
						<h4 className="font-semibold mb-2">Idioma</h4>
						<select className="input w-full" value={language} onChange={e => setLanguage(e.target.value)}>
							<option>Español</option>
							<option>Inglés</option>
						</select>
					</section>
					{/* Cerrar sesión y eliminar cuenta */}
					<section className="flex flex-col space-y-2 pt-2 border-t">
						<Button variant="destructive" onClick={() => {alert('Sesión cerrada');router.push('/')}}>Cerrar sesión</Button>
						<Button variant="outline" className="text-red-600 border-red-400" onClick={() => {if(confirm('¿Seguro que deseas eliminar tu cuenta?')){alert('Cuenta eliminada')}}}>Eliminar cuenta</Button>
					</section>
				</div>
			</GenericModal>
			<GenericModal open={profileOpen} onOpenChange={setProfileOpen} title="Perfil">
				<div className="flex flex-col items-center p-4">
					<h2 className="text-xl font-bold mb-1">{profile.name}</h2>
					<p className="text-gray-500 mb-2">{profile.email}</p>
					<p className="text-sm text-gray-700 mb-4 text-center">{profile.bio}</p>
					<Button size="sm" variant="outline" onClick={() => setSettingsOpen(true)}>Editar perfil</Button>
				</div>
			</GenericModal>
		</aside>
	);
}