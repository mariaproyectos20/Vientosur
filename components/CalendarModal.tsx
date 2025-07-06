import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Event {
  title: string;
  date: string;
  place?: string;
}

interface CalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  events: Event[];
}

export default function CalendarModal({ open, onOpenChange, events }: CalendarModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden bg-white shadow-2xl border border-gray-200">
        <DialogHeader className="p-5 border-b border-gray-100 bg-white">
          <DialogTitle className="text-lg font-bold flex items-center justify-between text-gray-900">
            <span>Próximos eventos</span>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {events.length === 0 ? (
            <div className="text-center text-gray-500 text-sm">
              No hay eventos próximos.
            </div>
          ) : (
            <ul className="space-y-3">
              {events.map((event, idx) => (
                <li key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="font-semibold text-gray-900">{event.title}</div>
                  <div className="text-xs text-gray-500">{event.date} {event.place && `- ${event.place}`}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
