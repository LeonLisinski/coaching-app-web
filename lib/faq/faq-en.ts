import type { FAQData } from './types'

export const faqEn: FAQData = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about UnitLift in one place.',
  lastUpdated: 'March 2026.',
  categories: [
    {
      id: 'general',
      title: 'General',
      questions: [
        {
          q: 'Is a credit card required to sign up?',
          a: 'Yes, a card is required to activate the trial period, but you are not charged immediately. Try UnitLift free for 14 days — billing only starts after the trial ends if you choose to continue with a paid plan.',
        },
        {
          q: 'How long does setup take?',
          a: 'Less than 5 minutes. Registration is fast and intuitive — set up your profile, customize parameters and invite your first client the same day. No lengthy onboarding process or complex configurations.',
        },
        {
          q: 'Which devices does UnitLift support?',
          a: 'The web app for coaches works on all modern browsers (Chrome, Firefox, Safari, Edge) and is fully responsive — you can add it to your phone\'s home screen as a PWA. Clients have a dedicated native iOS and Android app that is free to download.',
        },
        {
          q: 'Is UnitLift GDPR compliant?',
          a: 'Yes. UnitLift is built with full respect for GDPR regulations. All data is stored on secure EU servers, protected by TLS encryption in transit and AES-256 at rest. Read more in our Privacy Policy.',
        },
        {
          q: 'Which languages are supported?',
          a: 'The web platform is available in Croatian and English. The client mobile app supports the same languages — clients choose their language on first launch.',
        },
      ],
    },
    {
      id: 'pricing-payments',
      title: 'Pricing & Payments',
      questions: [
        {
          q: 'How much does UnitLift cost?',
          a: 'UnitLift offers three plans: Starter (€29/mo — up to 15 clients), Pro (€59/mo — up to 50 clients) and Scale (€99/mo — up to 150 clients). All plans include the same features — the only difference is the number of clients you can manage. Every plan includes a 14-day free trial.',
        },
        {
          q: 'Can I change my plan at any time?',
          a: 'Yes. You can upgrade or downgrade your plan at any time from account settings. Upgrades take effect immediately with prorated billing for the remaining days in the current period.',
        },
        {
          q: 'Which payment methods are accepted?',
          a: 'We accept all major payment cards (Visa, Mastercard), Apple Pay, Google Pay and SEPA direct debit. Payments are securely processed through Stripe — one of the most trusted payment platforms in the world.',
        },
        {
          q: 'Can I cancel my subscription?',
          a: 'Yes, with no penalties and no explanation required. You can cancel at any time from account settings with a single click. After cancellation you retain access to all features until the end of the paid period.',
        },
        {
          q: 'Is there a refund policy?',
          a: 'Within 14 days of your first payment you have the right to a full refund without stating a reason (EU consumer right of withdrawal), unless you have actively used the service. Contact support@unitlift.com for a refund.',
        },
      ],
    },
    {
      id: 'for-coaches',
      title: 'For Coaches',
      questions: [
        {
          q: 'How many clients can I have?',
          a: 'Starter supports up to 15 active clients, Pro up to 50, and Scale up to 150. If you have more than 150 clients on Scale, pricing increases by +€10/mo for every additional 25. You can archive clients to free up spots within your plan\'s limit.',
        },
        {
          q: 'Can I use my own branding?',
          a: 'Yes, branding is available on all plans. In settings, add your logo, choose your primary colors, and connect your social media profiles. Clients then see your brand throughout the app instead of UnitLift\'s — it looks like your own custom app.',
        },
        {
          q: 'How do check-ins work?',
          a: 'You define custom check-in parameters for each client (e.g. weekly body weight, step count, sleep hours, mood, progress photos). Clients fill them in the app and you immediately see responses with progress charts in the dashboard. The system automatically sends reminders to clients who are late.',
        },
        {
          q: 'How do I track client payments and finances?',
          a: 'On all plans you have access to a financial overview: revenue by period, payment status for each client, outstanding invoices, and total earnings — all on one screen. You always know exactly who has paid and when each subscription expires.',
        },
        {
          q: 'Can I send notifications to clients?',
          a: 'Yes, on all plans. You can send manual notifications or set automatic reminders for check-ins. Push notifications arrive directly on the client\'s phone through the app.',
        },
      ],
    },
    {
      id: 'for-clients',
      title: 'For Clients',
      questions: [
        {
          q: 'Do clients need to pay for the app?',
          a: 'No. The client app is completely free to download and use on iOS and Android devices. Only the coach pays for platform access — clients never see any charges.',
        },
        {
          q: 'How does a client get access?',
          a: 'The coach sends an invitation to the client\'s email directly from the platform. The client clicks the link, downloads the app from the App Store or Google Play, creates an account, and immediately has access to all plans, check-ins and chat. The entire process takes less than 2 minutes.',
        },
        {
          q: 'Can clients communicate with their coach?',
          a: 'Yes. The client app has a built-in chat with the coach. All messages are in one place — no more scattered WhatsApp conversations. The coach sees all messages in the web platform and can reply from their phone or computer.',
        },
        {
          q: 'What happens to client data if the coach closes their account?',
          a: 'All personal data and content associated with the client will be deleted in accordance with our Privacy Policy within 30 days. The coach can export plans for clients before closing the account so clients retain access to their content.',
        },
      ],
    },
    {
      id: 'technical',
      title: 'Technical',
      questions: [
        {
          q: 'Is data storage secure?',
          a: 'Yes. All data is encrypted with TLS protocol in transit and AES-256 encryption at rest. Access to data is restricted to authorized personnel only. Infrastructure is hosted on EU servers in compliance with GDPR requirements.',
        },
        {
          q: 'What happens to my data if I cancel?',
          a: 'After cancellation you retain data access until the end of your paid period. After that, data is kept for 30 more days then permanently deleted. You can export all your data at any time from account settings.',
        },
        {
          q: 'Does the app work offline?',
          a: 'The web platform requires an internet connection. The client mobile app can display previously loaded plans offline, but an active internet connection is required to submit check-ins and send messages.',
        },
        {
          q: 'How do I contact support?',
          a: 'You can reach support at support@unitlift.com or through the contact form at unitlift.com/kontakt. We respond within one business day.',
        },
      ],
    },
  ],
}
