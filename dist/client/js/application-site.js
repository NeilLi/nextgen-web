document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  var menuButton = document.querySelector(".menu-button");
  var siteMenu = document.getElementById("site-menu");

  if (menuButton && siteMenu) {
    menuButton.addEventListener("click", function () {
      var isOpen = siteMenu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    siteMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteMenu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  var revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  var filterButtons = document.querySelectorAll("[data-filter]");
  var projectCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.dataset.filter;
      filterButtons.forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach(function (card) {
        var categories = card.dataset.category.split(" ");
        card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
      });
    });
  });

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var statusTicker = document.querySelector("[data-status-ticker]");
  var statusMessages = [
    "Mapping the shortest route from local coffee to happy tourist.",
    "Teaching the robot to fold souvenir shirts. Results: adorably mixed.",
    "Checking that the rare sneaker is a sneaker—not ambitious bubble wrap.",
    "Adding one more tiny adventure to the family journey.",
    "Helping local makers become the best part of the map."
  ];

  if (statusTicker && !prefersReducedMotion) {
    var statusIndex = 0;
    window.setInterval(function () {
      statusTicker.classList.add("is-changing");
      window.setTimeout(function () {
        statusIndex = (statusIndex + 1) % statusMessages.length;
        statusTicker.textContent = statusMessages[statusIndex];
        statusTicker.classList.remove("is-changing");
      }, 200);
    }, 4300);
  }

  var shirtScene = document.querySelector("[data-shirt-stamp]");
  if (shirtScene) {
    var stamps = ["🎨", "☕", "👟", "🤖", "🏔️", "✨"];
    var stampIndex = -1;
    var stampBadge = shirtScene.querySelector(".shirt-interactive-stamp");

    shirtScene.addEventListener("click", function () {
      stampIndex = (stampIndex + 1) % stamps.length;
      stampBadge.textContent = stamps[stampIndex];
      stampBadge.classList.remove("stamp-pop");
      void stampBadge.offsetWidth;
      stampBadge.classList.add("stamp-pop");
      shirtScene.setAttribute("aria-label", "Souvenir stamped with " + stamps[stampIndex] + ". Click for another stamp.");
    });
  }

  if (!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    projectCards.forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var xRatio = (event.clientX - rect.left) / rect.width - 0.5;
        var yRatio = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-x", (-yRatio * 5).toFixed(2) + "deg");
        card.style.setProperty("--tilt-y", (xRatio * 5).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  var robotButton = document.querySelector("[data-robot-secret]");
  if (robotButton) {
    var robotTapCount = 0;
    var robotTapTimer;
    var robotScene = robotButton.closest(".scene-robot");
    var robotMessage = robotScene.querySelector(".robot-secret-message");

    robotButton.addEventListener("click", function () {
      robotTapCount += 1;
      window.clearTimeout(robotTapTimer);

      if (robotTapCount >= 3) {
        robotTapCount = 0;
        robotMessage.textContent = "Beep boop! Secret gear found. 🤖";
        robotMessage.classList.add("is-visible");

        for (var confettiIndex = 0; confettiIndex < 18; confettiIndex += 1) {
          var confetti = document.createElement("span");
          confetti.className = "robot-confetti";
          confetti.style.setProperty("--confetti-x", (Math.random() * 180 - 90).toFixed(0) + "px");
          confetti.style.setProperty("--confetti-y", (Math.random() * 85 + 35).toFixed(0) + "px");
          confetti.style.animationDelay = (confettiIndex * 18) + "ms";
          robotScene.appendChild(confetti);
          window.setTimeout(function (piece) { piece.remove(); }, 1100, confetti);
        }

        window.setTimeout(function () { robotMessage.classList.remove("is-visible"); }, 2600);
        return;
      }

      robotTapTimer = window.setTimeout(function () { robotTapCount = 0; }, 1100);
    });
  }

  var contactForm = document.getElementById("applicationContactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      var formData = new FormData(contactForm);
      var subject = "SeedCore application conversation — " + formData.get("interest");
      var body = [
        "Hi SeedCore,",
        "",
        formData.get("message"),
        "",
        "Name: " + formData.get("name"),
        "Email: " + formData.get("email"),
        "Application world: " + formData.get("interest")
      ].join("\n");
      window.location.href = "mailto:hello@seedcore.ai?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
});
