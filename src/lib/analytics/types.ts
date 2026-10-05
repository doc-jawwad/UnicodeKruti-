/** GA4 custom event names for UnicodeKruti converters & font download. */
export type AnalyticsEventName =
  | 'tool_start'
  | 'conversion_complete'
  | 'copy_result'
  | 'clear_tool'
  | 'swap_direction'
  | 'example_used'
  | 'download_result'
  | 'validation_error';

export type ToolName =
  | 'unicode_to_krutidev'
  | 'krutidev_to_unicode'
  | 'krutidev_10_to_unicode'
  | 'krutidev_010_to_unicode'
  | 'unicode_to_krutidev_10'
  | 'nirmala_ui_to_krutidev'
  | 'updesh_converter'
  | 'font_download';

export type ConversionDirection =
  | 'uni_to_kd'
  | 'kd_to_uni'
  | 'unicode_to_updesh'
  | 'updesh_to_unicode';

export type AnalyticsVariant = '010' | '10' | 'updesh';

export type DownloadKind = 'txt' | 'docx' | 'pdf' | 'ttf';

export type ValidationErrorType =
  | 'unexpected_script'
  | 'file_too_large'
  | 'file_read_error';

/** Params sent with gtag('event'). Never include source/output/clipboard text. */
export type AnalyticsParams = {
  tool_name: ToolName;
  conversion_direction?: ConversionDirection;
  variant?: AnalyticsVariant;
  download_kind?: DownloadKind;
  error_type?: ValidationErrorType;
  /** Our own font filenames only (e.g. KRDEV010.TTF). */
  font_file?: string;
  input_chars?: number;
  output_chars?: number;
};

export type InputOrigin = 'user' | 'example' | 'other';
