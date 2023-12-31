import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./sections/Navbar/Navbar";
import RegisterModal from "./components/Modal/RegisterModal";
import NotifyToastProvider from "./providers/NotifyToast";
import { GraphqlProvider } from "./providers/GraphqlProvider";
import getCurrentUser from "./lib/actions/getCurrentUserInfo";

import LoginModal from "./components/Modal/LoginModal";
import ApplyStayModal from "./components/Modal/ApplyStayModal";

const monsterrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Revora",
  description: "Better than the best",
};
/**
 * RootLayout component is responsible for rendering the overall layout of the application.
 * It wraps the children components with necessary providers and includes the Navbar and RegisterModal components.
 * The children prop represents the content to be rendered within the layout.
 * The lang attribute is set to "en" for language specification.
 * The body className is set to the className generated by the Montserrat font.
 * The GraphqlProvider and NotifyToastProvider are used to provide necessary context to the components.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={monsterrat.className}>
        <Navbar currentUser={currentUser} />
        <GraphqlProvider>
          <NotifyToastProvider />
          <LoginModal />
          <RegisterModal />
          <ApplyStayModal />

          {children}
        </GraphqlProvider>
      </body>
    </html>
  );
}
