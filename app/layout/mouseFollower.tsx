'use client';
import { useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function MouseFollower() {
  const [cursorState, setCursorState] = useState({ isPointer: false, edgeOpacity: 1 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updatePointerState = useCallback((e: MouseEvent) => {
    const el = (e.target as HTMLElement).closest('a,button,[role="button"],[onClick]');
    const isPointer = !!el;

    const EDGE_THRESHOLD = 25;
    const minDistance = Math.min(e.clientX, window.innerWidth - e.clientX, e.clientY, window.innerHeight - e.clientY);
    const edgeOpacity = Math.min(minDistance / EDGE_THRESHOLD, 1);

    setCursorState({ isPointer, edgeOpacity });
  }, []);

  
  useEffect(() => {
    if ('ontouchstart' in window) {setIsTouchDevice(true); return}

    const moveHandler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updatePointerState(e);
    };

    window.addEventListener('mousemove', moveHandler);

  }, [updatePointerState, mouseX, mouseY]);

  if (isTouchDevice) return null;
  return (
    <motion.div
      className='mouse-follower'
      style={{
        position: 'fixed',
        top: mouseY,
        left: mouseX,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 50,
        borderWidth: 2,
        opacity: cursorState.edgeOpacity,
      }}
      animate={{
        width: cursorState.isPointer ? 16 : 8,
        height: cursorState.isPointer ? 16 : 8,
        rotate: cursorState.isPointer ? '225deg' : '45deg',
        backgroundColor: cursorState.isPointer ? 'transparent' : '',
      }}
      transition={{
        duration: 0.25,
        ease: 'easeOut',
      }}
    />
  );
}
