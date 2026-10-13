/**
 * ============================================================
 * VINTAGE WEDDING INVITATION — JAVASCRIPT
 * Authentic Bisdev Elementor Animation Engine & Interactions
 * ============================================================
 */

(function () {
  'use strict';

  // ——————————————————————————————————————————————
  // DOM References
  // ——————————————————————————————————————————————
  const cover = document.getElementById('cover');
  const btnOpen = document.getElementById('btnOpen');
  const phoneFrame = document.getElementById('phoneFrame');
  const musicPlayer = document.getElementById('musicPlayer');
  const bgMusic = document.getElementById('bgMusic');
  const toast = document.getElementById('toast');
  const musicToast = document.getElementById('musicToast');
  const btnToggleAmplop = document.getElementById('btnToggleAmplop');
  const amplopBox = document.getElementById('amplopBox');
  const paymentToggleButtons = document.querySelectorAll('.payment-toggle-button');
  const paymentPanels = document.querySelectorAll('[data-payment-panel]');
  const qrisImage = document.querySelector('.qris-image');
  const qrisFallback = document.querySelector('.qris-fallback');
  const sparkleBurst = document.getElementById('sparkleBurst');
  const rsvpForm = document.getElementById('rsvpForm');
  const wishesContainer = document.getElementById('wishesContainer');
  const statHadirEl = document.getElementById('statHadir');
  const statTidakEl = document.getElementById('statTidak');
  const presenceValue = document.getElementById('presenceValue');
  const presencePills = document.querySelectorAll('.presence-pill');
  const dockItems = document.querySelectorAll('.dock-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const galleryThumbs = document.querySelectorAll('.gallery-thumb');

  // ——————————————————————————————————————————————
  // 1. Initialize Lottie Flying Birds
  // ——————————————————————————————————————————————
  function initLottieBirds() {
    if (typeof lottie === 'undefined') return;

    // Cover bird
    const birdCoverContainer = document.getElementById('lottieBirdCover');
    if (birdCoverContainer) {
      lottie.loadAnimation({
        container: birdCoverContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/img/bird-1.json',
      });
    }

    // Hero bird
    const birdHeroContainer = document.getElementById('lottieBirdHero');
    if (birdHeroContainer) {
      lottie.loadAnimation({
        container: birdHeroContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/img/bird-2.json',
      });
    }

    // Couple bird
    const birdCoupleContainer = document.getElementById('lottieBirdCouple');
    if (birdCoupleContainer) {
      lottie.loadAnimation({
        container: birdCoupleContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/img/bird-1.json',
      });
    }
  }

  // Pre-load Lottie when DOM ready or script loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLottieBirds);
  } else {
    initLottieBirds();
  }

  // ——————————————————————————————————————————————
  // 2. URL Parameters (?to=NamaTamu)
  // ——————————————————————————————————————————————
  const urlParams = new URLSearchParams(window.location.search);
  const guestQuery = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest');
  if (guestQuery) {
    const formattedGuest = decodeURIComponent(guestQuery).replace(/\+/g, ' ');
    const coverGuestName = document.getElementById('coverGuestName');
    if (coverGuestName) coverGuestName.textContent = formattedGuest;

    const rsvpNameInput = document.getElementById('rsvpName');
    if (rsvpNameInput && !rsvpNameInput.value) {
      rsvpNameInput.value = formattedGuest;
    }
  }

  // ——————————————————————————————————————————————
  // 3. Bisdev Reveal Animation Engine (.ef.active)
  // ——————————————————————————————————————————————
  function initBisdevReveals() {
    const revealElements = document.querySelectorAll('.ef:not(.active)');

    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: window.innerWidth >= 992 ? phoneFrame : null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      };

      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      }, observerOptions);

      revealElements.forEach((el) => {
        // Don't observer cover elements (they are animated on cover open)
        if (!el.closest('#cover')) {
          revealObserver.observe(el);
        }
      });
    } else {
      revealElements.forEach((el) => el.classList.add('active'));
    }
  }

  // Immediately animate cover card elements on page load
  window.addEventListener('DOMContentLoaded', () => {
    const coverEfs = document.querySelectorAll('#cover .ef');
    coverEfs.forEach((el) => el.classList.add('active'));
  });

  // ——————————————————————————————————————————————
  // 4. Cover: Buka Undangan (Curtain Opening Reveal)
  // ——————————————————————————————————————————————
  let isUnlocked = false;

  if (btnOpen) {
    btnOpen.addEventListener('click', function () {
      if (isUnlocked) return;
      isUnlocked = true;

      // 1. Tambahkan class .opened pada #cover untuk memicu animasi gorden terbuka
      cover.classList.add('opened');
      document.body.classList.remove('no-scroll');

      // 2. Jalankan fungsi pemutar musik latar
      startMusic();

      // 3. Mulai partikel romantis floating batik dan kelopak bunga
      startFloatingDecorations();

      // 4. Jeda waktu 750ms sebelum memicu animasi kemunculan elemen utama (#hero .ef)
      // agar elemen di balik gorden muncul secara presisi saat gorden mulai terbuka lebar
      setTimeout(() => {
        const heroEfs = document.querySelectorAll('#hero .ef');
        heroEfs.forEach((el) => el.classList.add('active'));
      }, 750);

      // 5. Inisialisasi scroll observer untuk bagian berikutnya
      setTimeout(initBisdevReveals, 1000);

      // 6. Pastikan aksesibilitas cover dinonaktifkan setelah animasi gorden selesai
      setTimeout(() => {
        if (cover) {
          cover.setAttribute('aria-hidden', 'true');
        }
      }, 1500);
    });
  }

  // ——————————————————————————————————————————————
  // 5. Music & Vinyl Player Controls
  // ——————————————————————————————————————————————
  let isPlaying = false;
  let hasShownMusicToast = false;

  function showMusicToast() {
    if (!musicToast || hasShownMusicToast) return;
    hasShownMusicToast = true;
    musicToast.classList.add('show');
    setTimeout(() => musicToast.classList.remove('show'), 4000);
  }

  function startMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.55;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          musicPlayer.classList.remove('paused');
          showMusicToast();
        })
        .catch(() => {
          isPlaying = false;
          musicPlayer.classList.add('paused');
        });
    }
  }

  function toggleMusic() {
    if (!bgMusic) return;
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      musicPlayer.classList.add('paused');
    } else {
      bgMusic.play().then(() => {
        isPlaying = true;
        musicPlayer.classList.remove('paused');
        showMusicToast();
      });
    }
  }

  if (musicPlayer) {
    musicPlayer.addEventListener('click', toggleMusic);
  }

  // Auto-pause when page hidden, resume when visible
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (bgMusic && isPlaying) bgMusic.pause();
    } else {
      if (bgMusic && isPlaying && isUnlocked) bgMusic.play().catch(() => {});
    }
  });

  // ——————————————————————————————————————————————
  // 6. Countdown Timer (29 Oktober 2026)
  // ——————————————————————————————————————————————
  const targetDate = new Date('2026-10-29T07:00:00+07:00').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMinutes');
    const secsEl = document.getElementById('countSeconds');

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '0';
      if (hoursEl) hoursEl.textContent = '0';
      if (minsEl) minsEl.textContent = '0';
      if (secsEl) secsEl.textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl && daysEl.textContent !== String(days)) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    if (minsEl) minsEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    if (secsEl) secsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ——————————————————————————————————————————————
  // 7. Amplop Digital (Collapsible Toggle)
  // ——————————————————————————————————————————————
  if (btnToggleAmplop && amplopBox) {
    btnToggleAmplop.addEventListener('click', function () {
      amplopBox.classList.toggle('expanded');
      const isExpanded = amplopBox.classList.contains('expanded');
      btnToggleAmplop.querySelector('span').textContent = isExpanded ? 'Tutup Rekening' : 'Klik Disini';

      // Trigger reveals on newly visible cards inside amplop
      if (isExpanded) {
        const cards = amplopBox.querySelectorAll('.ef');
        cards.forEach((c) => c.classList.add('active'));
      }

      paymentToggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const selectedView = button.dataset.paymentView;
          paymentToggleButtons.forEach((item) => {
            item.classList.toggle('is-active', item === button);
          });
          paymentPanels.forEach((panel) => {
            const isVisible = panel.dataset.paymentPanel === selectedView;
            panel.classList.toggle('is-visible', isVisible);
            panel.setAttribute('aria-hidden', String(!isVisible));
          });
        });
      });

      if (qrisImage && qrisFallback) {
        qrisImage.addEventListener('error', () => {
          qrisImage.hidden = true;
          qrisFallback.style.display = 'block';
        });
      }

      function createSparkleBurst() {
        if (!sparkleBurst) return;
        sparkleBurst.replaceChildren();
        for (let index = 0; index < 22; index += 1) {
          const particle = document.createElement('span');
          particle.className = 'sparkle-particle';
          particle.style.setProperty('--sparkle-x', `${(Math.random() - 0.5) * 85}vw`);
          particle.style.setProperty('--sparkle-y', `${(Math.random() - 0.5) * 70}vh`);
          particle.style.animationDelay = `${Math.random() * 0.18}s`;
          sparkleBurst.appendChild(particle);
          particle.addEventListener('animationend', () => particle.remove(), { once: true });
        }
      }
    });
  }

  // ——————————————————————————————————————————————
  // 8. Copy to Clipboard & Toast Notification
  // ——————————————————————————————————————————————
  const copyButtons = document.querySelectorAll('.btn-copy-card');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const textToCopy = this.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          const originalText = this.querySelector('span') ? this.querySelector('span').textContent : 'Copy';
          if (this.querySelector('span')) this.querySelector('span').textContent = 'Tersalin!';
          showToast('Berhasil disalin ke clipboard! ✓');

          setTimeout(() => {
            if (this.querySelector('span')) this.querySelector('span').textContent = originalText;
          }, 2500);
        })
        .catch(() => {
          const tempInput = document.createElement('textarea');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast('Berhasil disalin ke clipboard! ✓');
        });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ——————————————————————————————————————————————
  // 9. Gallery Lightbox Modal
  // ——————————————————————————————————————————————
  const galleryImages = Array.from(galleryThumbs).map((t) => t.getAttribute('data-full'));
  let currentImageIndex = 0;

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentImageIndex = index;
    lightboxImg.src = galleryImages[currentImageIndex];
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
  }

  galleryThumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // ——————————————————————————————————————————————
  // 10. RSVP & Wishes Wall
  // ——————————————————————————————————————————————
  presencePills.forEach((pill) => {
    pill.addEventListener('click', function () {
      presencePills.forEach((p) => p.classList.remove('pill-active'));
      this.classList.add('pill-active');
      presenceValue.value = this.getAttribute('data-presence');
    });
  });

  const demoWishSignatures = new Set([
    'Budi Santoso & Keluarga|12-10-2026 14:20',
    'Siti Aminah|12-10-2026 11:05',
    'Ahmad Fauzi|11-10-2026 19:45',
    'Dewi Rahmawati|11-10-2026 16:30',
  ]);

  function getWishes() {
    const raw = localStorage.getItem('vintage_wishes_data');
    if (!raw) return [];

    try {
      const wishes = JSON.parse(raw);
      if (!Array.isArray(wishes)) return [];

      const guestWishes = wishes.filter((wish) => (
        !demoWishSignatures.has(`${wish.name}|${wish.time}`)
      ));
      localStorage.setItem('vintage_wishes_data', JSON.stringify(guestWishes));
      return guestWishes;
    } catch {
      localStorage.removeItem('vintage_wishes_data');
      return [];
    }
  }

  function renderWishes() {
    if (!wishesContainer) return;
    const wishes = getWishes();
    wishesContainer.innerHTML = '';

    let hadirCount = 0;
    let tidakHadirCount = 0;

    wishes.forEach((w) => {
      if (w.presence === 'Hadir') hadirCount++;
      else tidakHadirCount++;

      const isHadir = w.presence === 'Hadir';
      const item = document.createElement('div');
      item.className = 'wish-card';
      item.innerHTML = `
        <div class="wish-header">
          <span class="wish-author">${escapeHTML(w.name)}</span>
          <span class="wish-badge ${isHadir ? 'wish-badge-hadir' : 'wish-badge-tidak'}">
            ${isHadir ? '✓ Hadir' : '✕ Tidak Hadir'}
          </span>
        </div>
        <div class="wish-time">${escapeHTML(w.time || 'Baru saja')}</div>
        <p class="wish-content">${escapeHTML(w.message)}</p>
      `;
      wishesContainer.appendChild(item);
    });

    if (statHadirEl) statHadirEl.textContent = hadirCount;
    if (statTidakEl) statTidakEl.textContent = tidakHadirCount;
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('rsvpName');
      const messageInput = document.getElementById('rsvpMessage');
      const name = nameInput ? nameInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const presence = presenceValue ? presenceValue.value : 'Hadir';

      if (!name) {
        showToast('Mohon masukkan nama Anda.');
        return;
      }
      if (!message) {
        showToast('Mohon tulis ucapan atau doa Anda.');
        return;
      }

      const now = new Date();
      const dateFormatted = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newWish = {
        name,
        presence,
        message,
        time: dateFormatted,
      };

      const wishes = getWishes();
      wishes.unshift(newWish);
      localStorage.setItem('vintage_wishes_data', JSON.stringify(wishes));

      renderWishes();
      createSparkleBurst();
      showToast('Terima kasih atas doa dan ucapannya! 🤍');

      if (messageInput) messageInput.value = '';
    });
  }

  renderWishes();

  // ——————————————————————————————————————————————
  // 11. Bottom Dock Navigation & ScrollSpy
  // ——————————————————————————————————————————————
  dockItems.forEach((item) => {
    item.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      dockItems.forEach((d) => d.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const navTargets = ['hero', 'couple', 'event', 'gallery', 'rsvp'];
  const scrollContainers = [window, phoneFrame].filter(Boolean);

  function checkActiveSection() {
    const scrollPos = (phoneFrame && window.innerWidth >= 992 ? phoneFrame.scrollTop : window.scrollY) + 200;

    for (let i = navTargets.length - 1; i >= 0; i--) {
      const sec = document.getElementById(navTargets[i]);
      if (sec) {
        const offset = sec.offsetTop;
        if (scrollPos >= offset) {
          dockItems.forEach((d) => d.classList.remove('active'));
          const currentItem = document.querySelector(`.dock-item[data-target="${navTargets[i]}"]`);
          if (currentItem) currentItem.classList.add('active');
          break;
        }
      }
    }
  }

  scrollContainers.forEach((c) => {
    c.addEventListener('scroll', checkActiveSection, { passive: true });
  });

  // ——————————————————————————————————————————————
  // 12. Floating Romantic Floral Petals & Sparkles
  // ——————————————————————————————————————————————
  const petals = ['🌸', '🥀', '✨', '💮', '🪷', '🍃', '🤍'];
  let animationInterval;
  let isFloatingActive = false;

  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];

    const left = Math.random() * 100;
    const duration = 7 + Math.random() * 6;
    const size = 0.8 + Math.random() * 0.7;

    petal.style.left = left + 'vw';
    petal.style.fontSize = size + 'rem';
    petal.style.animationDuration = duration + 's';

    document.body.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000 + 200);
  }

  function createFloatingFloral() {
    const el = document.createElement('div');
    el.className = 'batik-float-item';
    // Romantic floral emojis: cherry blossom, wilted rose, sparkle, hibiscus, rosette
    const florals = ['🌸', '🥀', '✨', '💮', '🏵️', '🌸', '✨'];
    el.textContent = florals[Math.floor(Math.random() * florals.length)];

    const left = Math.random() * 92 + 4; // 4vw to 96vw
    const duration = 10 + Math.random() * 8; // slow, dreamy float (10s - 18s)
    const size = 16 + Math.random() * 18; // 16px - 34px
    const driftX = (Math.random() - 0.5) * 80; // -40px to +40px

    el.style.left = left + 'vw';
    el.style.fontSize = size + 'px';
    el.style.lineHeight = '1';
    el.style.animationDuration = duration + 's';
    el.style.setProperty('--drift-x', driftX + 'px');

    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, duration * 1000 + 200);
  }

  function startFloatingDecorations() {
    if (isFloatingActive) return;
    isFloatingActive = true;

    // Initial batch
    for (let i = 0; i < 4; i++) {
      setTimeout(createFloatingFloral, i * 450 + 100);
      setTimeout(createPetal, i * 650 + 250);
    }

    // Recurring gentle generator
    let counter = 0;
    animationInterval = setInterval(() => {
      if (document.hidden) return;
      counter++;
      if (counter % 2 === 0) {
        createFloatingFloral();
      } else {
        createPetal();
      }
    }, 1800);
  }

  // Spawn gentle ambient floating batik on cover immediately
  setTimeout(() => {
    createFloatingFloral();
    setTimeout(createFloatingFloral, 1200);
  }, 500);

  // ——————————————————————————————————————————————
  // 13. Smooth Parallax Depth for Batik Backgrounds
  // ——————————————————————————————————————————————
  function initBatikParallax() {
    const heroBg = document.querySelector('.hero-slide-bg');
    const openingSection = document.querySelector('.opening-section');
    const coupleSection = document.querySelector('.couple-section');
    const giftSection = document.querySelector('.amplop-section');
    const gallerySection = document.querySelector('.gallery-section');

    let ticking = false;

    function onScrollParallax() {
      const isDesktop = window.innerWidth >= 992 && phoneFrame;
      const scrollY = isDesktop ? phoneFrame.scrollTop : (window.scrollY || window.pageYOffset || 0);

      if (heroBg) {
        // Hero subtle depth
        heroBg.style.transform = `scale(1.15) translateY(${scrollY * 0.12}px)`;
      }

      if (openingSection) {
        openingSection.style.backgroundPositionY = `calc(50% + ${(scrollY - 400) * 0.08}px)`;
      }

      if (coupleSection) {
        coupleSection.style.backgroundPositionY = `calc(50% + ${(scrollY - 800) * 0.06}px)`;
      }

      if (giftSection) {
        giftSection.style.backgroundPositionY = `calc(50% + ${(scrollY - 2000) * 0.05}px)`;
      }

      if (gallerySection) {
        gallerySection.style.backgroundPositionY = `calc(100% + ${(scrollY - 1600) * 0.05}px)`;
      }

      ticking = false;
    }

    scrollContainers.forEach((c) => {
      c.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(onScrollParallax);
          ticking = true;
        }
      }, { passive: true });
    });
  }

  initBatikParallax();

})();
