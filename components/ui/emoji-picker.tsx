import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  open: boolean;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, open, onClose }: EmojiPickerProps) {
  if (!open) return null;
  return (
    <div className="absolute z-50 mt-2 right-0 bg-white border border-gray-200 rounded shadow-lg">
      <Picker
        data={data}
        onEmojiSelect={(e: any) => {
          onSelect(e.native);
          onClose();
        }}
        theme="light"
        previewPosition="none"
        searchPosition="none"
        perLine={8}
        maxFrequentRows={1}
        navPosition="top"
        skinTonePosition="none"
        emojiButtonSize={32}
        emojiSize={24}
      />
    </div>
  );
}
