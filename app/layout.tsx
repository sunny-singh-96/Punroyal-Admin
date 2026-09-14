import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "../components/admin/shared/LayoutWrapper";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Punroyal - Admin",
  description: "Enterprise Admin Dashboard",
  icons: {
    icon: "/punroyal-logo.png",
    shortcut: "/punroyal-logo.png",
    apple: "/punroyal-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}