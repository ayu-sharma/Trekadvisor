import "./globals.css";

export const metadata = {
  title: 'Trek Advisor',
  description: 'Your guide to the best trekking spots in Himachal Pradesh',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
