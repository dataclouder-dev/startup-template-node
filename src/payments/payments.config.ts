import type { NestPaymentsOptions } from '@dataclouder/nest-payments';

const appName = (process.env.APP_NAME || 'Startup Template').trim();
const apiPublicUrl = (process.env.API_PUBLIC_URL || '').trim().replace(/\/+$/, '');
const explicitWebhookUrl = (process.env.STRIPE_WEBHOOK_PUBLIC_URL || '').trim();
const derivedWebhookUrl = explicitWebhookUrl || (apiPublicUrl ? `${apiPublicUrl}/api/payments/stripe/webhook` : '');

export const templatePaymentsOptions: NestPaymentsOptions = {
  planHolderStoreMode: 'mongo',
  appId: process.env.APP_ID || 'startup-template',
  statementDescriptorSuffix: process.env.STRIPE_STATEMENT_SUFFIX || 'DATACLOUDER',
  plans: ['premium'],
  chargeCurrency: process.env.STRIPE_CHARGE_CURRENCY === 'usd' ? 'usd' : 'mxn',
  checkoutReturnPath: '/page/billing',
  webUrl: process.env.WEB_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  ...(derivedWebhookUrl ? { webhookPublicUrl: derivedWebhookUrl } : {}),
  stripeProduct: {
    name: row => `${appName} · ${row.name || `${row.months} meses`}`,
  },
};
