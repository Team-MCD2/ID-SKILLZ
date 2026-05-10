import { useMemo, useRef, useState } from "react";

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

const CATEGORIES: Array<{ key: "all" | Project["category"]; label: string }> = [
	{ key: "all", label: "Tous" },
	{ key: "site-web", label: "Site web" },
	{ key: "design", label: "Design" },
	{ key: "video", label: "Vidéo" },
	{ key: "3d", label: "3D" },
];

export default function PortfolioGrid({ projects }: Props) {
	const [filter, setFilter] = useState<"all" | Project["category"]>("all");

	const filtered = useMemo(
		() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
		[filter, projects],
	);

	return (
		<div className="portfolio">
			<div
				className="portfolio__filters"
				role="tablist"
				aria-label="Filtrer les réalisations par métier"
			>
				{CATEGORIES.map((c) => {
					const count =
						c.key === "all"
							? projects.length
							: projects.filter((p) => p.category === c.key).length;
					const active = filter === c.key;
					return (
						<button
							key={c.key}
							role="tab"
							aria-selected={active}
							className={`portfolio__filter${active ? " is-active" : ""}`}
							onClick={() => setFilter(c.key)}
						>
							<span>{c.label}</span>
							<sup>{count}</sup>
						</button>
					);
				})}
			</div>

			<div className="portfolio__grid">
				{filtered.map((p) => (
					<ProjectCard key={p.slug} project={p} />
				))}
			</div>
		</div>
	);
}

function ProjectCard({ project: p }: { project: Project }) {
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

	const labelByCategory = {
		"site-web": "Site web",
		design: "Design",
		video: "Vidéo",
		"3d": "3D",
	}[p.category];

	return (
		<article
			className="portfolio-card"
			data-category={p.category}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onFocus={onEnter}
			onBlur={onLeave}
		>
			<div className="portfolio-card__media">
				{p.media.poster && (
					<img
						className="portfolio-card__poster"
						src={p.media.poster}
						alt=""
						loading="lazy"
					/>
				)}
				{p.media.video && (
					<video
						ref={videoRef}
						className="portfolio-card__video"
						src={p.media.video}
						muted
						loop
						playsInline
						preload="metadata"
						poster={p.media.poster}
					/>
				)}
				{!p.media.poster && p.media.video && (
					<span className="portfolio-card__fallback" aria-hidden="true">
						▶
					</span>
				)}
				<span className="portfolio-card__badge">{labelByCategory}</span>
			</div>
			<div className="portfolio-card__body">
				<h3 className="portfolio-card__title">{p.title}</h3>
				<p className="portfolio-card__meta">
					<span>{p.client}</span>
					<span aria-hidden="true">·</span>
					<span>{p.year}</span>
				</p>
				<p className="portfolio-card__summary">{p.summary}</p>
			</div>
		</article>
	);
}
