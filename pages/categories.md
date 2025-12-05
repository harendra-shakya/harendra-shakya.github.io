---
title: Categories
permalink: /categories/
layout: page
excerpt: Sorted articles by categories.
---

<!-- - Indian Philosophy
- Mental Models
- Vedanta
- Yoga Philosophy
- Nyaya (Logic)
- Samkhya
- Ethics
- Epistemology
- Cognitive Science
- Decision Making
- Psychology
- Critical Thinking -->

<!-- Books summary
lectures
Courses
-->

<div class="archive-categories">
  <a class="category-item" href="#">all</a>
  {%- for category in site.categories -%} {% capture name %}{{ category | first
  }}{% endcapture %}
  <a class="category-item" href="#{{ name }}">{{ name }}</a>
  {%- endfor -%}
</div>

<!-- Language Toggle -->
<div class="lang-toggle">
  <button onclick="filterLang('all')">all</button>
  <button onclick="filterLang('en')">English</button>
  <button onclick="filterLang('hi')">हिंदी</button>
</div>

{%- assign sorted_categories = site.categories | keys | sort -%}
{%- for category in sorted_categories -%}
{%- capture name -%}{{ category | first }}{%- endcapture -%}

  <h2 id="{{ name }}">{{ name | upcase }}</h2>

{%- if site.categories[name] != empty -%}
{%- for post in site.categories[name] -%}
{%- assign post_lang = post.lang | default: 'en' -%}

<div class="post-block post-item" data-lang="{{ post_lang }}">
  <article class="">
  <!-- <span class="post-item-date">{{ post.date | date: "%b %d, %Y" }}</span> -->
  <h3 class="post-item-title">
  <a href="{{ post.url }}">{{ post.title | escape }}</a>
  </h3>
  </article>
</div>

{%- endfor -%}
{%- else -%}

<p>No posts available in this category.</p>
{%- endif -%}
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
