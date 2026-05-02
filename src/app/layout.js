import { Rubik, Work_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"]
})

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"]
})

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"]
})

export const metadata = {
  title: "Bite size design",
  description: "Resources and services to enable creative technologists to build their best",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script: sets data-theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',t||(d?'dark':'light'));}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${rubik.variable} ${workSans.variable} ${robotoMono.variable} antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
