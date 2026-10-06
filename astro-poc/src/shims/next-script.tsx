import type { ScriptHTMLAttributes, ReactNode } from 'react';

/** next/script shim — load as a normal script tag. */
export default function Script({
  children,
  strategy: _strategy,
  onLoad,
  onReady,
  onError,
  ...rest
}: ScriptHTMLAttributes<HTMLScriptElement> & {
  children?: ReactNode;
  strategy?: string;
  onReady?: () => void;
}) {
  return (
    <script
      {...rest}
      onLoad={(e) => {
        onLoad?.(e);
        onReady?.();
      }}
      onError={onError}
    >
      {children}
    </script>
  );
}
