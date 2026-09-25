/* Tran Nguyen Minh Anh - portfolio behaviour.
   No dependencies. Three jobs: theme, scroll reveal, project lightbox. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ theme -- */

  var toggle = document.getElementById("theme");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("ma-scrapbook-theme", next);
      } catch (e) {}
    });
  }

  /* ----------------------------------------------------------- reveal -- */

  var reveals = document.querySelectorAll("[data-reveal]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* --------------------------------------------------------- lightbox -- */

  var dataEl = document.getElementById("work-data");
  var lb = document.getElementById("lightbox");
  if (!dataEl || !lb) return;

  var projects;
  try {
    projects = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  var elImg = document.getElementById("lb-img");
  var elTitle = document.getElementById("lb-title");
  var elSub = document.getElementById("lb-sub");
  var elCounter = document.getElementById("lb-counter");
  var elLink = document.getElementById("lb-link");
  var btnPrev = document.getElementById("lb-prev");
  var btnNext = document.getElementById("lb-next");
  var btnClose = document.getElementById("lb-close");

  var current = null;
  var index = 0;
  var opener = null;

  function srcOf(slide) {
    return "assets/img/" + slide.src + ".webp";
  }

  function preload(i) {
    var slides = current.slides;
    [i - 1, i + 1].forEach(function (n) {
      if (n >= 0 && n < slides.length) {
        var img = new Image();
        img.src = srcOf(slides[n]);
      }
    });
  }

  function render() {
    var slide = current.slides[index];
    elImg.src = srcOf(slide);
    elImg.alt = slide.alt || current.title;
    elCounter.textContent = (index + 1) + " of " + current.slides.length;
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === current.slides.length - 1;
    if (slide.link) {
      elLink.href = slide.link;
      elLink.hidden = false;
    } else {
      elLink.hidden = true;
    }
    preload(index);
  }

  function go(step) {
    var next = index + step;
    if (next < 0 || next >= current.slides.length) return;
    index = next;
    render();
  }

  function open(key, trigger) {
    current = projects[key];
    if (!current) return;
    index = 0;
    opener = trigger || null;
    elTitle.textContent = current.title;
    elSub.textContent = current.sub;
    render();
    lb.setAttribute("open", "");
    document.body.classList.add("is-locked");
    btnClose.focus();
    document.addEventListener("keydown", onKey);
  }

  function close() {
    lb.removeAttribute("open");
    document.body.classList.remove("is-locked");
    document.removeEventListener("keydown", onKey);
    elImg.removeAttribute("src");
    if (opener) opener.focus();
    current = null;
  }

  function onKey(e) {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowRight") { go(1); return; }
    if (e.key === "ArrowLeft") { go(-1); return; }
    if (e.key === "Tab") {
      /* Keep focus inside the dialog. */
      var focusable = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.disabled; });
      if (!elLink.hidden) focusable.push(elLink);
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  document.querySelectorAll("[data-project]").forEach(function (card) {
    card.addEventListener("click", function () {
      open(card.getAttribute("data-project"), card);
    });
  });

  btnPrev.addEventListener("click", function () { go(-1); });
  btnNext.addEventListener("click", function () { go(1); });
  btnClose.addEventListener("click", close);
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.classList.contains("lb__stage")) close();
  });

  /* Swipe between pages on touch. */
  var startX = null;
  lb.addEventListener("touchstart", function (e) {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    startX = null;
  }, { passive: true });
})();
