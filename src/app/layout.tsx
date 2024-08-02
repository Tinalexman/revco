import type { Metadata } from "next";
import { Nunito, Quantico, Bai_Jamjuree } from "next/font/google";
import "./globals.css";

import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const quantico = Quantico({
  subsets: ["latin"],
  variable: "--font-quantico",
  weight: ["400", "700"],
});

const bai_jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-bai",
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

const theme = createTheme({
  colors: {
    primary,
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
      <body
        className={`${nunito.className} ${quantico.className} ${bai_jamjuree.className} `}
      >
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
