import Image from "next/image";

import type { GalleryItem } from "./ShotGallery";

/** Where a screen was tapped, as fractions of its width and height. */
export type At = { x: number; y: number };

export const zoomable = (it?: GalleryItem) => !!(it && (it.node || it.image));

/** A gallery screen: a drawn canvas, or an image (thumb size with `sizes`, else the original file). */
export function Content({ item, sizes }: { item: GalleryItem; sizes?: string }) {
  if (item.image) {
    const { src, alt, width, height } = item.image;
    return sizes ? (
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="block h-auto w-full bg-white" />
    ) : (
      // Viewer and mini-map: the original file, so zooming past the screen width stays sharp.
      <Image src={src} alt={alt} width={width} height={height} unoptimized draggable={false} className="block h-full w-full bg-white" />
    );
  }
  return <>{item.node}</>;
}
