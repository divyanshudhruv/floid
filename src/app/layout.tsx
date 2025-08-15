import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";

import classNames from "classnames";

import {
  baseURL,
  meta,
  fonts,
  effects,
  style,
  dataStyle,
} from "@/resources/once-ui.config";
import {
  Meta,
  Schema,
  Column,
  Flex,
  opacity,
  SpacingToken,
  Background,
} from "@once-ui-system/core";
import { Providers } from "@/components/Providers";

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    canonical: meta.home.canonical,
    image: meta.home.image,
    robots: meta.home.robots,
    alternates: meta.home.alternates,
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable
      )}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={meta.home.title}
        description={meta.home.description}
        path={meta.home.path}
      />
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
          const root = document.documentElement;
          const config = ${JSON.stringify({
            theme: "light",
            brand: style.brand,
            accent: style.accent,
            neutral: style.neutral,
            solid: style.solid,
            "solid-style": style.solidStyle,
            border: style.border,
            surface: style.surface,
            transition: style.transition,
            scaling: style.scaling,
            "viz-style": dataStyle.variant,
          })};
          Object.entries(config).forEach(([key, value]) => {
            root.setAttribute('data-' + key, value);
          });
          // Always set theme to light
          root.setAttribute('data-theme', 'light');
          // Apply any saved style overrides except theme
          Object.keys(config).forEach(key => {
            if (key === 'theme') return;
            const value = localStorage.getItem('data-' + key);
            if (value) {
              root.setAttribute('data-' + key, value);
            }
          });
            } catch (e) {
          console.error('Failed to initialize theme:', e);
          document.documentElement.setAttribute('data-theme', 'light');
            }
          })();
        `,
          }}
        />
      </head>
      <Providers>
        <Analytics />
        <Column as="body" background="page" fillWidth margin="0" padding="0">
          {children}
        </Column>
      </Providers>
    </Flex>
  );
}
