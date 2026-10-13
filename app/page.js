import Navbar from "./components/ui/Navbar";
import Hero from "./components/Hero";
import TrendingLocations from "./components/hero/trendingLocations";
import TrekLocations from "./components/hero/trekLocations";
import HiddenGems from "./components/hero/hiddenGems";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />

      <main className="px-4 sm:px-8">
        <TrendingLocations />
        <TrekLocations />
        <HiddenGems />
      </main>

      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-bold">
              <span className="text-green-500">Trek</span>
              <span className="text-white">Advisor</span>
            </span>
            <p className="mt-3 text-sm text-gray-400 max-w-xs">
              Plan seamless holidays across Himachal Pradesh — treks, hidden
              gems, stays, and transport, all in one place.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>Trending Locations</li>
              <li>Trek Locations</li>
              <li>Hidden Gems</li>
              <li>Transport</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <p className="text-sm text-gray-400">
              Questions about your next trip? Reach out and we&rsquo;ll help
              you plan it.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} TrekAdvisor. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
