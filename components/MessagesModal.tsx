import { Dialog, DialogContent } from '@/components/ui/dialog';

interface MessagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MessagesModal({ open, onOpenChange }: MessagesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-2">Mensajes</h2>
          <div className="text-gray-500">Aquí se mostrarán tus mensajes y conversaciones.</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
