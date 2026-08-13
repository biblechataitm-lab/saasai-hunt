'use client';

import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export function SafeImage({ src, alt, fallbackText, className, style, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const text = fallbackText || (alt ? alt.slice(0, 2).toUpperCase() : 'SH');
      setImgSrc(`https://placehold.co/96x96/1e293b/94a3b8?text=${encodeURIComponent(text)}`);
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={imgSrc || `https://placehold.co/96x96/1e293b/94a3b8?text=${encodeURIComponent(fallbackText || 'SH')}`}
      alt={alt || ''}
      className={className}
      style={style}
      onError={handleError}
    />
  );
}
