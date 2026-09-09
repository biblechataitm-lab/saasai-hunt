'use client';

import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackText = '?',
  className,
  style,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  // Normalize style prop in case Astro passes it as a string
  const normalizedStyle: React.CSSProperties = React.useMemo(() => {
    if (!style) return {};
    if (typeof style === 'object') return style as React.CSSProperties;
    if (typeof style === 'string') {
      const parsed: Record<string, string> = {};
      (style as string).split(';').forEach((rule) => {
        const [k, v] = rule.split(':');
        if (k && v) {
          const camel = k.trim().replace(/-([a-z])/g, (_, g) => g.toUpperCase());
          parsed[camel] = v.trim();
        }
      });
      return parsed as React.CSSProperties;
    }
    return {};
  }, [style]);

  if (!src || error) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-surface-soft)',
          color: 'var(--color-primary)',
          fontWeight: 700,
          fontSize: '0.85rem',
          userSelect: 'none',
          border: '1px solid var(--border-color)',
          ...normalizedStyle,
        }}
        title={alt}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      style={normalizedStyle}
      onError={() => setError(true)}
      {...props}
    />
  );
}
