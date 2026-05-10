import { useEffect } from "react";

/**
 * Adds `.is-visible` to elements with `.reveal` when they enter the viewport.
 * Single global IntersectionObserver, very cheap. Skips when reduced-motion.
 */
export default function ScrollReveal() {
	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) {
			document
				.querySelectorAll<HTMLElement>(".reveal")
				.forEach((el) => el.classList.add("is-visible"));
			return;
		}

		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
		);

		const targets = document.querySelectorAll<HTMLElement>(".reveal");
		targets.forEach((el) => obs.observe(el));

		// Re-scan on dynamic content (after a brief delay)
		const lateScan = window.setTimeout(() => {
			document
				.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
				.forEach((el) => obs.observe(el));
		}, 800);

		return () => {
			window.clearTimeout(lateScan);
			obs.disconnect();
		};
	}, []);

	return null;
}
