import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';
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
    // Enable background playback by setting proper iframe attributes
    const iframe = iframeRef.current;
    if (iframe) {
      // These attributes help with background playback
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
    }

    // Fetch video title (basic approach - in a real app you'd use YouTube API)
    setVideoTitle(`YouTube Video: ${videoId}`);

    // Handle visibility change for background playback
    const handleVisibilityChange = () => {
      // The iframe will continue playing even when tab is not visible
      console.log('Tab visibility changed, video continues playing');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [videoId]);
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
  const originalUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onNewVideo} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          New Video
        </Button>
        
        <Button variant="outline" asChild className="gap-2">
          
        </Button>
      </div>

      {/* Video Player */}
      <Card className="overflow-hidden bg-card border-border">
        <div className="relative w-full" style={{
        paddingBottom: '56.25%'
      }}>
          <iframe ref={iframeRef} src={videoUrl} title={videoTitle} className="absolute top-0 left-0 w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
        </div>
      </Card>

      {/* Video Info */}
      
    </div>;
};