import { redirect } from 'next/navigation';

/** Legacy WP/Next path → canonical /terms-conditions */
export default function TermsAndConditionsRedirect() {
  redirect('/terms-conditions');
}
