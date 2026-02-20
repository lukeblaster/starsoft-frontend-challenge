import { AnimationPlaybackControls, useAnimate, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { UseProgressAnimationProps } from "./props";

export function useProgressAnimation({ isLoading }: UseProgressAnimationProps) {
    const [scope, animate] = useAnimate();
    const animation = useRef<AnimationPlaybackControls | null>(null);
    const width = useMotionValue('0%');

    useEffect(() => {
        if (isLoading) {
            animation.current = animate(width, ['25%', '50%', '75%', '100%'], {
                duration: 3,
                ease: 'easeOut',
            });
        }

        return () => {
            animation.current?.stop();
            width.set('0%');
        };
    }, [isLoading, animate, width]);

    return { scope, width };
}