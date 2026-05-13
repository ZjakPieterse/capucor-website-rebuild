'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield } from 'lucide-react';

const NOISE_LABELS = [
  { text: 'Late Filings', top: '20%', left: '15%', delay: 0 },
  { text: 'VAT Maze', top: '45%', left: '80%', delay: 1 },
  { text: 'Payroll Lag', top: '70%', left: '10%', delay: 2 },
  { text: 'SARS Penalties', top: '30%', left: '65%', delay: 0.5 },
  { text: 'Data Gaps', top: '60%', left: '25%', delay: 1.5 },
  { text: 'Owner Burnout', top: '15%', left: '75%', delay: 2.5 },
];

export function FinancialNoise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const labelScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const shieldY = useTransform(scrollYProgress, [0.6, 0.9], ["100%", "0%"]);
  const noiseX = useTransform(scrollYProgress, [0.6, 0.9], ["0%", "150%"]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Darkening background */}
        <motion.div 
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0 bg-[#020617] z-0"
        />

        {/* Chaos Layer */}
        <motion.div 
          style={{ x: noiseX }}
          className="relative w-full h-full z-10"
        >
          {NOISE_LABELS.map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              style={{ 
                top: label.top, 
                left: label.left,
                scale: labelScale,
              }}
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 5 + i, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute text-2xl lg:text-4xl font-heading font-thin text-white/40 tracking-tighter whitespace-nowrap"
            >
              {label.text}
            </motion.div>
          ))}

          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <motion.h2 
              className="text-4xl lg:text-7xl font-bold tracking-tighter max-w-4xl text-balance mb-8"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
            >
              Traditional finance is <span className="text-white/20 italic">noisy.</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* The Capucor Shield (Clean Sweep) */}
        <motion.div 
          style={{ y: shieldY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-500"
        >
          <div className="max-w-4xl px-6 text-center text-[#020617]">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="mb-8 flex justify-center"
            >
              <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-2xl">
                <Shield className="w-12 h-12 text-emerald-500" />
              </div>
            </motion.div>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold tracking-tighter mb-8 leading-none">
              Silence the noise.<br />Engineer the flow.
            </h2>
            <p className="text-xl lg:text-2xl font-medium opacity-80 max-w-2xl mx-auto">
              We replace chaos with a predictable, automated, and human-verified financial engine.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
