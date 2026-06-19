export const PLANS = ['starter', 'pro', 'scale'] as const
export type PlanKey = (typeof PLANS)[number]

/** Monthly prices in EUR for each plan (index matches PLANS). */
export const PRICES: Record<PlanKey, number> = {
  starter: 29,
  pro:     59,
  scale:   99,
}

/** Maximum clients per plan. */
export const CLIENT_LIMITS: Record<PlanKey, number> = {
  starter: 10,
  pro:     30,
  scale:   75,
}
