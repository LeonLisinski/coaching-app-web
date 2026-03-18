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
          a: 'No. Try UnitLift free for 14 days without entering a credit card. A card is only required when you decide to continue with a paid plan.',
        },
        {
          q: 'How long does setup take?',
          a: 'Less than 5 minutes. Registration is fast — you set up your profile right away and can invite your first client the same day. No lengthy onboarding process.',
        },
        {
          q: 'Which devices does UnitLift support?',
          a: 'The web app for coaches works on all modern browsers (Chrome, Firefox, Safari, Edge) and is fully responsive — you can add it to your phone\'s home screen as a PWA. Clients have a dedicated iOS and Android app.',
        },
        {
          q: 'Is UnitLift GDPR compliant?',
          a: 'Yes. UnitLift is built with full respect for GDPR regulations. All data is stored on secure servers. All connections are protected by TLS encryption. Read more in our Privacy Policy.',
        },
        {
          q: 'Which languages are supported?',
          a: 'The web platform is available in Croatian and English. The client mobile app supports the same languages.',
        },
      ],
    },
    {
      id: 'pricing-payments',
      title: 'Pricing & Payments',
      questions: [
        {
          q: 'How much does UnitLift cost?',
          a: 'UnitLift offers three plans: Starter (€29/mo), Pro (€59/mo) and Scale (€99/mo). All plans include a 14-day free trial. With annual billing you save up to 20% — Starter €290, Pro €590, Scale €990 per year.',
        },
        {
          q: 'Can I change my plan at any time?',
          a: 'Yes. You can upgrade or downgrade your plan at any time from account settings. Upgrades take effect immediately with prorated billing for the remaining days.',
        },
        {
          q: 'How does annual billing work?',
          a: 'With annual billing you pay upfront for 12 months and automatically receive a 20% discount. An invoice is sent once and the subscription renews annually unless cancelled.',
        },
        {
          q: 'Which payment methods are accepted?',
          a: 'We accept all major payment cards (Visa, Mastercard), Apple Pay, Google Pay and SEPA direct debit. Payments are securely processed through the Stripe platform.',
        },
        {
          q: 'Can I cancel my subscription?',
          a: 'Yes, with no penalties and no explanation required. You can cancel at any time from account settings. After cancellation you retain access to all features until the end of the paid period.',
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
          a: 'Starter supports up to 5 active clients, Pro up to 20, and the Scale plan has no limit. You can archive clients to free up spots within your plan\'s limit.',
        },
        {
          q: 'Can I use my own branding?',
          a: 'Yes, on Pro and Scale plans. Add your logo, choose your primary colors, and connect social media. Clients see your brand throughout the app.',
        },
        {
          q: 'How do check-ins work?',
          a: 'You define custom check-in parameters for each client (e.g. weekly body weight, step count, sleep hours, mood, progress photos). Clients fill them in the app and you immediately see responses with progress charts in the dashboard.',
        },
        {
          q: 'Can I send push notifications to clients?',
          a: 'Yes, on Pro and Scale plans. You can send manual notifications or set automatic reminders for check-ins, payments, or workouts.',
        },
        {
          q: 'How do I track client payments and finances?',
          a: 'On Pro and Scale plans you have access to financial reports: revenue overview by period, payment status for each client, outstanding invoices, and total earnings — all on one screen.',
        },
      ],
    },
    {
      id: 'for-clients',
      title: 'For Clients',
      questions: [
        {
          q: 'Do clients need to pay for the app?',
          a: 'No. The client app is completely free to download and use on iOS and Android. Only the coach pays for platform access.',
        },
        {
          q: 'How does a client get access?',
          a: 'The coach sends an invitation to the client\'s email. The client clicks the link, downloads the app from the App Store or Google Play, creates an account, and immediately has access to all plans and check-ins.',
        },
        {
          q: 'Can clients communicate with their coach?',
          a: 'Yes. The client app has a built-in chat with the coach. All messages are in one place — no more scattered WhatsApp conversations.',
        },
        {
          q: 'What happens to client data if the coach closes their account?',
          a: 'All personal data and content associated with the client will be deleted in accordance with our Privacy Policy within 30 days. The coach can export plans for clients before closing the account.',
        },
      ],
    },
    {
      id: 'technical',
      title: 'Technical',
      questions: [
        {
          q: 'Is data storage secure?',
          a: 'Yes. All data is encrypted with TLS protocol in transit and AES-256 encryption at rest. Access to data is restricted to authorized personnel only.',
        },
        {
          q: 'What happens to my data if I cancel?',
          a: 'After cancellation you retain data access until the end of your paid period. After that, data is kept for 30 more days then permanently deleted. You can export your data at any time from account settings.',
        },
        {
          q: 'Does the app work offline?',
          a: 'The web platform requires an internet connection. The client mobile app can display previously loaded plans offline, but an internet connection is required to submit check-ins and send messages.',
        },
        {
          q: 'How do I contact support?',
          a: 'You can reach support at support@unitlift.com. We respond within one business day. Pro and Scale plan users receive priority support.',
        },
      ],
    },
  ],
}
