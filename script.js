/* IMAGE MAP — replace a file using the same filename, then refresh.
   All image-to-project mappings live here. Missing files keep their placeholders.
   fit: "contain" shows the full artwork; "cover" fills and may crop the image. */
const IMAGE_MAP = {
  "portrait": {
    "src": "images/portrait.png",
    "alt": "Qiu Zhexian",
    "fit": "cover"
  },
  "danqingyin1": {
    "src": "images/danqingyin-01.png",
    "alt": "Show overview",
    "fit": "contain"
  },
  "danqingyin2": {
    "src": "images/danqingyin-02.png",
    "alt": "Projection sequence",
    "fit": "contain"
  },
  "danqingyin3": {
    "src": "images/danqingyin-03.png",
    "alt": "Live setting / detail",
    "fit": "contain"
  },
  "lightAwakening1": {
    "src": "images/light-awakening-01.png",
    "alt": "Show overview",
    "fit": "contain"
  },
  "lightAwakening2": {
    "src": "images/light-awakening-02.png",
    "alt": "Projection sequence",
    "fit": "contain"
  },
  "lightAwakening3": {
    "src": "images/light-awakening-03.png",
    "alt": "Live setting / detail",
    "fit": "contain"
  },
  "aiRobot1": {
    "src": "images/ai-robot-01.jpg",
    "alt": "Show overview",
    "fit": "contain"
  },
  "aiRobot2": {
    "src": "images/ai-robot-02.JPG",
    "alt": "Projection sequence",
    "fit": "contain"
  },
  "aiRobot3": {
    "src": "images/ai-robot-03.png",
    "alt": "Live setting / detail",
    "fit": "contain"
  },
  "ruinsMemory1": {
    "src": "images/ruins-memory-01.png",
    "alt": "Project overview",
    "fit": "contain"
  },
  "ruinsMemory2": {
    "src": "images/ruins-memory-02.png",
    "alt": "Scene / moving image",
    "fit": "contain"
  },
  "ruinsMemory3": {
    "src": "images/ruins-memory-03.png",
    "alt": "Interaction / detail",
    "fit": "contain"
  },
  "landscapeSeams1": {
    "src": "images/landscape-seams-01.png",
    "alt": "Installation overview",
    "fit": "contain"
  },
  "landscapeSeams2": {
    "src": "images/landscape-seams-02.png",
    "alt": "Material detail",
    "fit": "contain"
  },
  "landscapeSeams3": {
    "src": "images/landscape-seams-03.png",
    "alt": "Interaction / live setting",
    "fit": "contain"
  },
  "fromHere1": {
    "src": "images/from-here-to-there-01.jpg",
    "alt": "Moving-image still",
    "fit": "contain"
  },
  "fromHere2": {
    "src": "images/from-here-to-there-02.png",
    "alt": "Performance sequence",
    "fit": "contain"
  },
  "fromHere3": {
    "src": "images/from-here-to-there-03.png",
    "alt": "Location / detail",
    "fit": "contain"
  },
  "idealHome": {
    "src": "images/ideal-home.jpg",
    "alt": "Fluid Homeland — virtual space & physical installation",
    "fit": "contain"
  },
  "idealFieldwork": {
    "src": "images/ideal-home-fieldwork.png",
    "alt": "Zuotan Village — local experience & material culture",
    "fit": "contain"
  },
  "idealInteraction": {
    "src": "images/ideal-home-interaction.png",
    "alt": "UE5 — spatial narrative & interaction",
    "fit": "contain"
  },
  "idealExhibition": {
    "src": "images/ideal-home-exhibition.jpg",
    "alt": "Moving image, publications & found objects",
    "fit": "contain"
  },
  "thesisFramework": {
    "src": "images/thesis-framework.png",
    "alt": "Subject · Concept · Action",
    "fit": "contain"
  },
  "forumPoster": {
    "src": "images/cafa-forum-poster.png",
    "alt": "CAFA · 18–19 October 2025",
    "fit": "contain"
  },
  "researchMechanism": {
    "src": "images/research_mechanism_english_first.svg",
    "alt": "Research mechanism framework / 研究机制框架",
    "fit": "contain"
  },
  "evaluationGovernance": {
    "src": "images/evaluation_governance_english_first.svg",
    "alt": "Multidimensional evaluation and governance framework / 多维评价与治理框架",
    "fit": "contain"
  },
  "tankaContext": {
    "src": "images/tanka_pearl_river_delta_context.svg",
    "alt": "Regional cultural geography schematic of Tanka-related waterscapes in the Pearl River Delta; ZuoTan is a location of previous practice / 珠江三角洲疍民水域文化区域示意；左滩为既有实践位置",
    "fit": "contain"
  }
};

// Give gallery images widths proportional to their original aspect ratios.
// The images then share one row height without adding borders or cropping artwork.
function fitGallery(gallery) {
  const slots = [...gallery.querySelectorAll(".image-slot")];
  const ratios = slots.map(slot => Number(slot.dataset.ratio));
  if (ratios.some(ratio => !Number.isFinite(ratio) || ratio <= 0)) return;
  const columns = ratios.map(ratio => `minmax(0, ${ratio}fr)`).join(" ");
  gallery.style.setProperty("--gallery-columns", columns);
  gallery.style.setProperty("--detail-columns", ratios.slice(1).map(ratio => `minmax(0, ${ratio}fr)`).join(" "));
}

// Load nearby images first so a phone need not download the entire portfolio.
// Decode off-page: a missing or invalid image keeps its designed placeholder.
function loadPortfolioImage(slot) {
  const config = IMAGE_MAP[slot.dataset.image];
  if (!config) return;
  const image = new Image();
  image.alt = config.alt;
  image.decoding = "async";
  image.style.objectFit = config.fit || "contain";
  image.style.objectPosition = config.position || "center";
  image.onload = () => {
    image.width = image.naturalWidth;
    image.height = image.naturalHeight;
    slot.classList.add("is-loaded");
    slot.dataset.ratio = image.naturalWidth / image.naturalHeight;
    if (slot.dataset.image !== "portrait") {
      slot.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
      slot.style.height = "auto";
    }
    slot.querySelector(".placeholder").hidden = true;
    slot.append(image);
    // Enable the supplied context map's reading controls only after it loads.
    if (slot.dataset.image === "tankaContext") {
      document.querySelectorAll('[data-diagram="tankaContext"]').forEach(trigger => {
        if (trigger.tagName === "BUTTON") trigger.disabled = false;
        else {
          trigger.removeAttribute("aria-disabled");
          trigger.tabIndex = 0;
        }
      });
    }
    const gallery = slot.closest(".project-gallery, .ideal-detail-gallery");
    if (gallery) fitGallery(gallery);
  };
  image.onerror = () => { /* Keep the designed placeholder visible. */ };
  image.src = config.src;
}
const imageObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        imageObserver.unobserve(entry.target);
        loadPortfolioImage(entry.target);
      });
    }, { rootMargin: "900px 0px" })
  : null;
document.querySelectorAll("[data-image]").forEach(slot => {
  if (slot.dataset.image === "portrait" || !imageObserver) loadPortfolioImage(slot);
  else imageObserver.observe(slot);
});

// Highlight the section currently being read; every navigation link stays an anchor.
const links = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = links.map(link => document.querySelector(link.getAttribute("href")));
// Follow the actual sticky header height at every responsive breakpoint.
const headerObserver = new ResizeObserver(entries => {
  document.documentElement.style.scrollPaddingTop = `${Math.ceil(entries[0].target.getBoundingClientRect().height) + 18}px`;
});
headerObserver.observe(document.querySelector('.site-header'));
let pendingFrame = false;
function updateNavigation() {
  const boundary = document.querySelector(".site-header").getBoundingClientRect().height + 130;
  let current = sections[0];
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= boundary) current = section;
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    current = sections[sections.length - 1];
  }
  links.forEach(link => {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  pendingFrame = false;
}
window.addEventListener("scroll", () => {
  if (!pendingFrame) {
    pendingFrame = true;
    requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

// A light-blue circle follows a mouse on desktop. Touch and reduced-motion
// settings keep the page static. Coordinates are applied once per animation frame.
const haloPreference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
const halo = document.createElement("div");
halo.className = "cursor-halo";
halo.setAttribute("aria-hidden", "true");
document.body.append(halo);
let haloFrame = 0;
let haloX = 0;
let haloY = 0;
function hideHalo() {
  if (haloFrame) cancelAnimationFrame(haloFrame);
  haloFrame = 0;
  halo.classList.remove("is-visible");
}
window.addEventListener("pointermove", event => {
  if (!haloPreference.matches || event.pointerType !== "mouse") {
    hideHalo();
    return;
  }
  haloX = event.clientX;
  haloY = event.clientY;
  if (!haloFrame) {
    haloFrame = requestAnimationFrame(() => {
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
      halo.classList.add("is-visible");
      haloFrame = 0;
    });
  }
}, { passive: true });
document.documentElement.addEventListener("pointerleave", hideHalo);
window.addEventListener("pointercancel", hideHalo);
window.addEventListener("blur", hideHalo);
document.addEventListener("visibilitychange", () => { if (document.hidden) hideHalo(); });
haloPreference.addEventListener("change", hideHalo);

// Read research diagrams and posters at their native size without leaving the page.
const diagramViewer = document.createElement("dialog");
diagramViewer.className = "diagram-viewer";
diagramViewer.setAttribute("aria-labelledby", "diagram-viewer-title");
diagramViewer.innerHTML = `<div class="viewer-toolbar"><p id="diagram-viewer-title">Research image / 研究图像</p><div class="viewer-actions"><button type="button" data-viewer-action="fit" aria-pressed="false">Fit width / 适宽</button><button type="button" data-viewer-action="actual" aria-pressed="true">100%</button><button type="button" data-viewer-action="close">Close / 关闭</button></div></div><div class="viewer-canvas" tabindex="0" aria-label="Scrollable research image / 可滚动的研究图像"><img alt=""></div>`;
document.body.append(diagramViewer);
const viewerCanvas = diagramViewer.querySelector(".viewer-canvas");
const viewerImage = viewerCanvas.querySelector("img");
viewerImage.addEventListener("load", () => {
  viewerCanvas.style.setProperty("--viewer-native-width", `${viewerImage.naturalWidth}px`);
});
let diagramTrigger = null;
function setDiagramScale(fit) {
  viewerCanvas.classList.toggle("is-fit", fit);
  diagramViewer.querySelector('[data-viewer-action="fit"]').setAttribute("aria-pressed", String(fit));
  diagramViewer.querySelector('[data-viewer-action="actual"]').setAttribute("aria-pressed", String(!fit));
}
document.querySelectorAll(".diagram-open, .image-slot[data-diagram]").forEach(trigger => {
  const openImage = () => {
    if (trigger.getAttribute("aria-disabled") === "true") return;
    const config = IMAGE_MAP[trigger.dataset.diagram];
    if (!config) return;
    diagramTrigger = trigger;
    const thumbnail = document.querySelector(`[data-image="${trigger.dataset.diagram}"] img`);
    viewerCanvas.style.setProperty("--viewer-native-width", `${thumbnail?.naturalWidth || 1600}px`);
    viewerImage.src = config.src;
    viewerImage.alt = config.alt;
    diagramViewer.querySelector("#diagram-viewer-title").textContent = trigger.dataset.viewerTitle || trigger.closest("figure")?.querySelector("h4")?.textContent || config.alt;
    setDiagramScale(false);
    hideHalo();
    diagramViewer.showModal();
    viewerCanvas.scrollTo(0, 0);
  };
  trigger.addEventListener("click", openImage);
  if (trigger.getAttribute("role") === "button") {
    trigger.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImage();
      }
    });
  }
});
diagramViewer.addEventListener("click", event => {
  const action = event.target.closest("[data-viewer-action]")?.dataset.viewerAction;
  if (action === "close") diagramViewer.close();
  else if (action === "fit") setDiagramScale(true);
  else if (action === "actual") setDiagramScale(false);
});
diagramViewer.addEventListener("close", () => diagramTrigger?.focus({ preventScroll: true }));
