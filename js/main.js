import { initBox3D } from "./box3D.js";
import { initEffects } from "./effects.js";

const albumTrack = document.getElementById("albumTrack");
const albumEnd = document.getElementById("albumEnd");

const memorySlides = [
	{
		title: "El comienzo de todo",
		text: "Gracias por traerme a este mundo, y por darme la dicha de ser tu hijo.",
		image: "image/foto1.jpg",
	},
	{
		title: "No importa cuanto creza",
		text: "Sin importar el tamaño o la edad que tenga, siempre sere tu bebe, tu niño, tu hijo.",
		image: "image/foto2.jpg",
	},
	{
		title: "Mi mayor ejemplo",
		text: "Eres el ejemplo de que todo es posible con esfuerzo y dedicanión. Gracias por enseñarme a nunca rendirme.",
		image: "image/foto3.jpg",
	},
];

const ensureFinalButton = () => {
	if (!albumTrack || !albumEnd) return null;
	let button = document.getElementById("finalBtn");
	if (!button) {
		button = document.createElement("button");
		button.id = "finalBtn";
		button.className = "final-btn";
		button.type = "button";
		button.textContent = "Pulsame, Mama";
	}
	const panelContent = albumEnd.querySelector(".panel-content");
	if (panelContent) {
		panelContent.appendChild(button);
	} else {
		albumEnd.appendChild(button);
	}
	albumTrack.appendChild(albumEnd);
	return button;
};

const createPanel = ({ title, text, image }) => {
	if (!image) return null;
	const panel = document.createElement("section");
	panel.className = "album-panel";

	const content = document.createElement("div");
	content.className = "panel-content";

	if (title) {
		const heading = document.createElement("h2");
		heading.textContent = title;
		content.appendChild(heading);
	}

	if (text) {
		const paragraph = document.createElement("p");
		paragraph.textContent = text;
		content.appendChild(paragraph);
	}

	const img = document.createElement("img");
	img.src = image;
	img.alt = title || "Recuerdo";
	img.loading = "lazy";
	img.addEventListener("error", () => {
		panel.remove();
		ensureFinalButton();
	});

	content.prepend(img);
	panel.appendChild(content);

	return panel;
};

const appendPanels = () => {
	if (!albumTrack || !albumEnd) return;
	memorySlides.forEach((slide) => {
		const panel = createPanel(slide);
		if (panel) albumTrack.insertBefore(panel, albumEnd);
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
const finalBtn = ensureFinalButton();
initBox3D({ onOpen: activateAlbum });
if (finalBtn) initEffects(finalBtn);
