import { useEffect, useState } from "react";

interface Props {
	phrases: readonly string[];
	interval?: number;
}

/**
 * Auto-cycling phrase replacement, pause-on-hover.
 * Inspired by the Websenso "expertises" rotating data-index pattern.
 */
export default function RotatingPhrases({ phrases, interval = 2800 }: Props) {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		if (paused) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) return;
		const id = window.setInterval(() => {
			setIndex((i) => (i + 1) % phrases.length);
		}, interval);
		return () => window.clearInterval(id);
	}, [phrases.length, interval, paused]);

	return (
		<span
			className="rotator"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			data-index={index}
		>
			{phrases.map((p, i) => (
				<span
					key={p}
					className="rotator__item"
					aria-hidden={i !== index}
					data-active={i === index}
				>
					{p}
				</span>
			))}
		</span>
	);
}
