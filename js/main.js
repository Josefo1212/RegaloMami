import { initBox3D } from "./box3D.js";
import { initEffects } from "./effects.js";

const albumTrack = document.getElementById("albumTrack");
const albumEnd = document.getElementById("albumEnd");
const finalBtn = document.getElementById("finalBtn");

const memorySlides = [
	{
		title: "Tu sonrisa ilumina todo",
		text: "Gracias por cada consejo y cada abrazo en silencio.",
		image: "image/foto-1.jpg",
	},
	{
		title: "Siempre estas presente",
		text: "Tu fuerza se siente en cada paso que damos.",
		image: "image/foto-2.jpg",
	},
	{
		title: "El hogar eres tu",
		text: "Contigo, cualquier lugar se vuelve calido.",
		image: "image/foto-3.jpg",
	},
];

const createPanel = ({ title, text, image }) => {
	const panel = document.createElement("section");
	panel.className = "album-panel";

	const content = document.createElement("div");
	content.className = "panel-content";

	const heading = document.createElement("h2");
	heading.textContent = title;

	const paragraph = document.createElement("p");
	paragraph.textContent = text;

	const img = document.createElement("img");
	img.src = image;
	img.alt = title;
	img.loading = "lazy";

	content.append(heading, paragraph, img);
	panel.appendChild(content);

	return panel;
};

const appendPanels = () => {
	if (!albumTrack || !albumEnd) return;
	memorySlides.forEach((slide) => {
		const panel = createPanel(slide);
		albumTrack.insertBefore(panel, albumEnd);
	});
};

const initInfiniteScroll = () => {
	if (!albumTrack) return;
	albumTrack.addEventListener("scroll", () => {
		const threshold = 240;
		const nearBottom =
			albumTrack.scrollTop + albumTrack.clientHeight >=
			albumTrack.scrollHeight - threshold;
		if (nearBottom) {
			appendPanels();
		}
	});
};

const activateAlbum = () => {
	document.body.classList.add("phase-album");
	const album = document.getElementById("album");
	if (album) album.setAttribute("aria-hidden", "false");
	if (albumTrack) albumTrack.scrollTo({ top: 0, behavior: "auto" });
};

appendPanels();
appendPanels();
initInfiniteScroll();
initBox3D({ onOpen: activateAlbum });
initEffects(finalBtn);
