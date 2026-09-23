import Image, { type ImageProps } from "next/image";
import type { StaticImageData } from "next/image";

type BlurImageProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & {
  src: StaticImageData;
};

export function BlurImage({ src, alt, ...props }: BlurImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={src.blurDataURL}
      {...props}
    />
  );
}
