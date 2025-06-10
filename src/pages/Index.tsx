
import React, { useState } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { URLInput } from '@/components/URLInput';
import { extractVideoId } from '@/utils/youtube';

const Index = () => {
  const [videoId, setVideoId] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSubmit = (url: string) => {
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoId('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Seraphim
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">
            Minimalist YouTube player with background playback
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-4xl">
          {!videoId ? (
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Paste YouTube URL
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Enter a YouTube video URL to start playing
                </p>
              </div>
              <URLInput onSubmit={handleVideoSubmit} />
            </div>
          ) : (
            <VideoPlayer 
              videoId={videoId} 
              onVideoEnd={handleVideoEnd}
              onNewVideo={() => {
                setVideoId('');
                setIsPlaying(false);
              }}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border p-4 text-center">
        <p className="text-muted-foreground text-xs md:text-sm">
          Background playback enabled • Works across all devices
        </p>
      </footer>
    </div>
  );
};

export default Index;
