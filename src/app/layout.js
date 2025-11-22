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
    <html lang="en">
      <body
        className={`${rubik.variable} ${workSans.variable} ${robotoMono.variable} antialiased`}
      >
        <AppShell> {children}
        </AppShell>
      </body>
    </html>
  );
}
