import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'
import "./../../app/global.css"

import classNames from "classnames";

import { baseURL, meta, fonts, effects, style, dataStyle } from "@/resources/once-ui.config";
import { Meta, Schema,  Column, Flex, opacity, SpacingToken, Background} from "@once-ui-system/core";
import { Providers } from '@/components/Providers';
// import SmoothScroll from '../utils/SmoothScroll';

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
        fonts.code.variable,
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
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.8/dist/lenis.css"></link>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
        __html: `

          (function() {
            try {
          const root = document.documentElement;

          // Set defaults from config, but force theme to 'light'
          const config = ${JSON.stringify({
            ...style,
            theme: 'light',
            'viz-style': dataStyle.variant,
          })};

          // Apply default values, but force data-theme to 'light'
          Object.entries(config).forEach(([key, value]) => {
            root.setAttribute('data-' + key, value);
          });
          root.setAttribute('data-theme', 'light');
          localStorage.setItem('data-theme', 'light');

          // Remove any saved theme overrides and force light
          Object.keys(config).forEach(key => {
            if (key === 'theme') {
              localStorage.setItem('data-theme', 'light');
              root.setAttribute('data-theme', 'light');
            } else {
              const value = localStorage.getItem('data-' + key);
              if (value) {
            root.setAttribute('data-' + key, value);
              }
            }
          });

          // Always force light mode on load
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('data-theme', 'light');
          });
            } catch (e) {
          console.error('Failed to initialize theme:', e);
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('data-theme', 'light');
            }
          })();
        `,
          }}
        />
      </head>
      <Providers>
        {/* <SmoothScroll/> */}
        <Column as="body" background="page" fillWidth margin="0" padding="0"  >
          {/* <Background
            position="absolute"
            mask={{
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
              cursor: effects.mask.cursor,
            }}
            gradient={{
              display: effects.gradient.display,
              opacity: effects.gradient.opacity as opacity,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
            }}
            dots={{
              display: effects.dots.display,
              opacity: effects.dots.opacity as opacity,
              size: effects.dots.size as SpacingToken,
              color: effects.dots.color,
            }}
            grid={{
              display: effects.grid.display,
              opacity: effects.grid.opacity as opacity,
              color: effects.grid.color,
              width: effects.grid.width,
              height: effects.grid.height,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as opacity,
              size: effects.lines.size as SpacingToken,
              thickness: effects.lines.thickness,
              angle: effects.lines.angle,
              color: effects.lines.color,
            }}
          /> */}
          {children}
        </Column>
      </Providers>
    </Flex>
  );
}
