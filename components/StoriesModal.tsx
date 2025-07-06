import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

// Simulación de historias de usuarios
const mockStories = [
	{
		user: 'Tu Usuario',
		avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
		stories: [
			{
				id: 1,
				type: 'image',
				url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
				timestamp: 'Hace 2h',
			},
			{
				id: 2,
				type: 'image',
				url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
				timestamp: 'Hace 1h',
			},
		],
	},
	{
		user: 'María',
		avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
		stories: [
			{
				id: 3,
				type: 'image',
				url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
				timestamp: 'Hace 3h',
			},
		],
	},
	{
		user: 'Carlos',
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
		stories: [
			{
				id: 4,
				type: 'image',
				url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
				timestamp: 'Hace 4h',
			},
		],
	},
];

interface StoriesModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const StoriesModal: React.FC<StoriesModalProps> = ({ open, onOpenChange }) => {
	const [stories, setStories] = useState(mockStories);
	const [currentUserIdx, setCurrentUserIdx] = useState(0);
	const [currentStoryIdx, setCurrentStoryIdx] = useState(0);
	const [progress, setProgress] = useState(0);
	const [uploading, setUploading] = useState(false);
	const [uploadError, setUploadError] = useState('');

	const currentUser = stories[currentUserIdx];
	const currentStory = currentUser.stories[currentStoryIdx];

	// Avance automático de historias
	useEffect(() => {
		if (!open) return;
		setProgress(0);
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					handleNextStory();
					return 0;
				}
				return prev + 2;
			});
		}, 40);
		return () => clearInterval(interval);
		// eslint-disable-next-line
	}, [open, currentUserIdx, currentStoryIdx]);

	const handleNextStory = () => {
		if (currentStoryIdx < currentUser.stories.length - 1) {
			setCurrentStoryIdx(currentStoryIdx + 1);
		} else if (currentUserIdx < mockStories.length - 1) {
			setCurrentUserIdx(currentUserIdx + 1);
			setCurrentStoryIdx(0);
		} else {
			onOpenChange(false);
		}
	};

	const handlePrevStory = () => {
		if (currentStoryIdx > 0) {
			setCurrentStoryIdx(currentStoryIdx - 1);
		} else if (currentUserIdx > 0) {
			const prevUserStories = mockStories[currentUserIdx - 1].stories.length;
			setCurrentUserIdx(currentUserIdx - 1);
			setCurrentStoryIdx(prevUserStories - 1);
		}
	};

	// Al cambiar de usuario, reiniciar historia
	useEffect(() => {
		setCurrentStoryIdx(0);
	}, [currentUserIdx]);

	// Función para subir nueva historia (solo imagen, simulada)
	const handleUploadStory = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		setUploadError('');
		const isVideo = file.type.startsWith('video/');
		const reader = new FileReader();
		reader.onload = () => {
			setStories((prev) => {
				const updated = [...prev];
				updated[0] = {
					...updated[0],
					stories: [
						...updated[0].stories,
						{
							id: Date.now(),
							type: isVideo ? 'video' : 'image',
							url: reader.result as string,
							timestamp: 'Ahora',
						},
					],
				};
				return updated;
			});
			setUploading(false);
			setCurrentUserIdx(0);
			setCurrentStoryIdx(stories[0].stories.length); // Ir a la nueva historia
		};
		reader.onerror = () => {
			setUploadError('Error al leer el archivo');
			setUploading(false);
		};
		if (isVideo) {
			reader.readAsDataURL(file);
		} else {
			reader.readAsDataURL(file);
		}
	};

	if (!open) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md p-0 bg-black text-white relative overflow-hidden">
				<DialogHeader>
					<DialogTitle className="flex items-center space-x-2 p-4">
						<img
							src={currentUser.avatar}
							alt={currentUser.user}
							className="w-8 h-8 rounded-full border-2 border-white"
						/>
						<span className="font-semibold">{currentUser.user}</span>
						<span className="ml-2 text-xs text-gray-300">
							{currentStory.timestamp}
						</span>
					</DialogTitle>
				</DialogHeader>
				{/* Barra de progreso */}
				<div className="flex space-x-1 px-4 pt-2">
					{currentUser.stories.map((story, idx) => (
						<div
							key={story.id}
							className="h-1 bg-white/50 rounded-full flex-1 overflow-hidden"
						>
							<div
								className={`h-full bg-white transition-all duration-200 ${
									idx < currentStoryIdx
										? 'w-full'
										: idx === currentStoryIdx
										? ''
										: 'w-0'
								}`}
								style={{
									width:
										idx === currentStoryIdx ? `${progress}%` : undefined,
								}}
							/>
						</div>
					))}
				</div>
				{/* Imagen/video de la historia */}
				<div className="flex items-center justify-center h-80 bg-black select-none relative">
					{/* Botón para subir historia (solo para el usuario actual) */}
					{currentUserIdx === 0 && (
						<label className="absolute top-2 left-2 z-20 cursor-pointer bg-white/10 hover:bg-white/20 text-xs px-2 py-1 rounded text-white">
							{uploading ? 'Subiendo...' : '+ Añadir'}
							<input
								type="file"
								accept="image/*,video/*"
								className="hidden"
								disabled={uploading}
								onChange={handleUploadStory}
							/>
						</label>
					)}
					{currentStory.type === 'image' && (
						<img
							src={currentStory.url}
							alt="story"
							className="max-h-full max-w-full object-contain mx-auto"
						/>
					)}
					{currentStory.type === 'video' && (
						<video
							src={currentStory.url}
							controls
							autoPlay
							className="max-h-full max-w-full object-contain mx-auto bg-black"
						/>
					)}
					<button
						className="absolute right-0 top-0 h-full w-1/4 z-10"
						onClick={handleNextStory}
						aria-label="Siguiente"
					/>
				</div>
				{uploadError && (
					<div className="text-red-400 text-xs text-center pb-2">
						{uploadError}
					</div>
				)}
				{/* Navegación de usuarios */}
				<div className="flex space-x-2 px-4 pb-4 mt-2 overflow-x-auto">
					{mockStories.map((user, idx) => (
						<button
							key={user.user}
							className={`flex flex-col items-center focus:outline-none ${
								idx === currentUserIdx ? 'opacity-100' : 'opacity-60'
							}`}
							onClick={() => setCurrentUserIdx(idx)}
						>
							<img
								src={user.avatar}
								alt={user.user}
								className={`w-10 h-10 rounded-full border-2 ${
									idx === currentUserIdx
										? 'border-blue-500'
										: 'border-white'
								}`}
							/>
							<span className="text-xs mt-1">{user.user.split(' ')[0]}</span>
						</button>
					))}
				</div>
				{/* Botón para cerrar */}
				<Button
					variant="ghost"
					className="absolute top-2 right-2 text-white hover:bg-white/10"
					onClick={() => onOpenChange(false)}
				>
					×
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default StoriesModal;
