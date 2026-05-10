import { useEffect, useRef } from "react";

interface Client {
	name: string;
	logo: string | null;
	label?: string;
}

interface Props {
	clients: Client[];
}

/**
 * PartnersParallax — left column of logo tiles that translates upward
 * faster than the page scroll, producing a soft parallax effect inside
 * a normally-flowing dark section. The right column is a sticky text
 * panel painted by the parent .astro file.
 *
 * Strategy: listen to scroll, compute the section's progress through
 * the viewport (0..1), then apply a translateY that ranges from +y0 to
 * -y1. The effect is disabled when prefers-reduced-motion is set.
 */
export default function PartnersParallax({ clients }: Props) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const colRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const wrap = wrapRef.current;
		const col = colRef.current;
		if (!wrap || !col) return;

		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduced) return;

		let raf = 0;
		const update = () => {
			raf = 0;
			const rect = wrap.getBoundingClientRect();
			const vh = window.innerHeight;
			// progress: 0 when section enters viewport from below, 1 when leaves at top
			const total = rect.height + vh;
			const passed = vh - rect.top;
			const p = Math.max(0, Math.min(1, passed / total));
			// Translate from +60px down to -60px up across the full pass
			const y = 60 - p * 120;
			col.style.transform = `translate3d(0, ${y}px, 0)`;
		};
		const onScroll = () => {
			if (raf) return;
			raf = window.requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (raf) window.cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<div className="partners__wrap" ref={wrapRef}>
			<div className="partners__col" ref={colRef}>
				{clients.map((c, i) => (
					<div
						className="partners__tile"
						key={`${c.name}-${i}`}
						title={c.name}
					>
						{c.logo ? (
							<img src={c.logo} alt={c.name} loading="lazy" decoding="async" />
						) : (
							<span className="partners__label">{c.label ?? c.name}</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
