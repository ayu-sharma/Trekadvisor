"use client";

import Button from '../ui/Button';

export default function Footer({ name }) {
  return (
    <div className="mt-auto bg-green-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-green-100">Discover more amazing places in {name} and plan your perfect day out.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Button variant="text" className="text-white hover:text-green-300">About</Button>
          <Button variant="text" className="text-white hover:text-green-300">Contact</Button>
          <Button variant="text" className="text-white hover:text-green-300">Privacy</Button>
        </div>
      </div>
    </div>
  );
} 