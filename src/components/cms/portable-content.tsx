import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";
import { CmsImage } from "@/components/cms/cms-image";
import type { SanityImage } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-3xl font-black text-[#f8efd9]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-2xl font-black text-[#f8efd9]">{children}</h3>,
    normal: ({ children }) => <p className="mt-5 text-base leading-8 text-[#e7dac1]">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-[var(--gold)] pl-5 text-lg font-bold leading-8 text-[#f8efd9]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[#e7dac1]">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[#e7dac1]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-8">{children}</li>,
    number: ({ children }) => <li className="leading-8">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-black text-[#f8efd9]">{children}</strong>,
    em: ({ children }) => <em className="text-[#f8efd9]">{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a href={href} className="font-black text-[var(--gold)] underline-offset-4 hover:underline">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => (
      <CmsImage
        image={value as SanityImage}
        className="mt-8 aspect-[16/9] w-full rounded-[1.25rem] object-cover"
      />
    ),
  },
};

type PortableContentProps = {
  value?: PortableTextBlock[];
  fallback?: string;
};

export function PortableContent({ value, fallback }: PortableContentProps) {
  if (!value?.length) {
    if (!fallback) return null;
    return <p className="mt-5 text-base leading-8 text-[#e7dac1]">{fallback}</p>;
  }

  return <PortableText value={value} components={components} />;
}
