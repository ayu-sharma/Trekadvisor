"use client";

import Image from "next/image";

export default function TredLocation({ image, title, subtitle }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-96 shadow-md">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 80vw, 320px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="text-xs font-semibold tracking-[0.2em] text-lime-300 mb-1">
          {subtitle}
        </p>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
    </div>
  );
}
