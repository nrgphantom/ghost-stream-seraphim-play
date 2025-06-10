
/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param url - YouTube URL
 * @returns Video ID or null if not found
 */
export const extractVideoId = (url: string): string | null => {
  const patterns = [
    // youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/v/VIDEO_ID
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Validate if a string is a valid YouTube video ID
 * @param videoId - Video ID to validate
 * @returns Boolean indicating if valid
 */
export const isValidVideoId = (videoId: string): boolean => {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
};

/**
 * Generate YouTube embed URL with custom parameters
 * @param videoId - YouTube video ID
 * @param options - Embed options
 * @returns Embed URL
 */
export const generateEmbedUrl = (
  videoId: string, 
  options: {
    autoplay?: boolean;
    loop?: boolean;
    controls?: boolean;
    mute?: boolean;
    start?: number;
  } = {}
): string => {
  const baseUrl = `https://www.youtube.com/embed/${videoId}`;
  const params = new URLSearchParams();

  if (options.autoplay) params.set('autoplay', '1');
  if (options.loop) params.set('loop', '1');
  if (options.controls === false) params.set('controls', '0');
  if (options.mute) params.set('mute', '1');
  if (options.start) params.set('start', options.start.toString());

  // Always enable JS API for better control
  params.set('enablejsapi', '1');
  params.set('origin', window.location.origin);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
