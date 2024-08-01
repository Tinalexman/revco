import type { Metadata } from "next";
import { Nunito, Nunito_Sans, Quantico } from "next/font/google";
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
const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito_sans",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
const quantico = Quantico({
  subsets: ["latin"],
  variable: "--font-quantico",
  weight: ["400", "700"],
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
        className={`${nunito.className} ${nunito_sans.className} ${quantico.className}`}
      >
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
