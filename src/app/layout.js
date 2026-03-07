import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "MARIO HERNÁNDEZ || FRONTEND & FULLSTACK DEVELOPER",
  description: "Frontend & fullstack developer specializing in React, Next.js, and Spring Boot. Based in Europe.",
  openGraph: {
    title: "MARIO HERNÁNDEZ || FRONTEND & FULLSTACK DEVELOPER",
    description: "Frontend & fullstack developer specializing in React, Next.js, and Spring Boot. Based in Europe.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
