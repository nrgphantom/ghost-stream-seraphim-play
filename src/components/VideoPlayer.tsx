
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  onVideoEnd: () => void;
  onNewVideo: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  onVideoEnd,
  onNewVideo
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoTitle, setVideoTitle] = useState('');

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
    }

    setVideoTitle(`YouTube Video: ${videoId}`);
  }, [videoId]);

  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Navigation */}
      <div className="flex items-center justify-start">
        <Button 
          variant="outline" 
          onClick={onNewVideo} 
          className="gap-2 bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-sm h-11 px-6 rounded-lg font-light tracking-wide transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          New Video
        </Button>
      </div>

      {/* Video Player */}
      <Card className="overflow-hidden bg-card/30 border-border/30 backdrop-blur-sm animate-glow rounded-xl">
        <div 
          className="relative w-full rounded-xl overflow-hidden" 
          style={{ paddingBottom: '56.25%' }}
        >
          <iframe 
            ref={iframeRef} 
            src={videoUrl} 
            title={videoTitle} 
            className="absolute top-0 left-0 w-full h-full border-0 rounded-xl" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen 
            loading="lazy" 
          />
        </div>
      </Card>

      {/* Enjoy message */}
      <div className="text-center space-y-2">
        <p className="text-lg font-light text-foreground tracking-wide">
          Enjoy your video without ads!
        </p>
      </div>
    </div>
  );
};
