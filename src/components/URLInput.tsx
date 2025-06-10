
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play } from 'lucide-react';

interface URLInputProps {
  onSubmit: (url: string) => void;
}

export const URLInput: React.FC<URLInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    // Basic YouTube URL validation
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    
    if (!youtubeRegex.test(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setError('');
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          className="flex-1 text-base bg-card border-border focus:border-ring"
        />
        <Button 
          type="submit" 
          className="shrink-0 px-6"
          disabled={!url.trim()}
        >
          <Play className="w-4 h-4 mr-2" />
          Play
        </Button>
      </div>
      
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
    </form>
  );
};
