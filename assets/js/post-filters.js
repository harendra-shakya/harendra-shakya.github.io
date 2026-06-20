let currentLangFilter = "all"; // 'all', 'en', 'hi'
let currentTagFilter = "all"; // 'all' or specific tag
let currentCategoryFilter = "all"; // 'all' or specific category
let currentSeriesFilter = "all"; // 'all' or specific series

function phCapture(event, props) {
  if (typeof posthog !== 'undefined') posthog.capture(event, props);
}

// Filter posts by language
function filterLang(lang) {
  currentLangFilter = lang;
  updateSelectedFilter("lang", lang);
  filterPosts();
  phCapture('post_filter_applied', { filter_type: 'lang', filter_value: lang });
}

// Filter posts by tags
function filterTags(tag) {
  currentTagFilter = tag;
  updateSelectedFilter("tag", tag);
  filterPosts();
  phCapture('post_filter_applied', { filter_type: 'tag', filter_value: tag });
}

// Filter posts by categories
function filterCategory(category) {
  currentCategoryFilter = category;
  updateSelectedFilter("category", category);
  filterPosts();
  phCapture('post_filter_applied', { filter_type: 'category', filter_value: category });
}

// Filter posts by series
function filterSeries(series) {
  currentSeriesFilter = series;
  updateSelectedFilter("series", series);
  filterPosts();
  phCapture('post_filter_applied', { filter_type: 'series', filter_value: series });
}

// Update the UI to show the selected filter
function updateSelectedFilter(filterType, value) {
  resetFilterStyles(filterType);

  const selectedButton = document.querySelector(
    `.filter-button[data-filter-type="${filterType}"][data-filter-value="${value}"]`,
  );

  if (selectedButton) {
    selectedButton.classList.add("selected");
    applyTextColor(selectedButton);
  }
}

// Reset styles for a filter type
function resetFilterStyles(filterType) {
  const filterButtons = document.querySelectorAll(
    `.filter-button[data-filter-type="${filterType}"]`,
  );

  filterButtons.forEach((button) => {
    button.classList.remove("selected");
    button.style.color = "inherit";
  });
}

// Apply text color to selected button
function applyTextColor(button) {
  button.style.color = "#FF5277";
}

// Filter posts based on all filters
function filterPosts() {
  const posts = document.querySelectorAll(".post-block");

  posts.forEach((post) => {
    const postLang = post.dataset.lang;
    const postTags = post.dataset.tags?.split(",") || [];
    const postCategories = post.dataset.categories?.split(",") || [];
    const postSeries = post.dataset.series?.split(",") || [];

    const matchLang =
      currentLangFilter === "all" || postLang === currentLangFilter;

    const matchTag =
      currentTagFilter === "all" || postTags.includes(currentTagFilter);

    const matchCategory =
      currentCategoryFilter === "all" ||
      postCategories.includes(currentCategoryFilter);

    const matchSeries =
      currentSeriesFilter === "all" || postSeries.includes(currentSeriesFilter);

    if (matchLang && matchTag && matchCategory && matchSeries) {
      post.style.display = "";
    } else {
      post.style.display = "none";
    }
  });
}

// Ensure page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded, ready to filter posts.");
});
