---
title: Posts
permalink: /posts/
layout: page
excerpt: All post.
comments: false
---

<!-- Search Box -->
<div class="search-article">
  <label for="search-input" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(128,128,128,0.8)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-search"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </label>
  <input
    type="search"
    id="search-input"
    placeholder="Find some articles here"
    aria-label="Search"
  />
</div>

<!-- Language Toggle -->
<div class="lang-toggle">
  <button onclick="filterLang('all')">All</button>
  <button onclick="filterLang('en')">English</button>
  <button onclick="filterLang('hi')">हिंदी</button>
</div>

<ul id="search-results"></ul>

<!-- Post List Grouped by Year and Filterable by Language -->
{%- assign posts = site.posts | sort: "date" | reverse -%} {%- assign
previous_year = "" -%} {%- for post in posts -%} {%- capture current_year -%}{{
post.date | date: "%Y" }}{%- endcapture -%} {%- if current_year != previous_year
-%}
<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%} {%- endif -%} {%- assign post_lang =
post.lang | default: 'en' -%}
<div class="post-block" data-lang="{{ post_lang }}">
  <article class="post-item">
    <!-- <span class="post-item-date">{{ post.date | date: "%b %d, %Y" }}</span> -->
    <h3 class="post-item-title">
      <a href="{{ post.url }}">{{ post.title | escape }}</a>
    </h3>
  </article>
</div>
{%- endfor -%}

<!-- Language Filtering Script -->
<script>
  function filterLang(lang) {
    const posts = document.querySelectorAll(".post-block");
    posts.forEach((post) => {
      if (lang === "all" || post.dataset.lang === lang) {
        post.style.display = "";
      } else {
        post.style.display = "none";
      }
    });
  }
</script>
