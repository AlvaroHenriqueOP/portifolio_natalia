import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              if (typeof AOS !== 'undefined') {
                AOS.init({
                  duration: 800,
                  easing: 'ease-out',
                  once: true,
                  offset: 100,
                  delay: 100
                });
              }
            });
          `
        }} />
      </body>
    </Html>
  );
} 