import { initBox3D } from "./box3D.js";
import { initEffects } from "./effects.js";

const albumTrack = document.getElementById("albumTrack");
const albumEnd = document.getElementById("albumEnd");
const finalBtn = document.getElementById("finalBtn");

const memorySlides = [
	{
		title: "",
		text: "",
		image: "image/foto-1.jpg",
	},
	{
		title: "",
		text: "",
		image: "image/foto-2.jpg",
	},
	{
		title: "",
		text: "",
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

	content.append(img, heading, paragraph);
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
	const album = document.getElementById("album");
	if (album) {
		album.style.display = "block";
		album.setAttribute("aria-hidden", "false");
	}
	document.body.classList.add("phase-album");
	if (albumTrack) albumTrack.scrollTo({ top: 0, behavior: "auto" });
};

appendPanels();
appendPanels();
initInfiniteScroll();
initBox3D({ onOpen: activateAlbum });
initEffects(finalBtn);
