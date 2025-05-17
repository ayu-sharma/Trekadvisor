import Image from 'next/image';

export default function Hero() {
  return (
    <header className="relative h-96 md:h-screen">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
      <div className="h-full w-full relative">
        <div className="absolute inset-0 bg-green-700" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src="/images/about/himachal.jpeg" alt="Mountains of Himachal Pradesh" fill className="object-cover" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-4">
        <h1 className="text-4xl md:text-7xl font-bold text-center mb-4 tracking-tight">Himachal Pradesh</h1>
        <p className="text-xl md:text-3xl font-light text-center max-w-3xl">Journey Through the Land of Gods</p>
      </div>
    </header>
  );
} 