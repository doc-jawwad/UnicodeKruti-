import {
  lazy,
  Suspense,
  type ComponentType,
  type ReactNode,
} from 'react';

type DynamicOptions = {
  ssr?: boolean;
  loading?: () => ReactNode;
};

/**
 * next/dynamic → React.lazy + Suspense.
 * Islands using client:only already skip SSR of the island tree.
 */
export default function dynamic<P extends object>(
  loader: () => Promise<{ default: ComponentType<P> } | ComponentType<P>>,
  options: DynamicOptions = {}
): ComponentType<P> {
  const Lazy = lazy(async () => {
    const mod = await loader();
    if (mod && typeof mod === 'object' && 'default' in mod) {
      return mod as { default: ComponentType<P> };
    }
    return { default: mod as ComponentType<P> };
  });

  function DynamicComponent(props: P) {
    return (
      <Suspense fallback={options.loading ? options.loading() : null}>
        <Lazy {...props} />
      </Suspense>
    );
  }

  DynamicComponent.displayName = 'NextDynamicShim';
  return DynamicComponent;
}
