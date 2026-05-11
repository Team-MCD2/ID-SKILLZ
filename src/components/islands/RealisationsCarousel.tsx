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
	media: { poster?: string | null; video?: string | null };
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
 * Per-category slide dwell time (ms). Videos get the longest slot
 * because the user needs time to read motion; designs get the shortest
 * because they're static posters that land in one glance; 3D and
 * site-web sit in the middle. Splide picks up `data-splide-interval`
 * on each <li> to override the global interval.
 */
const CATEGORY_INTERVAL: Record<Project["category"], number> = {
	video: 5200,
	"3d": 4000,
	"site-web": 4000,
	design: 2800,
};

/**
 * RealisationsCarousel — 3-up center-focused auto-rotating carousel.
 *
 * Behavior:
 *   - Splide loop/center with per-slide auto-advance interval keyed on
 *     the project category (design = 2.8s, video = 5.2s, etc.)
 *   - When a slide becomes the active one, its <video> starts playing
 *     (center slide only); all others pause + rewind.
 *   - When the whole carousel scrolls out of the viewport, every video
 *     pauses to save bandwidth (IntersectionObserver).
 *   - On hover/focus, Splide auto-pauses and the card is also forced
 *     to play so desktop users can linger on a specific slide.
 *   - Design projects without a poster/video fall back to a styled
 *     editorial placeholder with the brand name + category label so
 *     the carousel never shows an empty tile.
 */
export default function RealisationsCarousel({ projects }: Props) {
	const splideRef = useRef<HTMLDivElement>(null);
	const splideInstance = useRef<Splide | null>(null);
	const cardsRef = useRef<(HTMLElement | null)[]>([]);
	const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [inView, setInView] = useState(true);

	// Play the active video, pause all others. Called from Splide events
	// and whenever the carousel's viewport visibility changes.
	const syncVideos = (activeIdx: number, visible: boolean) => {
		videosRef.current.forEach((v, i) => {
			if (!v) return;
			if (i === activeIdx && visible) {
				v.play().catch(() => {
					/* browsers block autoplay sometimes; video stays static */
				});
			} else {
				v.pause();
				if (i !== activeIdx) v.currentTime = 0;
			}
		});
	};

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
			interval: 4000,
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

	// Whenever active slide or viewport visibility changes, sync videos.
	useEffect(() => {
		syncVideos(activeIndex, inView);
	}, [activeIndex, inView]);

	// IntersectionObserver on the whole carousel: pause every video when
	// it's scrolled out of the viewport so background tabs don't chew
	// bandwidth.
	useEffect(() => {
		const el = splideRef.current;
		if (!el || !("IntersectionObserver" in window)) return;
		const io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				setInView(entry.isIntersecting);
			},
			{ rootMargin: "0px", threshold: 0.25 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	const active = projects[activeIndex] ?? projects[0];

	return (
		<div className="rcarousel">
			<div className="splide" ref={splideRef} aria-label="Carousel des réalisations">
				<div className="splide__track">
					<ul className="splide__list">
						{projects.map((p, i) => (
							<li
								className="splide__slide rcarousel__slide"
								key={p.slug}
								data-splide-interval={CATEGORY_INTERVAL[p.category]}
								data-category={p.category}
							>
								<RealisationCard
									project={p}
									cardRef={(el) => (cardsRef.current[i] = el)}
									videoRef={(el) => (videosRef.current[i] = el)}
								/>
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

interface CardProps {
	project: Project;
	cardRef: (el: HTMLElement | null) => void;
	videoRef: (el: HTMLVideoElement | null) => void;
}

function RealisationCard({ project: p, cardRef, videoRef }: CardProps) {
	const hasPoster = Boolean(p.media.poster);
	const hasVideo = Boolean(p.media.video);

	return (
		<article
			ref={cardRef as React.Ref<HTMLElement>}
			className="rcarousel__card"
			data-category={p.category}
			tabIndex={0}
		>
			<div className="rcarousel__media">
				{hasPoster && (
					<img
						className="rcarousel__poster"
						src={p.media.poster as string}
						alt=""
						loading="lazy"
						decoding="async"
					/>
				)}
				{hasVideo && (
					<video
						ref={videoRef}
						className="rcarousel__video"
						src={p.media.video as string}
						muted
						loop
						playsInline
						preload="metadata"
						poster={p.media.poster ?? undefined}
						aria-hidden="true"
					/>
				)}
				{!hasPoster && !hasVideo && (
					<DesignPlaceholder client={p.client} label={CATEGORY_LABEL[p.category]} />
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

/**
 * Fallback poster rendered when a project has neither poster image nor
 * video file (happens for the design slides because the /media/clients/
 * PNGs were corrupt on delivery). Shows an editorial dark card with
 * the client name in large italic serif and the category chip on top,
 * so the carousel never displays an empty tile.
 */
function DesignPlaceholder({ client, label }: { client: string; label: string }) {
	return (
		<div className="rcarousel__placeholder" role="img" aria-label={`${client} — ${label}`}>
			<span className="rcarousel__placeholder-chip">{label}</span>
			<span className="rcarousel__placeholder-name">{client}</span>
			<svg
				className="rcarousel__placeholder-glyph"
				viewBox="0 0 120 120"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M30 60 L90 60" />
				<path d="M60 30 L60 90" />
				<circle cx="60" cy="60" r="28" />
			</svg>
		</div>
	);
}
