import { Rubik, Work_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"]
})

const workSans = Work_Sans({
  variable: "--font-work-sans",
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
        className={`${rubik.variable} ${workSans.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
