"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function FallbackImage({ src, alt, ...props }) {
  const [error, setError] = useState(false);
  
  // Get dimensions from props or use defaults
  const width = props.width || 400;
  const height = props.height || 300;
  
  // Path for placeholder
  const fileName = src.split('/').pop();
  
  // Create fallback URL with path information
  const fallbackUrl = `/api/placeholder?width=${width}&height=${height}&path=${encodeURIComponent(fileName)}`;
  
  if (error) {
    return (
      <Image
        src={fallbackUrl}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      onError={() => setError(true)}
    />
  );
} 