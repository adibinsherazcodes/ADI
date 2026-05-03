import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const words = ['Design', 'Create', 'Inspire']

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number>(0)

  useEffect(() => {
    let assetsLoaded = false;

    Promise.all([
      new Promise(resolve => {
        if (document.readyState === 'complete') resolve(true);
        else window.addEventListener('load', resolve);
      }),
      document.fonts ? document.fonts.ready : Promise.resolve()
    ]).then(() => {
      assetsLoaded = true;
    });

    const duration = 2000;

    const tick = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      
      let progress = elapsed / duration;
      let current = Math.floor(progress * 100);

      if (!assetsLoaded && current >= 99) {
        current = 99;
      } else if (assetsLoaded && current >= 100) {
        current = 100;
      }

      setCount(Math.min(current, 100));

      if (current < 100) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 400);
        }, 400);
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] bg-bg flex flex-col overflow-hidden"
        >
          {/* Top-left label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em] font-body"
          >
            Portfolio
          </motion.div>

          {/* Center word */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 select-none"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bottom right counter */}
          <div className="absolute bottom-12 right-8">
            <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums select-none">
              {String(count).padStart(3, '0')}
            </span>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
            <motion.div
              className="h-full accent-gradient origin-left"
              style={{
                scaleX: count / 100,
                boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
              }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
