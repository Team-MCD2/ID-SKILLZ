import { useEffect, useRef, useState } from "react";

interface Slide {
	src: string;
	alt: string;
	caption: string;
}

interface Props {
	slides: Slide[];
	headings: string[];
}

export default function TeamScroll({ slides, headings }: Props) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const wrap = wrapRef.current;
		if (!wrap) return;

		const onScroll = () => {
			const rect = wrap.getBoundingClientRect();
			const total = rect.height - window.innerHeight;
			if (total <= 0) return;
			const raw = Math.max(0, Math.min(1, -rect.top / total));
			setProgress(raw);
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

	const scaleFor = (i: number) => [0.75, 0.85, 1.0][i] ?? 0.75;

	return (
		<div
			className="teamscroll"
			ref={wrapRef}
			style={{ "--p": progress } as React.CSSProperties}
		>
			<div className="teamscroll__inner">
				<div className="teamscroll__text" aria-live="polite">
					<div className="teamscroll__meta">
						<span className="eyebrow"><span className="eyebrow-prefix">///</span> FACET_ID_0{active + 1}</span>
						<span className="teamscroll__uid">UID: 0x{active}A{active}F</span>
					</div>
					
					<h2 className="h-1 teamscroll__heading">{headings[active]}</h2>
					<p className="teamscroll__caption">{slides[active]?.caption}</p>
					
					<div className="teamscroll__steps" role="tablist" aria-label="Exploration Studio">
						{slides.map((_, i) => (
							<button
								key={i}
								role="tab"
								aria-selected={active === i}
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
								<span aria-hidden="true">[ 0{i + 1} ]</span>
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
							<div className="teamscroll__frame corner-brackets">
								<img
									src={s.src}
									alt={s.alt}
									loading={i === 0 ? "eager" : "lazy"}
								/>
								<div className="teamscroll__overlay">
									<span className="tag">LIVE_FEED</span>
									<span className="tag">CAM_0{i + 1}</span>
								</div>
							</div>
						</figure>
					))}
				</div>
			</div>
		</div>
	);
}
