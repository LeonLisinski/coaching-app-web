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
          q: 'Do I need a card to sign up?',
          a: 'Yes, a card is required to activate the trial, but you are not charged immediately. Try UnitLift free for 14 days. Billing starts only if you continue with a paid plan.',
        },
        {
          q: 'How long does setup take?',
          a: 'Less than 5 minutes. Set up your profile, customize parameters and invite your first client the same day. No long onboarding or complex configuration.',
        },
        {
          q: 'Which devices does UnitLift support?',
          a: 'The web app works on all modern browsers (Chrome, Firefox, Safari, Edge) and you can add it to your phone as a PWA. Clients have a separate iOS and Android app that is free.',
        },
        {
          q: 'Is UnitLift GDPR compliant?',
          a: 'Yes. Data sits on EU servers, protected by TLS in transit and AES-256 at rest. More details in our Privacy Policy.',
        },
        {
          q: 'Which languages are supported?',
          a: 'The web is in Croatian and English. The client app supports the same languages - clients pick the language on first launch.',
        },
      ],
    },
    {
      id: 'pricing-payments',
      title: 'Pricing & Payments',
      questions: [
        {
          q: 'How much does UnitLift cost?',
          a: 'Three plans: Starter (€29/mo - up to 15 clients), Pro (€59/mo - up to 50) and Scale (€99/mo - up to 150). All plans share the same features - only the client count differs. Each includes a 14-day free trial.',
        },
        {
          q: 'Can I change my plan at any time?',
          a: 'Yes. Upgrade or downgrade at any time from account settings. Upgrades take effect immediately, billed prorated for the remaining days.',
        },
        {
          q: 'Which payment methods are accepted?',
          a: 'Visa, Mastercard, Apple Pay, Google Pay and SEPA direct debit. Payments are processed through Stripe - one of the most trusted payment providers.',
        },
        {
          q: 'Can I cancel my subscription?',
          a: 'Yes, with no penalties and no explanation required. Cancel from account settings in a single click. You keep access until the end of the paid period.',
        },
        {
          q: 'Is there a refund policy?',
          a: 'Within 14 days of your first payment you have the right to a full refund without stating a reason (EU consumer right of withdrawal). Contact support@unitlift.com for a refund.',
        },
      ],
    },
    {
      id: 'for-coaches',
      title: 'For Coaches',
      questions: [
        {
          q: 'How many clients can I have?',
          a: 'Starter - up to 15, Pro - up to 50, Scale - up to 150 active clients. Above 150 on Scale, add €10/mo per 25 extra clients. Archive clients to free up spots within your limit.',
        },
        {
          q: 'Can I use my own branding?',
          a: 'Yes, branding is available on Pro and Scale. In settings, add your logo and pick primary colors. Clients see your brand inside the app instead of UnitLift\'s.',
        },
        {
          q: 'How do check-ins work?',
          a: 'You define check-in parameters for each client (weight, steps, sleep, mood, photos). Clients fill them in the app and you see answers with charts in the dashboard. The system sends automatic reminders.',
        },
        {
          q: 'How do I track client payments and finances?',
          a: 'You get a financial overview: revenue by period, payment status per client, outstanding invoices and total earnings. All on one screen - you know who paid and when each subscription expires.',
        },
        {
          q: 'Can I send notifications to clients?',
          a: 'Yes, on all plans. Send manual messages or set automatic check-in reminders. Push notifications go straight to the client\'s phone.',
        },
      ],
    },
    {
      id: 'for-clients',
      title: 'For Clients',
      questions: [
        {
          q: 'Do clients need to pay for the app?',
          a: 'No. The client app is free on iOS and Android. Only the coach pays for platform access - clients never see any charges.',
        },
        {
          q: 'How does a client get access?',
          a: 'The coach sends an invitation to the client\'s email directly from the platform. The client clicks the link, downloads the app and creates an account. They instantly have access to plans, check-in and chat.',
        },
        {
          q: 'Can clients communicate with their coach?',
          a: 'Yes. The client app has a built-in chat with the coach. All messages in one place - no scattered WhatsApp conversations. The coach replies from the phone or computer.',
        },
        {
          q: 'What happens to client data if the coach closes their account?',
          a: 'Personal data is deleted within 30 days in line with our Privacy Policy. The coach can export plans before closing the account so clients keep their content.',
        },
      ],
    },
    {
      id: 'technical',
      title: 'Technical',
      questions: [
        {
          q: 'Is data storage secure?',
          a: 'Yes. Data is encrypted with TLS in transit and AES-256 at rest. Access is restricted to authorized staff. Infrastructure runs on EU servers, in line with GDPR.',
        },
        {
          q: 'What happens to my data if I cancel?',
          a: 'You keep access until the end of your paid period. After that, data is held for 30 more days and then deleted. You can export all data from account settings anytime.',
        },
        {
          q: 'Does the app work offline?',
          a: 'The web needs an internet connection. The client app can show previously loaded plans offline, but submitting check-in and chatting needs an active connection.',
        },
        {
          q: 'How do I contact support?',
          a: 'Email support@unitlift.com or use the contact form at unitlift.com/kontakt. We reply within one business day.',
        },
      ],
    },
  ],
}
