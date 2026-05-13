import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Review {
	author: string;
	handle: string;
	rating: number;
	body: string;
}

interface Props {
	reviews: readonly Review[];
}

export default function ReviewsCarousel({ reviews }: Props) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		loop: true,
		skipSnaps: false,
		dragFree: false,
		containScroll: "trimSnaps",
	});

	const [selected, setSelected] = useState(0);
	const [snaps, setSnaps] = useState<number[]>([]);
	const [paused, setPaused] = useState(false);
	const viewportRef = useRef<HTMLDivElement>(null);

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
	const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
		setSnaps(emblaApi.scrollSnapList());
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
		onSelect();
		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onSelect);
		};
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) return;
		const tick = () => {
			if (paused) return;
			emblaApi.scrollNext();
		};
		const id = setInterval(tick, 6500);
		return () => clearInterval(id);
	}, [emblaApi, paused]);

	useEffect(() => {
		const el = viewportRef.current;
		if (!el || !("IntersectionObserver" in window)) return;
		const io = new IntersectionObserver(
			(entries) => setPaused(!entries[0].isIntersecting),
			{ threshold: 0.25 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div
			className="rev-carousel"
			ref={viewportRef}
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<div className="rev-carousel__viewport" ref={emblaRef}>
				<div className="rev-carousel__container">
					{reviews.map((r, i) => (
						<figure key={r.author} className="rev-carousel__slide corner-brackets">
							<div className="rev-carousel__meta">
								<span className="meta-id">[ REVIEW_0{i + 1} ]</span>
								<span className="meta-status">VERIFIED_CLIENT: TRUE</span>
							</div>
							<blockquote className="rev-carousel__quote">
								{r.body}
							</blockquote>
							<figcaption className="rev-carousel__cite">
								<span className="cite-author">{r.author.toUpperCase()}</span>
								<span className="cite-handle">{r.handle}</span>
							</figcaption>
						</figure>
					))}
				</div>
			</div>

			<div className="rev-carousel__controls">
				<div className="rev-carousel__dots">
					{snaps.map((_, i) => (
						<button
							key={i}
							className={`rev-carousel__dot${i === selected ? " is-active" : ""}`}
							onClick={() => scrollTo(i)}
						/>
					))}
				</div>
				<div className="rev-carousel__buttons">
					<button className="rev-carousel__btn" onClick={scrollPrev}>
						<svg viewBox="0 0 16 16" width="14" height="14">
							<path d="M14 8H2M7 3L2 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
						</svg>
					</button>
					<button className="rev-carousel__btn" onClick={scrollNext}>
						<svg viewBox="0 0 16 16" width="14" height="14">
							<path d="M2 8h12M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
