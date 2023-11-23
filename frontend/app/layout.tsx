import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar";
import Providers from "./components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Triplex societas",
  description:
    "Empower business owners to adopt web3 membership at the new epoch by porting Unlock Protocol onto ASTAR ecosystem.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <main className="grid grid-cols-1 place-items-center w-full">
            <NavBar />
            {children}
          </main>
        </body>
      </Providers>
    </html>
  );
}
