export function initBox3D({ onOpen }) {
	const box = document.querySelector(".gift-box");
	if (!box) return;

	let rotX = -14;
	let rotY = 24;
	let last = null;
	let start = null;
	let startTime = 0;

	const applyRotation = () => {
		box.style.setProperty("--rx", `${rotX}deg`);
		box.style.setProperty("--ry", `${rotY}deg`);
	};

	const openBox = () => {
		if (box.dataset.opened === "true") return;
		box.dataset.opened = "true";
		box.classList.add("is-open");
		box.dispatchEvent(new CustomEvent("box:open"));
		if (typeof onOpen === "function") onOpen();
	};

	const onTouchStart = (event) => {
		const touch = event.touches[0];
		start = { x: touch.clientX, y: touch.clientY };
		last = { ...start };
		startTime = performance.now();
	};

	const onTouchMove = (event) => {
		if (!last) return;
		const touch = event.touches[0];
		const dx = touch.clientX - last.x;
		const dy = touch.clientY - last.y;
		rotY += dx * 0.4;
		rotX -= dy * 0.4;
		rotX = Math.max(-45, Math.min(35, rotX));
		applyRotation();
		last = { x: touch.clientX, y: touch.clientY };
	};

	const onTouchEnd = () => {
		if (!start || !last) return;
		const dist = Math.hypot(last.x - start.x, last.y - start.y);
		const elapsed = performance.now() - startTime;
		if (dist < 10 && elapsed < 250) {
			openBox();
		}
		last = null;
		start = null;
	};

	box.addEventListener("touchstart", onTouchStart, { passive: true });
	box.addEventListener("touchmove", onTouchMove, { passive: true });
	box.addEventListener("touchend", onTouchEnd);
	box.addEventListener("click", openBox);

	applyRotation();
}
