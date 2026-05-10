import { useEffect, useRef, useState } from "react";

interface Slide {
	src: string;
	alt: string;
	caption: string;
}

interface Props {
	slides: Slide[];
	headings: string[]; // one heading per slide step
}

/**
 * TeamScroll — sticky scrolljack with 3 hard-cut images on scroll breakpoints.
 *
 * Layout:
 *   - Outer wrapper: 300vh tall (3 viewport-heights of scroll travel)
 *   - Inner viewport: position:sticky top:0 height:100vh
 *   - Three slides absolutely-positioned, opacity driven by scroll progress
 *   - Slides scale up step by step: 0.6 -> 0.78 -> 1.0 (full bleed on last)
 *
 * Why not GSAP ScrollTrigger? Lenis smooth-scroll plays badly with pinned
 * triggers unless you wire ScrollerProxy carefully. A sticky container +
 * a single scroll listener is dead-simple and survives reduced-motion.
 */
export default function TeamScroll({ slides, headings }: Props) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(0);
	const [progress, setProgress] = useState(0); // 0..1 within the scrolljack

	useEffect(() => {
		const wrap = wrapRef.current;
		if (!wrap) return;

		const onScroll = () => {
			const rect = wrap.getBoundingClientRect();
			const total = rect.height - window.innerHeight;
			if (total <= 0) return;
			const raw = Math.max(0, Math.min(1, -rect.top / total));
			setProgress(raw);
			// Snap to discrete index based on thirds with mid-point thresholds
			const idx = raw < 0.33 ? 0 : raw < 0.66 ? 1 : 2;
			setActive(idx);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	// Per-slide scale: 0 -> 0.62, 1 -> 0.82, 2 -> 1.0 (fullbleed)
	const scaleFor = (i: number) => [0.62, 0.82, 1.0][i] ?? 0.62;

	return (
		<div
			className="teamscroll"
			ref={wrapRef}
			style={{ "--p": progress } as React.CSSProperties}
		>
			<div className="teamscroll__inner">
				<div className="teamscroll__text" aria-live="polite">
					<p className="eyebrow">Le studio</p>
					<h2 className="h-1 balance teamscroll__heading">{headings[active]}</h2>
					<p className="teamscroll__caption">{slides[active]?.caption}</p>
					<div className="teamscroll__steps" role="tablist" aria-label="Étapes du studio">
						{slides.map((_, i) => (
							<button
								key={i}
								role="tab"
								aria-selected={active === i}
								aria-label={`Étape ${i + 1}`}
								className={`teamscroll__step${active === i ? " is-active" : ""}`}
								onClick={() => {
									const wrap = wrapRef.current;
									if (!wrap) return;
									const total = wrap.offsetHeight - window.innerHeight;
									const target =
										wrap.offsetTop + (total * (i / (slides.length - 1)));
									window.scrollTo({ top: target, behavior: "smooth" });
								}}
							>
								<span aria-hidden="true">0{i + 1}</span>
							</button>
						))}
					</div>
				</div>

				<div className="teamscroll__stage">
					{slides.map((s, i) => (
						<figure
							key={s.src}
							className={`teamscroll__slide${active === i ? " is-active" : ""}`}
							style={{ "--scale": scaleFor(i) } as React.CSSProperties}
							aria-hidden={active !== i}
						>
							<img
								src={s.src}
								alt={s.alt}
								loading={i === 0 ? "eager" : "lazy"}
								decoding="async"
							/>
						</figure>
					))}
				</div>
			</div>
		</div>
	);
}
