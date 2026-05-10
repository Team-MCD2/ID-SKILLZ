import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

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

	return (
		<div className="rev-carousel">
			<div className="rev-carousel__viewport" ref={emblaRef}>
				<div className="rev-carousel__container">
					{reviews.map((r) => (
						<figure key={r.author} className="rev-carousel__slide">
							<div className="rev-carousel__stars" aria-label={`Note ${r.rating} sur 5`}>
								{Array.from({ length: 5 }).map((_, i) => (
									<svg
										key={i}
										viewBox="0 0 16 16"
										width="14"
										height="14"
										aria-hidden="true"
										data-active={i < r.rating}
									>
										<path
											d="M8 .5l2.4 4.86 5.36.78-3.88 3.78.92 5.34L8 12.74l-4.8 2.52.92-5.34L.24 6.14l5.36-.78z"
											fill="currentColor"
										/>
									</svg>
								))}
							</div>
							<blockquote className="rev-carousel__quote">{r.body}</blockquote>
							<figcaption className="rev-carousel__cite">
								<strong>{r.author}</strong>
								<span>{r.handle}</span>
							</figcaption>
						</figure>
					))}
				</div>
			</div>

			<div className="rev-carousel__controls">
				<div className="rev-carousel__dots" role="tablist" aria-label="Avis sélectionné">
					{snaps.map((_, i) => (
						<button
							key={i}
							type="button"
							role="tab"
							aria-selected={i === selected}
							aria-label={`Avis ${i + 1}`}
							className={`rev-carousel__dot${i === selected ? " is-active" : ""}`}
							onClick={() => scrollTo(i)}
						/>
					))}
				</div>
				<div className="rev-carousel__buttons">
					<button
						type="button"
						className="rev-carousel__btn"
						aria-label="Avis précédent"
						onClick={scrollPrev}
					>
						<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
							<path
								d="M14 8H2M7 3L2 8l5 5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button
						type="button"
						className="rev-carousel__btn"
						aria-label="Avis suivant"
						onClick={scrollNext}
					>
						<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
							<path
								d="M2 8h12M9 3l5 5-5 5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
