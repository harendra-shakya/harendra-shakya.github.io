let currentLangFilter = "all"; // 'all', 'en', 'hi'
let currentTagFilter = "all"; // 'all' or specific tag
let currentCategoryFilter = "all"; // 'all' or specific category

// Filter posts by language
function filterLang(lang) {
  currentLangFilter = lang;
  updateSelectedFilter("lang", lang); // Update the selected filter UI (color only)
  filterPosts();
}

// Filter posts by tags
function filterTags(tag) {
  currentTagFilter = tag;
  updateSelectedFilter("tag", tag); // Update the selected filter UI (color only)
  filterPosts();
}

// Filter posts by categories
function filterCategory(category) {
  currentCategoryFilter = category;
  updateSelectedFilter("category", category); // Update the selected filter UI (color only)
  filterPosts();
}

// Update the UI to show the selected filter
function updateSelectedFilter(filterType, value) {
  // Reset the selected class and styles for the specific filter type
  resetFilterStyles(filterType, value);

  // Highlight the selected filter button with text color change
  const selectedButton = document.querySelector(
    `.filter-button[data-filter-type="${filterType}"][data-filter-value="${value}"]`,
  );
  if (selectedButton) {
    selectedButton.classList.add("selected");
    applyTextColor(selectedButton, filterType); // Apply text color for selected filter
  }
}

// Reset the styles for all buttons of a specific filter type (category, tag, or language)
function resetFilterStyles(filterType, value) {
  const filterButtons = document.querySelectorAll(
    `.filter-button[data-filter-type="${filterType}"]`,
  );
  filterButtons.forEach((button) => {
    // Remove the selected class and reset text color to default (inherit)
    button.classList.remove("selected");
    button.style.color = "inherit"; // Reset text color to inherit
  });

  // If the button for the newly selected value exists, add the selected class
  const selectedButton = document.querySelector(
    `.filter-button[data-filter-type="${filterType}"][data-filter-value="${value}"]`,
  );
  if (selectedButton) {
    selectedButton.classList.add("selected");
  }
}

// Apply text color to the selected filter button
function applyTextColor(button, filterType) {
  button.style.color = "#FF5277"; // Change text color to pink for the selected filter
}

// Filter posts based on language, tag, and category filters
function filterPosts() {
  const posts = document.querySelectorAll(".post-block");
  posts.forEach((post) => {
    const postLang = post.dataset.lang;
    const postTags = post.dataset.tags.split(",");
    const postCategories = post.dataset.categories.split(",");

    // Check if post matches all selected filters
    const matchLang =
      currentLangFilter === "all" || postLang === currentLangFilter;
    const matchTag =
      currentTagFilter === "all" || postTags.includes(currentTagFilter);
    const matchCategory =
      currentCategoryFilter === "all" ||
      postCategories.includes(currentCategoryFilter);

    if (matchLang && matchTag && matchCategory) {
      post.style.display = ""; // Show the post
    } else {
      post.style.display = "none"; // Hide the post
    }
  });
}

// Ensure the page is fully loaded before applying filters
document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded, ready to filter posts.");
});
