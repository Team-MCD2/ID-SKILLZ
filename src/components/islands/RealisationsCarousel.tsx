import { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";

interface Project {
	slug: string;
	title: string;
	client: string;
	category: "site-web" | "design" | "video" | "3d";
	year: string;
	summary: string;
	media: { poster?: string; video?: string };
}

interface Props {
	projects: Project[];
}

const CATEGORY_LABEL: Record<Project["category"], string> = {
	"site-web": "Site web",
	design: "Design",
	video: "Vidéo",
	"3d": "3D",
};

/**
 * RealisationsCarousel — 3-up center-focused auto-rotating carousel.
 *
 * Visual logic:
 *   - Center slide  : large, sharp, full opacity, video plays on hover
 *   - Side slides   : smaller scale, lower opacity, slight blur
 *   - Background    : transparent (parent section paints cream)
 *   - Auto-rotate   : 4.5s, pauses on hover & focus, respects reduced-motion
 *
 * Inspired by the Websenso project carousel but adapted to ID Skillz brand
 * tones (sienne, ocre) and editorial typography.
 */
export default function RealisationsCarousel({ projects }: Props) {
	const splideRef = useRef<HTMLDivElement>(null);
	const splideInstance = useRef<Splide | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (!splideRef.current) return;
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const splide = new Splide(splideRef.current, {
			type: "loop",
			focus: "center",
			perPage: 3,
			gap: "1.5rem",
			padding: { left: "0", right: "0" },
			autoplay: !reduced,
			interval: 4500,
			pauseOnHover: true,
			pauseOnFocus: true,
			arrows: true,
			pagination: true,
			speed: 700,
			easing: "cubic-bezier(0.16, 1, 0.3, 1)",
			rewind: false,
			classes: {
				arrows: "rcarousel__arrows",
				arrow: "rcarousel__arrow",
				prev: "rcarousel__arrow--prev",
				next: "rcarousel__arrow--next",
				pagination: "rcarousel__pagination",
				page: "rcarousel__page",
			},
			breakpoints: {
				1024: { perPage: 2, gap: "1rem" },
				640: { perPage: 1, gap: "0.75rem", padding: "1rem" },
			},
			intersection: {
				inView: { autoplay: !reduced },
				outView: { autoplay: false },
			},
		});

		splide.on("active", (slide) => {
			setActiveIndex(slide.index);
		});

		splide.mount();
		splideInstance.current = splide;

		return () => {
			splide.destroy();
			splideInstance.current = null;
		};
	}, []);

	const active = projects[activeIndex] ?? projects[0];

	return (
		<div className="rcarousel">
			<div className="splide" ref={splideRef} aria-label="Carousel des réalisations">
				<div className="splide__track">
					<ul className="splide__list">
						{projects.map((p) => (
							<li className="splide__slide rcarousel__slide" key={p.slug}>
								<RealisationCard project={p} />
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Active title overlay sits below the strip and updates on slide change */}
			<div className="rcarousel__caption" aria-live="polite">
				<span className="rcarousel__cat">{CATEGORY_LABEL[active.category]}</span>
				<span className="rcarousel__sep" aria-hidden="true">·</span>
				<span className="rcarousel__client">{active.client}</span>
				<span className="rcarousel__sep" aria-hidden="true">·</span>
				<span className="rcarousel__year">{active.year}</span>
				<h3 className="rcarousel__title">{active.title}</h3>
				<p className="rcarousel__summary">{active.summary}</p>
			</div>
		</div>
	);
}

function RealisationCard({ project: p }: { project: Project }) {
	const videoRef = useRef<HTMLVideoElement>(null);

	const onEnter = () => {
		videoRef.current?.play().catch(() => {});
	};
	const onLeave = () => {
		const v = videoRef.current;
		if (!v) return;
		v.pause();
		v.currentTime = 0;
	};

	return (
		<article
			className="rcarousel__card"
			data-category={p.category}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onFocus={onEnter}
			onBlur={onLeave}
			tabIndex={0}
		>
			<div className="rcarousel__media">
				{p.media.poster && (
					<img
						className="rcarousel__poster"
						src={p.media.poster}
						alt=""
						loading="lazy"
						decoding="async"
					/>
				)}
				{p.media.video && (
					<video
						ref={videoRef}
						className="rcarousel__video"
						src={p.media.video}
						muted
						loop
						playsInline
						preload="metadata"
						poster={p.media.poster}
						aria-hidden="true"
					/>
				)}
				{!p.media.poster && !p.media.video && (
					<span className="rcarousel__placeholder" aria-hidden="true" />
				)}
				<span className="rcarousel__badge">{CATEGORY_LABEL[p.category]}</span>
			</div>
			<div className="rcarousel__meta">
				<p className="rcarousel__cardtitle">{p.title}</p>
				<p className="rcarousel__client">{p.client}</p>
			</div>
		</article>
	);
}
