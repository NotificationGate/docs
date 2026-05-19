import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NotificationGate Docs',
  tagline: 'Transactional email API for developers.',
  favicon: 'img/favicon.ico',
  url: 'https://docs.notificationgate.com',
  baseUrl: '/',
  organizationName: 'NotificationGate',
  projectName: 'docs',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/NotificationGate/docs/tree/main/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },
    navbar: {
      title: 'NotificationGate',
      logo: { alt: 'NotificationGate', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'docs', label: 'Docs', position: 'left' },
        { href: 'https://app.notificationgate.com', label: 'Dashboard', position: 'right' },
        { href: 'https://github.com/NotificationGate', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Docs', items: [
          { label: 'Quickstart', to: '/quickstart' },
          { label: 'API Reference', to: '/api-reference/send-email' },
          { label: 'SDKs', to: '/sdks/nodejs' },
        ]},
        { title: 'Product', items: [
          { label: 'Dashboard', href: 'https://app.notificationgate.com' },
          { label: 'Pricing', href: 'https://notificationgate.com#pricing' },
          { label: 'Status', href: 'https://status.notificationgate.com' },
        ]},
        { title: 'Community', items: [
          { label: 'GitHub', href: 'https://github.com/NotificationGate' },
        ]},
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NotificationGate.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json', 'python', 'go', 'typescript', 'php', 'ruby'],
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;
