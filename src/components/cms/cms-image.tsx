import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";

type CmsImageProps = {
  image?: SanityImageType;
  alt?: string;
  className?: string;
  priority?: boolean;
};

export function CmsImage({ image, alt, className = "", priority = false }: CmsImageProps) {
  if (!image?.asset?._ref) return null;

  const src = urlForImage(image).width(1400).height(900).fit("crop").auto("format").url();

  return (
    <Image
      src={src}
      alt={alt || image.alt || ""}
      width={1400}
      height={900}
      priority={priority}
      className={className}
    />
  );
}
