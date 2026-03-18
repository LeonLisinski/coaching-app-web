import type { LegalDocument } from './types'

export const termsEn: LegalDocument = {
  title: 'Terms of Service',
  lastUpdated: 'March 18, 2025',
  version: '1.0',
  intro: 'These Terms of Service govern your use of the UnitLift application. Please read them carefully.',
  callout: 'By using the UnitLift application at https://app.unitlift.com or in the mobile app you accept these Terms of Service. Please read them carefully.',
  sections: [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: [
        { text: 'These Terms of Service ("Terms") govern your use of the UnitLift application available at https://app.unitlift.com and in the mobile application (collectively: "Service"). The Service is provided by UnitDuo, obrt za digitalne usluge, vl. Leon Lišinski ("we", "Service Provider").' },
        { text: 'By registering or using the Service, you confirm that you have read, understood, and accepted these Terms. If you do not agree, please stop using the Service.' },
      ],
    },
    {
      id: 'description',
      title: '2. Description of the Service',
      content: [
        { text: 'UnitLift is an online fitness coaching platform that enables:' },
        {
          items: [
            'Trainers: client management, creation of training and nutrition plans, tracking client progress, communication with clients, and billing.',
            'Clients: access to training and nutrition plans, meal and workout logging, check-in tracking, and communication with their trainer.',
          ],
        },
        { text: 'The Service is intended for adults and professional trainers. Persons under 18 years of age may not use the Service without parental or guardian consent.' },
      ],
    },
    {
      id: 'registration',
      title: '3. Registration and Account',
      content: [
        { text: 'To use the Service, you must create a user account. You agree to:' },
        {
          items: [
            'Provide accurate and complete information upon registration',
            'Keep your information up to date',
            'Keep your password confidential and not share it with third parties',
            'Notify us immediately of any unauthorized access to your account',
          ],
        },
        { text: 'You are responsible for all activities on your account. We are not liable for damage resulting from unauthorized use of your account if you failed to report the unauthorized access in a timely manner.' },
      ],
    },
    {
      id: 'subscriptions',
      title: '4. Subscriptions and Payment',
      content: [
        { text: 'Access to all Service features requires an active subscription. Subscriptions are intended for trainers. Payments are processed via the Stripe platform. By accepting these Terms, you also accept Stripe\'s terms of service available at https://stripe.com/legal.' },
        { text: 'UnitLift is not an intermediary in payments between trainers and their clients. Any financial relationship between a trainer and their client takes place outside the platform and is the sole responsibility of the trainer.' },
        { subsection: '4.1 Billing' },
        { text: 'Subscription fees are charged in advance for the selected period (monthly or annually). Auto-renewal is active unless deactivated in your account settings.' },
        { subsection: '4.2 Refunds' },
        { text: 'Refunds are processed in accordance with applicable consumer protection laws. Within 14 days of the first payment, you have the right to a full refund without stating a reason (EU consumer right of withdrawal), unless you have actively used the Service.' },
        { subsection: '4.3 Price Changes' },
        { text: 'We reserve the right to change prices with at least 30 days\' prior notice.' },
      ],
    },
    {
      id: 'prohibited-use',
      title: '5. Prohibited Use',
      content: [
        { text: 'The following is prohibited:' },
        {
          items: [
            'Using the Service for illegal purposes or in ways that violate these Terms',
            'Accessing systems or data you are not authorized to access',
            'Sharing false, misleading, or harmful content',
            'Disrupting the operation of the Service or infrastructure',
            'Reverse engineering, decompiling, or attempting to extract source code',
            'Reselling or licensing the Service to third parties without our written permission',
            'Collecting user data without their consent',
          ],
        },
      ],
    },
    {
      id: 'user-content',
      title: '6. User Content',
      content: [
        { text: 'By submitting content to the Service (plans, comments, messages, etc.), you retain all rights to that content but grant us a non-exclusive, royalty-free license to store and display it for the purpose of providing the Service.' },
        { text: 'You are responsible for the content you submit. Prohibited content includes:' },
        {
          items: [
            'Content that infringes third-party rights (copyright, trademarks, etc.)',
            'Offensive, discriminatory, defamatory, or threatening content',
            'Malicious software or viruses',
          ],
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: '7. Intellectual Property',
      content: [
        { text: 'All rights to the Service, including software, design, logos, text, and other materials, are owned by the Service Provider or its licensors. Any use without prior written permission is prohibited.' },
      ],
    },
    {
      id: 'availability',
      title: '8. Service Availability',
      content: [
        { text: 'We strive to ensure high Service availability but do not guarantee uninterrupted or error-free operation. We reserve the right to temporarily suspend the Service for maintenance or upgrades, with prior notice whenever possible.' },
      ],
    },
    {
      id: 'disclaimer',
      title: '9. Disclaimer of Warranties',
      content: [
        { text: 'The Service is provided "as is" and "as available." We make no warranties, express or implied, regarding fitness for a particular purpose, reliability, or accuracy of information.' },
        { note: 'UnitLift is not a medical application. Content provided by trainers within the app does not replace professional medical advice. Use the Service at your own risk.' },
      ],
    },
    {
      id: 'limitation',
      title: '10. Limitation of Liability',
      content: [
        { text: 'To the maximum extent permitted by law, the Service Provider is not liable for:' },
        {
          items: [
            'Indirect, incidental, or consequential damages',
            'Loss of data or revenue',
            'Damage resulting from unauthorized access to your account that you failed to report',
          ],
        },
        { text: 'Our total liability to you shall not exceed the amount you paid for the Service in the preceding 12 months.' },
      ],
    },
    {
      id: 'termination',
      title: '11. Termination',
      content: [
        { text: 'You may terminate this agreement by deleting your account at any time. We may suspend or terminate your access to the Service if:' },
        {
          items: [
            'You violate these Terms',
            'You use the Service in a way that harms other users or us',
            'You fail to pay outstanding subscription fees',
          ],
        },
        { text: 'In the event of termination by us without your fault, we will refund the pro-rated portion of your unused subscription.' },
      ],
    },
    {
      id: 'changes',
      title: '12. Changes to Terms',
      content: [
        { text: 'We reserve the right to modify these Terms. We will notify you of significant changes at least 14 days in advance via email or in-app notification. Continued use of the Service after changes constitutes acceptance of the updated Terms.' },
      ],
    },
    {
      id: 'governing-law',
      title: '13. Governing Law and Jurisdiction',
      content: [
        { text: 'These Terms are governed by the laws of the Republic of Croatia. Any disputes arising from these Terms shall be subject to the jurisdiction of the court in Osijek, Croatia, unless mandatory law provides otherwise.' },
        { text: 'EU consumers have the right to use the online dispute resolution platform: https://ec.europa.eu/consumers/odr/' },
      ],
    },
    {
      id: 'contact',
      title: '14. Contact',
      content: [
        { text: 'For questions regarding these Terms, contact us:' },
        {
          items: [
            'UnitDuo, obrt za digitalne usluge, vl. Leon Lišinski',
            'Vijenac Ivana Meštrovića 80, Osijek, Croatia',
            'Email: support@unitlift.com',
          ],
        },
      ],
    },
  ],
}
