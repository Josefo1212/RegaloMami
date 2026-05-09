export function initEffects(button) {
	if (!button) return;

	const getHeartShape = () => {
		if (typeof confetti?.shapeFromText !== "function") return null;
		return confetti.shapeFromText({
			text: "<3",
			scalar: 1.2,
		});
	};

	const launchHearts = () => {
		if (typeof confetti !== "function") return;
		const heart = getHeartShape();
		const count = 120;
		const defaults = {
			spread: 120,
			ticks: 200,
			gravity: 0.9,
			decay: 0.92,
			startVelocity: 35,
			colors: ["#f6d0d4", "#f7b3c2", "#e06e7f", "#ffffff"],
		};

		if (heart) {
			confetti({
				...defaults,
				particleCount: count,
				shapes: [heart],
				scalar: 1.2,
				origin: { x: 0.5, y: 0.6 },
			});
		} else {
			confetti({
				...defaults,
				particleCount: count,
				origin: { x: 0.5, y: 0.6 },
			});
		}
	};

	button.addEventListener("click", launchHearts);
}
