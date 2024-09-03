import type { Metadata } from "next";
import { Inter, Podkova } from "next/font/google";

import "@mantine/core/styles.css";

import "./globals.css";

import {
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const podvoka = Podkova({
  subsets: ["latin"],
  variable: "--font-podkova",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Revco",
    default: "Revco",
  },
  description: "Internal Revenue Service",
};

const primary: MantineColorsTuple = [
  "#ebfff3",
  "#d5fee6",
  "#a5fdca",
  "#73fdac",
  "#50fd92",
  "#3ffd83",
  "#36fe79",
  "#2be267",
  "#1ec85b",
  "#00ad4b",
];

const white: MantineColorsTuple = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#ffffff",
];

const theme = createTheme({
  colors: {
    primary,
    white,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>

      <body className={`${podvoka.variable} ${inter.className}`}>
        <Toaster
          toastOptions={{
            className: "lg:mt-20 text-b-1",
          }}
        />
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
