/** Pure reminder policy; no service-worker or converter behavior. */
export const PWA_NOTICE_COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000;

export function shouldSuppressPwaNotice(dismissedAt: number | null, now: number): boolean {
  if (dismissedAt === null || !Number.isFinite(dismissedAt)) return false;
  return dismissedAt > 0 && now >= dismissedAt && now - dismissedAt < PWA_NOTICE_COOLDOWN_MS;
}
