
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
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-border/50 p-6 md:p-8 glass-effect relative z-10">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-white/60 rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-black rounded-sm"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] uppercase bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              Seraphim
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base font-light ml-12">
            Minimalist YouTube player with seamless background playback
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-8 relative z-10">
        <div className="w-full max-w-5xl animate-slide-up">
          {!videoId ? (
            <div className="space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-light tracking-wide">
                  Enter YouTube URL
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">
                  Paste any YouTube video URL to experience clean, uninterrupted playback
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <URLInput onSubmit={handleVideoSubmit} />
              </div>
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
      <footer className="border-t border-border/50 p-6 text-center glass-effect relative z-10">
        <p className="text-muted-foreground text-xs md:text-sm font-light">
          Background playback enabled • Optimized for all devices
        </p>
      </footer>
    </div>
  );
};

export default Index;
