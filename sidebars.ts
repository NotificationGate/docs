import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    { type: 'doc', id: 'introduction', label: 'Introduction' },
    { type: 'doc', id: 'quickstart', label: 'Quickstart' },
    { type: 'doc', id: 'authentication', label: 'Authentication' },
    { type: 'doc', id: 'streams', label: 'Email Streams' },
    {
      type: 'category', label: 'API Reference', collapsed: false,
      items: ['api-reference/send-email', 'api-reference/batch-send', 'api-reference/domains', 'api-reference/webhooks', 'api-reference/suppressions'],
    },
    {
      type: 'category', label: 'SDKs',
      items: ['sdks/nodejs', 'sdks/python', 'sdks/go'],
    },
    { type: 'doc', id: 'domain-setup', label: 'Domain Setup' },
    { type: 'doc', id: 'bounce-handling', label: 'Bounce Handling' },
    { type: 'doc', id: 'webhook-signatures', label: 'Webhook Signatures' },
  ],
};

export default sidebars;
