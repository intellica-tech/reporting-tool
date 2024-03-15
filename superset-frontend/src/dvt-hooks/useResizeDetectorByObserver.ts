import { useState, useCallback, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export default function useResizeDetectorByObserver() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width?: number; height?: number }>({});

  const onResize = useCallback(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []);

  const { ref: observerRef } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 300,
    onResize,
  });

  return {
    ref,
    observerRef,
    width: size.width,
    height: size.height,
  };
}
