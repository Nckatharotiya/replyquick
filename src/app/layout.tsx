import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReplyQuick — AI Google Review Replies on Autopilot",
  description:
    "Stop ignoring your Google reviews. ReplyQuick writes personalized replies and posts them automatically. More replies = more customers. Set up in 60 seconds.",
  openGraph: {
    title: "ReplyQuick — AI Google Review Replies on Autopilot",
    description:
      "Stop ignoring your Google reviews. AI writes and posts personalized replies automatically.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
