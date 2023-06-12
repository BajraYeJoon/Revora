import { Montserrat } from "next/font/google";
import './globals.css'

const monsterrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Revora",
  description: "Better than the best",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monsterrat.className}>{children}</body>
    </html>
  );
}
