import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./sections/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import RegisterModal from "./components/Modal/RegisterModal";
import { ApolloWrapper } from "./lib/client";
import NotifyToastProvider from "./providers/NotifyToast";

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
      <body className={monsterrat.className}>
        <ApolloWrapper>
          <NotifyToastProvider />
          <RegisterModal />
          <Navbar />

          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
