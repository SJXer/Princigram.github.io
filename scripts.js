(() => {
  const heroGallery = document.querySelector("[data-hero-gallery]");

  if (heroGallery && !heroGallery.classList.contains("is-ready")) {
    heroGallery.querySelectorAll(".hero-gallery-row").forEach((row) => {
      const set = row.querySelector(".hero-gallery-set");
      if (set) row.append(set.cloneNode(true));
    });
    heroGallery.classList.add("is-ready");
  }

  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  const closeNavigation = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNavigation();
    });
  }

  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.05, 0.25, 0.5],
      }
    );

    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  const showcaseTabs = [...document.querySelectorAll("[data-showcase-tab]")];
  const showcasePanels = [...document.querySelectorAll("[data-showcase-panel]")];

  const activateShowcase = (tab) => {
    if (!tab) return;
    const panelId = tab.getAttribute("aria-controls");

    showcaseTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    showcasePanels.forEach((panel) => {
      panel.hidden = panel.id !== panelId;
    });
  };

  showcaseTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateShowcase(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (["ArrowRight", "ArrowDown"].includes(event.key)) nextIndex = (index + 1) % showcaseTabs.length;
      if (["ArrowLeft", "ArrowUp"].includes(event.key)) nextIndex = (index - 1 + showcaseTabs.length) % showcaseTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = showcaseTabs.length - 1;

      showcaseTabs[nextIndex].focus();
      activateShowcase(showcaseTabs[nextIndex]);
    });
  });

  const demoTabs = [...document.querySelectorAll("[data-demo-src]")];
  const demoFrame = document.querySelector("[data-demo-frame]");
  const demoWrap = document.querySelector("[data-demo-wrap]");
  const demoHeading = document.querySelector("[data-demo-heading]");
  const demoCopy = document.querySelector("[data-demo-copy]");
  const demoOpen = document.querySelector("[data-demo-open]");
  const demoPanel = document.querySelector("#demo-panel");

  const activateDemo = (tab) => {
    if (!tab || !demoFrame || !demoWrap) return;

    const source = tab.dataset.demoSrc;
    const title = tab.dataset.demoTitle || "Interactive viewer";
    const description = tab.dataset.demoDescription || "";

    demoTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    if (demoHeading) demoHeading.textContent = title;
    if (demoCopy) demoCopy.textContent = description;
    if (demoOpen) demoOpen.href = source;
    if (demoPanel && tab.id) demoPanel.setAttribute("aria-labelledby", tab.id);
    demoFrame.title = `${title} interactive viewer`;

    if (demoFrame.getAttribute("src") !== source) {
      demoWrap.classList.add("is-loading");
      demoFrame.src = source;
    }
  };

  if (demoFrame && demoWrap) {
    demoFrame.addEventListener("load", () => {
      demoWrap.classList.remove("is-loading");
    });
  }

  demoTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateDemo(tab));
    tab.addEventListener("keydown", (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % demoTabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + demoTabs.length) % demoTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = demoTabs.length - 1;

      demoTabs[nextIndex].focus();
      activateDemo(demoTabs[nextIndex]);
    });
  });

  document.querySelectorAll("[data-open-qualitative]").forEach((link) => {
    link.addEventListener("click", () => {
      const qualitativeTab = demoTabs.find((tab) => tab.dataset.demoSrc?.includes("qualitative-comparison"));
      activateDemo(qualitativeTab);
      window.setTimeout(() => qualitativeTab?.focus({ preventScroll: true }), 0);
    });
  });

  const imageDialog = document.querySelector("[data-image-dialog]");
  const dialogImage = document.querySelector("[data-dialog-image]");
  const dialogCaption = document.querySelector("[data-dialog-caption]");
  const dialogClose = document.querySelector("[data-dialog-close]");

  document.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!imageDialog || !dialogImage) return;
      const sourceImage = button.querySelector("img");
      dialogImage.src = button.dataset.zoom;
      dialogImage.alt = sourceImage?.alt || "Enlarged project figure";
      if (dialogCaption) dialogCaption.textContent = button.dataset.caption || "";

      if (typeof imageDialog.showModal === "function") imageDialog.showModal();
      else imageDialog.setAttribute("open", "");
    });
  });

  if (dialogClose && imageDialog) {
    dialogClose.addEventListener("click", () => imageDialog.close());
    imageDialog.addEventListener("click", (event) => {
      const rect = imageDialog.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) imageDialog.close();
    });
  }

  const copyButton = document.querySelector("[data-copy-citation]");
  const citation = document.querySelector("#bibtex");

  if (copyButton && citation) {
    copyButton.addEventListener("click", async () => {
      const original = copyButton.textContent;
      try {
        await navigator.clipboard.writeText(citation.innerText.trim());
        copyButton.textContent = "Copied";
      } catch {
        const range = document.createRange();
        range.selectNodeContents(citation);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copyButton.textContent = "Selected";
      }

      window.setTimeout(() => {
        copyButton.textContent = original;
      }, 1800);
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
