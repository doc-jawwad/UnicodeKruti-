import type { ImgHTMLAttributes, ReactNode } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  loader?: unknown;
};

/**
 * next/image → plain <img>. POC uses existing static public assets (no optimizer).
 */
export default function Image({
  src,
  alt,
  width,
  height,
  priority,
  fill: _fill,
  sizes,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blur,
  unoptimized: _unopt,
  loader: _loader,
  style,
  ...rest
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : rest.loading || 'lazy'}
      decoding="async"
      style={style}
      {...rest}
    />
  );
}

export type { ImageProps };
