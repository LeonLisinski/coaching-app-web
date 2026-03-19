import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' })

const PLAN_PRICE_MAP: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro:     process.env.STRIPE_PRICE_PRO,
  scale:   process.env.STRIPE_PRICE_SCALE,
}

const CLIENT_LIMITS: Record<string, number> = {
  starter: 15,
  pro:     50,
  scale:   150,
}

export async function POST(req: NextRequest) {
  const { plan } = await req.json()

  if (!plan || !PLAN_PRICE_MAP[plan]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const priceId = PLAN_PRICE_MAP[plan]
  if (!priceId) {
    return NextResponse.json({ error: `Price not configured for plan: ${plan}` }, { status: 500 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.unitlift.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { plan, client_limit: String(CLIENT_LIMITS[plan]) },
    },
    metadata: { plan, client_limit: String(CLIENT_LIMITS[plan]) },
    success_url: `${appUrl}/register?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
    cancel_url: `${process.env.NEXT_PUBLIC_LANDING_URL || 'https://unitlift.com'}/#cijene`,
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
