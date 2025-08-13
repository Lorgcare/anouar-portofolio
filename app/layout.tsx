import "./globals.css";

export const metadata = {
  title: "Anouar Abouelnasr — Portfolio",
  description: "Cloud Services Engineer Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
