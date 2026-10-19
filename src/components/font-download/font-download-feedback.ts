/** User-visible labels — never claim a file was saved when that cannot be verified. */
export const FONT_DOWNLOAD_FEEDBACK = {
  idle: 'Download',
  loading: 'Downloading…',
  /** Blob retrieved and programmatic download click fired (not OS save confirmation). */
  started: 'Download started',
  /** Same-origin <a download> fallback; outcome unknown. */
  fallback: 'Trying browser download…',
} as const;

export type FontDownloadFeedbackKind = keyof typeof FONT_DOWNLOAD_FEEDBACK;
