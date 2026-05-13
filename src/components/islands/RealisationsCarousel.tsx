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
	"site-web": "WEB_SYSTEM",
	design: "VISUAL_ID",
	video: "MOTION_LOG",
	"3d": "SPATIAL_GEN",
};

const CATEGORY_INTERVAL: Record<Project["category"], number> = {
	video: 5200,
	"3d": 4000,
	"site-web": 4000,
	design: 2800,
};

export default function RealisationsCarousel({ projects }: Props) {
	const splideRef = useRef<HTMLDivElement>(null);
	const splideInstance = useRef<Splide | null>(null);
	const cardsRef = useRef<(HTMLElement | null)[]>([]);
	const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [inView, setInView] = useState(true);

	const syncVideos = (activeIdx: number, visible: boolean) => {
		videosRef.current.forEach((v, i) => {
			if (!v) return;
			if (i === activeIdx && visible) {
				v.play().catch(() => {});
			} else {
				v.pause();
				if (i !== activeIdx) v.currentTime = 0;
			}
		});
	};

	useEffect(() => {
		if (!splideRef.current) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const splide = new Splide(splideRef.current, {
			type: "loop",
			focus: "center",
			perPage: 3,
			gap: "2rem",
			autoplay: !reduced,
			interval: 4000,
			pauseOnHover: true,
			arrows: true,
			pagination: true,
			speed: 800,
			easing: "cubic-bezier(0.16, 1, 0.3, 1)",
			classes: {
				arrows: "rcarousel__arrows",
				arrow: "rcarousel__arrow",
				prev: "rcarousel__arrow--prev",
				next: "rcarousel__arrow--next",
				pagination: "rcarousel__pagination",
				page: "rcarousel__page",
			},
			breakpoints: {
				1024: { perPage: 2, gap: "1.5rem" },
				640: { perPage: 1, gap: "1rem" },
			},
		});

		splide.on("active", (slide) => setActiveIndex(slide.index));
		splide.mount();
		splideInstance.current = splide;

		return () => splide.destroy();
	}, []);

	useEffect(() => {
		syncVideos(activeIndex, inView);
	}, [activeIndex, inView]);

	useEffect(() => {
		const el = splideRef.current;
		if (!el || !("IntersectionObserver" in window)) return;
		const io = new IntersectionObserver(
			(entries) => setInView(entries[0].isIntersecting),
			{ threshold: 0.25 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	const active = projects[activeIndex] ?? projects[0];

	return (
		<div className="rcarousel">
			<div className="splide" ref={splideRef}>
				<div className="splide__track">
					<ul className="splide__list">
						{projects.map((p, i) => (
							<li
								className="splide__slide rcarousel__slide"
								key={p.slug}
								data-splide-interval={CATEGORY_INTERVAL[p.category]}
							>
								<RealisationCard
									project={p}
									isActive={activeIndex === i}
									cardRef={(el) => (cardsRef.current[i] = el)}
									videoRef={(el) => (videosRef.current[i] = el)}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="rcarousel__caption" aria-live="polite">
				<div className="rcarousel__metadata">
					<span className="rcarousel__label">// CATEGORY: {CATEGORY_LABEL[active.category]}</span>
					<span className="rcarousel__label">// CLIENT: {active.client}</span>
					<span className="rcarousel__label">// YEAR: {active.year}</span>
				</div>
				<h3 className="rcarousel__title">{active.title}</h3>
				<p className="rcarousel__summary">{active.summary}</p>
			</div>
		</div>
	);
}

interface CardProps {
	project: Project;
	isActive: boolean;
	cardRef: (el: HTMLElement | null) => void;
	videoRef: (el: HTMLVideoElement | null) => void;
}

function RealisationCard({ project: p, isActive, cardRef, videoRef }: CardProps) {
	const hasPoster = Boolean(p.media.poster);
	const hasVideo = Boolean(p.media.video);

	return (
		<article
			ref={cardRef as React.Ref<HTMLElement>}
			className="rcarousel__card corner-brackets"
			tabIndex={isActive ? 0 : -1}
		>
			<div className="rcarousel__media">
				{hasPoster && (
					<img className="rcarousel__poster" src={p.media.poster as string} alt="" />
				)}
				{hasVideo && (
					<video
						ref={videoRef}
						className="rcarousel__video"
						src={p.media.video as string}
						muted
						loop
						playsInline
						poster={p.media.poster ?? undefined}
					/>
				)}
				<div className="rcarousel__hud-overlay">
					<div className="top">
						<span>[ {CATEGORY_LABEL[p.category]} ]</span>
						<span>0x{p.slug.slice(0, 4).toUpperCase()}</span>
					</div>
					<div className="bottom">
						<span>STATUS: STABLE</span>
					</div>
				</div>
			</div>
			<div className="rcarousel__info">
				<p className="rcarousel__cardtitle">{p.title}</p>
			</div>
		</article>
	);
}
