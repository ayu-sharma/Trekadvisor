"use client";

import Image from "next/image";

export default function Background() {
  return (
    <>
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 opacity-30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 opacity-20 rounded-full blur-3xl -z-10"></div>
      
      {/* Mountain silhouette background - more visible but still subtle */}
      <div className="absolute bottom-0 w-full -z-10">
        <div className="relative w-full h-20">
          <Image
            src="/images/hero/mountains.svg"
            alt="Mountain silhouette"
            fill
            className="opacity-15 object-cover object-bottom"
          />
        </div>
      </div>
    </>
  );
} 