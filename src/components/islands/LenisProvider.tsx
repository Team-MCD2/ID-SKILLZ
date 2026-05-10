import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-driven smooth scroll for the entire document.
 *
 * Hooks GSAP's ScrollTrigger update if it is loaded later in the document
 * (it isn't here yet, but this keeps the option open without coupling).
 */
export default function LenisProvider() {
	useEffect(() => {
		// Respect prefers-reduced-motion
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) return;

		const lenis = new Lenis({
			duration: 1.2,
			lerp: 0.08,
			wheelMultiplier: 1,
			touchMultiplier: 1.5,
			smoothWheel: true,
			autoRaf: true,
			anchors: { offset: -80, onComplete: () => {} },
		});

		// Expose for other islands that might want to control it
		(window as unknown as { __lenis?: Lenis }).__lenis = lenis;

		return () => {
			lenis.destroy();
			delete (window as unknown as { __lenis?: Lenis }).__lenis;
		};
	}, []);

	return null;
}
