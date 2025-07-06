import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface GenericModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children?: ReactNode;
}

export default function GenericModal({ open, onOpenChange, title, children }: GenericModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden bg-white shadow-2xl border border-gray-200">
        <DialogHeader className="p-5 border-b border-gray-100 bg-white">
          <DialogTitle className="text-lg font-bold flex items-center justify-between text-gray-900">
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {children || (
            <div className="text-center text-gray-500 text-sm">
              Aquí se mostrará el contenido de <b>{title}</b>.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
