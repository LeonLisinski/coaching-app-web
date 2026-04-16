import type { LegalDocument } from './types'

export const privacyEn: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: 'March 20, 2025',
  version: '1.0',
  intro: 'This Privacy Policy describes how we collect, use, and protect your personal data.',
  callout: 'By using our services available at https://app.unitlift.com and in the UnitLift mobile application, you accept the terms described in this Privacy Policy. Please read it carefully.',
  sections: [
    {
      id: 'who-we-are',
      title: '1. Who We Are',
      content: [
        { text: 'The data controller is:' },
        {
          items: [
            'UnitLift, obrt za digitalne usluge, vl. Leon Lišinski',
            'Vijenac Ivana Meštrovića 80, Osijek, Croatia',
            'Tax ID (OIB): 61111415884',
            'Business Registration Number: 99113821',
            'Email: support@unitlift.com',
          ],
        },
      ],
    },
    {
      id: 'data-we-collect',
      title: '2. Data We Collect',
      content: [
        { subsection: '2.1 Data You Provide Directly' },
        {
          items: [
            'Full name',
            'Email address',
            'Profile photo (avatar) — optional',
            'Training and nutrition data (plans, meals, recipes, foods)',
            'Check-in data defined by your trainer — such as steps, sleep hours, mood, etc.',
            'Messages exchanged between trainer and client within the app',
          ],
        },
        { subsection: '2.2 Data Collected Automatically' },
        {
          items: [
            'Technical device information (device type, operating system, app version)',
            'Service usage data (login date and time, pages viewed)',
            'IP address',
          ],
        },
        { subsection: '2.3 Payment Data' },
        { text: 'Payments are processed through Stripe. We do not store card data. Stripe processes data in compliance with the PCI DSS standard. Details at https://stripe.com/privacy.' },
        { note: 'UnitLift is not an intermediary in payments between trainers and their clients. Payments between trainers and clients take place outside the platform — trainers record them in the app solely for their own financial tracking purposes.' },
        { subsection: '2.4 Push Notifications' },
        { text: 'If you consent to receive push notifications, we collect the device token required to send them. You can opt out in your device settings at any time.' },
      ],
    },
    {
      id: 'purpose',
      title: '3. Purpose and Legal Basis for Processing',
      content: [
        { text: 'We process your data for the following purposes:' },
        {
          items: [
            'Providing the service — performance of contract (Art. 6(1)(b) GDPR)',
            'Trainer-client communication — performance of contract',
            'Sending push notifications — your consent (Art. 6(1)(a) GDPR)',
            'Security and fraud prevention — legitimate interest (Art. 6(1)(f) GDPR)',
            'Compliance with legal obligations — legal obligation (Art. 6(1)(c) GDPR)',
          ],
        },
      ],
    },
    {
      id: 'sharing',
      title: '4. Sharing Data with Third Parties',
      content: [
        { text: 'We do not sell your data to third parties. We may share data with:' },
        {
          items: [
            'Supabase Inc. — data storage and authentication (USA; protected via standard contractual clauses)',
            'Vercel Inc. — web application hosting',
            'Stripe Inc. — payment processing',
            'Resend Inc. — transactional email delivery (contact form)',
            'Push notification providers — Apple (APNs) and Google (FCM)',
          ],
        },
        { text: 'All recipients process data solely according to our instructions and are bound by appropriate data processing agreements.' },
      ],
    },
    {
      id: 'international-transfers',
      title: '5. International Data Transfers',
      content: [
        { text: 'Some of our service providers are located outside the European Economic Area (EEA), such as in the USA. In such cases, appropriate safeguards are applied in accordance with GDPR, including Standard Contractual Clauses issued by the European Commission.' },
      ],
    },
    {
      id: 'data-retention',
      title: '6. Data Retention',
      content: [
        { text: 'We retain your personal data for as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by law.' },
        { text: 'After account deletion, personal data is erased within 30 days, except data we are required to retain under applicable law.' },
      ],
    },
    {
      id: 'your-rights',
      title: '7. Your Rights',
      content: [
        { text: 'As a data subject under GDPR, you have the following rights:' },
        {
          items: [
            'Right of access — you may request a copy of your personal data',
            'Right to rectification — you may request correction of inaccurate data',
            'Right to erasure ("right to be forgotten") — you may request deletion of your data',
            'Right to restriction of processing — you may request temporary suspension of processing',
            'Right to data portability — you may request your data in a machine-readable format',
            'Right to object — you may object to processing based on legitimate interest',
            'Right to withdraw consent — if processing is based on consent, you may withdraw it at any time',
          ],
        },
        { text: 'Submit requests to: support@unitlift.com' },
        { text: 'You also have the right to lodge a complaint with a supervisory authority. In Croatia, the competent authority is the Croatian Personal Data Protection Agency (AZOP), www.azop.hr.' },
      ],
    },
    {
      id: 'account-deletion',
      title: '8. Account Deletion',
      content: [
        { text: 'You may request deletion of your account and all associated data:' },
        {
          items: [
            'Within the app: Settings → My Account → Delete Account',
            'By email: support@unitlift.com',
          ],
        },
        { text: 'After the request is confirmed, your account and personal data will be deleted within 30 days.' },
      ],
    },
    {
      id: 'security',
      title: '9. Data Security',
      content: [
        { text: 'We implement technical and organizational security measures to protect your data from unauthorized access, loss, or destruction.' },
        {
          items: [
            'All connections are protected with TLS encryption',
            'Access to data is restricted to authorized personnel only',
          ],
        },
      ],
    },
    {
      id: 'cookies',
      title: '10. Cookies and Similar Technologies',
      content: [
        { text: 'The web application may use essential cookies for service functionality (authentication, session management). We do not use cookies for tracking or advertising.' },
      ],
    },
    {
      id: 'minors',
      title: '11. Minors',
      content: [
        { text: 'The service is not intended for persons under 18 years of age. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child, we will delete it immediately.' },
      ],
    },
    {
      id: 'changes',
      title: '12. Changes to This Privacy Policy',
      content: [
        { text: 'We reserve the right to modify this Policy. We will notify you of significant changes via email or in-app notification. Continued use of the service after changes are published constitutes acceptance of the updated terms.' },
      ],
    },
    {
      id: 'contact',
      title: '13. Contact',
      content: [
        { text: 'For any privacy-related questions, contact us:' },
        {
          items: [
            'UnitLift, obrt za digitalne usluge, vl. Leon Lišinski',
            'Vijenac Ivana Meštrovića 80, Osijek, Croatia',
            'Email: support@unitlift.com',
          ],
        },
      ],
    },
  ],
}
