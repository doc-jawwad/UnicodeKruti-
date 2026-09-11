export type FixtureSource = 'sil' | 'ltrc' | 'gov-sample' | 'unicodekruti';

export type KrutiDev010Fixture = {
  id: string;
  category: string;
  input: string;
  expected: string;
  source: FixtureSource;
  notes?: string;
  /** When set, this case is Uni→KD (input is Unicode). Default is KD→Uni. */
  direction?: 'kd-to-uni' | 'uni-to-kd';
  /** Expected-lossy round trip: KD spelling need not survive Uni→KD. */
  lossy?: boolean;
};
