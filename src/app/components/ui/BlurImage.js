"use client"; // This is a client component
import { useState } from "react";
import Image from "next/image";

const BlurImage = ({ photo, name }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="rounded-md w-full overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-5">
      <Image
        alt={name}
        src={photo}
        fill
        sizes="100"
        priority
        style={{ objectFit: "cover" }}
        className={`
          rounded-md duration-700 ease-in-out
          ${
            isLoading ?
              "scale-110 blur-2xl grayscale" :
              "scale-100 blur-0 grayscale-0"
          }
        `}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}

export default BlurImage;