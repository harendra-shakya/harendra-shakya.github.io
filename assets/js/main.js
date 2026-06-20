(() => {
  function phCapture(event, props) {
    if (typeof posthog !== 'undefined') posthog.capture(event, props);
  }

  // Theme switch
  const body = document.body;
  const lamp = document.getElementById("mode");

  const toggleTheme = (state) => {
    if (state === "dark") {
      localStorage.setItem("theme", "light");
      body.removeAttribute("data-theme");
      phCapture('theme_toggled', { new_theme: 'light' });
    } else if (state === "light") {
      localStorage.setItem("theme", "dark");
      body.setAttribute("data-theme", "dark");
      phCapture('theme_toggled', { new_theme: 'dark' });
    } else {
      initTheme(state);
    }
  };

  lamp.addEventListener("click", () =>
    toggleTheme(localStorage.getItem("theme")),
  );

  // Blur the content when the menu is open
  const cbox = document.getElementById("menu-trigger");

  cbox.addEventListener("change", function () {
    const area = document.querySelector(".wrapper");
    this.checked
      ? area.classList.add("blurry")
      : area.classList.remove("blurry");
  });

  // random insight
  const items = document.querySelectorAll(".random-item");
  const random = items[Math.floor(Math.random() * items.length)];
  if (random) random.hidden = false;

  // Tag clicks
  document.querySelectorAll('.tags .tag').forEach(function (el) {
    el.addEventListener('click', function () {
      phCapture('tag_clicked', { tag: el.textContent.trim() });
    });
  });

  // Related post clicks
  document.querySelectorAll('.related-bhajans a').forEach(function (el) {
    el.addEventListener('click', function () {
      phCapture('related_post_clicked', { post_url: el.getAttribute('href'), post_title: el.textContent.trim() });
    });
  });

  // Backlink clicks
  document.querySelectorAll('.backlinks a').forEach(function (el) {
    el.addEventListener('click', function () {
      phCapture('backlink_clicked', { post_url: el.getAttribute('href'), post_title: el.textContent.trim() });
    });
  });
})();
