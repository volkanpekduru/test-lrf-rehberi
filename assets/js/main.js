/**
 * ==========================================================================
 * 🏆 LRF PLATFORM UNIFIED JAVASCRIPT ENGINE (NİHAİ REVİZE SÜRÜM)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ── 1. UNIFIED TAB SYSTEM MOTORU (Çizgi ve Panel Varyasyonları Kontrolü) ── */
  const handleTabSwitch = (targetBtn) => {
    if (!targetBtn) return;

    const tabType = targetBtn.getAttribute("data-tab-type");
    const tabTargetId = targetBtn.getAttribute("data-tab-target");
    if (!tabType || !tabTargetId) return;

    const container = targetBtn.closest(".lrf-tab-system-container");
    if (container) {
      container.querySelectorAll(".lrf-tab-system-btn").forEach((btn) => {
        btn.classList.remove("lrf-tab-system-btn--active");
      });
    }
    targetBtn.classList.add("lrf-tab-system-btn--active");

    if (tabType === "line") {
      const targetSection = document.getElementById(tabTargetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (tabType === "panel") {
      const descBox = document.getElementById("lrf-tab-system-desc");
      const descText = document.getElementById("lrf-tab-system-desc-text");

      if (descBox) {
        descBox.className = "lrf-tab-system-desc-box";
        descBox.classList.add(`lrf-tab-system-desc-box--${tabTargetId}`);
      }

      const texts = {
        soft: "LRF'nin bel kemiği. Esnek yapıları sayesinde su içinde son derece doğal hareketler üretirler. Jig head ile birlikte kullanılır.",
        jig: "Ağır ve parlak metal gövdeleri sayesinde uzak mesafelere atılabilir ve hızlı batışları ile aktif predatör balıkları saniyede tetikler.",
        hard: "Plastik veya ahşap gövdeli sert maketler. Belirli derinliklerde sabit bir aksiyon üretirler ve büyük trofeleri hedeflemek için vazgeçilmezdir.",
        surface: "Tamamen su yüzeyinde çalışan çılgın maketler. Sabah erken ve akşam üstü, balıkların su üstüne oynak yaptığı anlarda katliam yaratır.",
      };
      if (descText && texts[tabTargetId]) {
        descText.textContent = texts[tabTargetId];
      }

      document.querySelectorAll(".lrf-tab-system-group").forEach((group) => {
        group.classList.remove("lrf-tab-system-group--active");
      });

      const targetGal = document.getElementById(`lrf-tab-system-group-${tabTargetId}`);
      const targetContent = document.getElementById(`lrf-tab-system-group-content-${tabTargetId}`);

      if (targetGal) {
        targetGal.classList.add("lrf-tab-system-group--active");
        const targetGalBox = targetGal.querySelector(".lrf-jig-gallery");
        if (targetGalBox) {
          targetGalBox.setAttribute("data-active-color", tabTargetId);
        }
      }

      if (targetContent) {
        targetContent.classList.add("lrf-tab-system-group--active");
      }
    }
  };

  /* ── 2. ORTAK KART AKORDİYON MOTORU (Jig Head ve Balık Kartları - .is-open) ── */
  const toggleCardAccordion = (triggerButton, closeOthers = false) => {
    if (!triggerButton) return;

    const cardBody = triggerButton.closest(".lrf-grid-card");
    if (!cardBody) return;

    const btnText = triggerButton.querySelector("span");
    const isOpen = cardBody.classList.contains("is-open");

    if (!triggerButton.hasAttribute("data-original-text")) {
      triggerButton.setAttribute("data-original-text", btnText ? btnText.textContent : "Detaylar");
    }
    const originalText = triggerButton.getAttribute("data-original-text");

    // Eğer diğer açık kartların kapanması isteniyorsa (Örn: Balık kartları)
    if (closeOthers) {
      const parentMatrix = cardBody.closest(".lrf-grid-matrix");
      if (parentMatrix) {
        parentMatrix.querySelectorAll(".lrf-grid-card.is-open").forEach((otherCard) => {
          if (otherCard !== cardBody) {
            otherCard.classList.remove("is-open");
            const otherBtn = otherCard.querySelector("[data-action]");
            if (otherBtn) {
              const otherSpan = otherBtn.querySelector("span");
              if (otherSpan && otherBtn.hasAttribute("data-original-text")) {
                otherSpan.textContent = otherBtn.getAttribute("data-original-text");
              }
            }
          }
        });
      }
    }

    if (isOpen) {
      cardBody.classList.remove("is-open");
      if (btnText) btnText.textContent = originalText;
    } else {
      cardBody.classList.add("is-open");
      if (btnText) btnText.textContent = "Gizle";
    }
  };
  /* ── 3. KÜRESEL LIGHTBOX POPUP MOTORU ── */
  const openLightbox = (imgName, title) => {
    if (!imgName) return;

    const lightbox = document.getElementById("lrf-lightbox");
    const lightboxImg = document.getElementById("lrf-lightbox-img");
    const lightboxTitle = document.getElementById("lrf-lightbox-title");
    if (!lightbox || !lightboxImg || !lightboxTitle) return;

    let folderPath = "assets/images/sahteler/";
    const jigKeywords = ["round", "dart", "standup", "football", "shaky", "swimbait", "cheburashka", "hirsiz"];
    const isJig = jigKeywords.some((keyword) => imgName.toLowerCase().includes(keyword));

    if (isJig) {
      folderPath = "assets/images/jigs/";
    }

    lightboxImg.src = folderPath + imgName;
    lightboxTitle.textContent = title || "";

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    lightbox.classList.add("lrf-lightbox-overlay--active");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    const lightbox = document.getElementById("lrf-lightbox");
    if (lightbox && lightbox.classList.contains("lrf-lightbox-overlay--active")) {
      lightbox.classList.remove("lrf-lightbox-overlay--active");
      lightbox.setAttribute("aria-hidden", "true");

      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  };

  /* ── 4. BAĞIMSIZ SSS (FAQ) AKORDİYON MOTORU (ARIA + .is-open) ── */
  const toggleFaqEngine = (triggerElement) => {
    if (!triggerElement) return;

    const faqHolder = triggerElement.closest(".lrf-faq__box-holder");
    const currentItem = triggerElement.closest(".lrf-faq__item");
    if (!faqHolder || !currentItem) return;

    const isExpanded = triggerElement.getAttribute("aria-expanded") === "true";

    faqHolder.querySelectorAll(".lrf-faq__item.is-open").forEach((item) => {
      item.classList.remove("is-open");
      const btn = item.querySelector(".lrf-faq__trigger");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });

    if (!isExpanded) {
      triggerElement.setAttribute("aria-expanded", "true");
      currentItem.classList.add("is-open");
    }
  };

  /* ── 5. AKILLI ÇEREZ KALKANI SENSÖRÜ ── */
  const cookieBanner = document.getElementById("lrfCookieBanner");

  if (cookieBanner) {
    const isCookieAccepted = localStorage.getItem("lrf_cookie_accepted");
    if (!isCookieAccepted) {
      setTimeout(() => {
        cookieBanner.classList.add("show");
      }, 1000);
    }
  }

  const acceptCookies = () => {
    if (cookieBanner) {
      cookieBanner.classList.remove("show");
      localStorage.setItem("lrf_cookie_accepted", "true");
    }
  };

  /* ── 6. MOBİL HAMBURGER MENÜ KONTROL MOTORU ── */
  const toggleMobileMenu = (forceClose = false) => {
    const toggleBtn = document.getElementById("lrfMobileToggle");
    const navMenu = document.getElementById("lrfNavbarMenu");
    if (!toggleBtn || !navMenu) return;

    if (forceClose) {
      toggleBtn.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
      return;
    }

    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("is-open");
  };
  /* ── ⚡ MERKEZİ GLOBAL OLAY DELEGASYON KALKANI ── */
  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (!target) return;

    // A. Mobil Hamburger Menü Tetikleyicisi ve Dış Alan Kapatma
    const mobileToggle = target.closest("#lrfMobileToggle");
    if (mobileToggle) {
      event.stopPropagation();
      toggleMobileMenu();
      return;
    }

    const navMenu = document.getElementById("lrfNavbarMenu");
    if (navMenu && navMenu.classList.contains("is-open") && !target.closest("#lrfNavbarMenu")) {
      event.preventDefault();
      event.stopPropagation();
      toggleMobileMenu(true);
      return;
    }

    // B. Tab Buton Tetikleyicisi
    const tabBtn = target.closest("[data-tab-type]");
    if (tabBtn) {
      event.preventDefault();
      handleTabSwitch(tabBtn);
      return;
    }

    // C. Galeri Lightbox Açıcı Sensörler
    const galleryItem = target.closest("[data-lightbox-img]");
    if (galleryItem) {
      const imgName = galleryItem.getAttribute("data-lightbox-img");
      const title = galleryItem.getAttribute("data-lightbox-title");
      openLightbox(imgName, title);
      return;
    }

    // D. Lightbox Dış Alan Kapatıcı Sensör
    if (target.closest("#lrf-lightbox") && !target.closest(".lrf-lightbox-wrapper")) {
      closeLightbox();
      return;
    }

    // E. Genel Kart Akordiyon Eylemleri (Jig Head ve Balık Kartları)
    const actionElement = target.closest("[data-action]");
    if (actionElement) {
      const action = actionElement.getAttribute("data-action");
      if (action === "toggle-jig") {
        toggleCardAccordion(actionElement, false);
      } else if (action === "toggle-fish") {
        toggleCardAccordion(actionElement, true);
      }
      return;
    }

    // F. Çerez Kabul Butonu
    const cookieBtn = target.closest("#lrfCookieAcceptBtn");
    if (cookieBtn) {
      acceptCookies();
      return;
    }

    // G. SSS Akordiyon Tetikleyicisi
    const faqTrigger = target.closest(".lrf-faq__trigger");
    if (faqTrigger) {
      toggleFaqEngine(faqTrigger);
    }
  });

  // H. Klavye ESC Tuşu ile Lightbox ve Mobil Menüyü Kapatma
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      toggleMobileMenu(true);
    }
  });
});
