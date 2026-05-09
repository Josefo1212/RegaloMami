export function initEffects(button) {
	if (!button) return;

	const burstDuration = 1800;
	const colors = ["#ef4444", "#f472b6", "#f9a8d4", "#fecdd3"];

	const runBurst = () => {
		if (typeof confetti !== "function") return;
		const end = Date.now() + burstDuration;

		const frame = () => {
			confetti({
				particleCount: 6,
				startVelocity: 40,
				spread: 120,
				ticks: 160,
				gravity: 0.85,
				decay: 0.92,
				origin: { x: Math.random() * 0.6 + 0.2, y: 0.6 },
				colors,
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		};

		requestAnimationFrame(frame);
	};

	const triggerFinale = () => {
		if (button.dataset.finalized === "true") return;
		button.dataset.finalized = "true";
		button.textContent = "¡TE AMO INFINITO!";
		button.style.transform = "scale(1.1)";
		button.style.transition = "transform 0.25s ease";
		button.style.willChange = "transform";
		runBurst();
	};

	button.addEventListener("click", triggerFinale);
}
