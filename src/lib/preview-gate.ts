// Pre-launch gate for stub pages that look like a real authenticated experience
// (e.g. /client-portal, /onboarding). Replace with `requireSession()` once
// Supabase Auth is wired (see Phase A of the audit plan).
//
// Access is granted when:
//   - we're not in production, OR
//   - the request supplies `?preview=<PORTAL_PREVIEW_SECRET>`.
//
// If `PORTAL_PREVIEW_SECRET` is unset, the gate is always closed in production —
// safer default than accidentally exposing the stub.

export function isPreviewAllowed(rawPreviewParam?: string | string[]): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  const secret = process.env.PORTAL_PREVIEW_SECRET;
  if (!secret) {
    return false;
  }

  const previewParam = Array.isArray(rawPreviewParam) ? rawPreviewParam[0] : rawPreviewParam;
  return Boolean(previewParam) && previewParam === secret;
}
