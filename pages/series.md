---
title: Series
permalink: /series/
layout: page
excerpt: Sorted articles by series.
---

{% comment %}
Collect all posts from multiple collections
{% endcomment %}
{% assign all_posts = site.posts
  | concat: site.bhajans
  | concat: site.poetry
  | concat: site.insights
  | concat: site.sahitya
  | concat: site.avalokan
%}

{% comment %}
Extract all unique series safely
{% endcomment %}
{% assign all_series = all_posts | map: 'series' | flatten | compact | uniq %}

{% comment %}
Extract all unique tags safely
{% endcomment %}
{% assign all_tags = all_posts | map: 'tags' | flatten | compact | uniq %}

<!-- ================= SERIES FILTER ================= -->

<div class="archive-categories">
  <a class="category-item" href="#all">All Series</a>
  {% for series_item in all_series %}
    <a class="category-item" href="#{{ series_item | slugify }}">
      {{ series_item }}
    </a>
  {% endfor %}
</div>

<!-- ================= TAG FILTER ================= -->

<div class="lang-toggle">
  <button class="filter-button" onclick="filterTags('all')">All</button>
  {% for tag in all_tags %}
    <button class="filter-button" onclick="filterTags('{{ tag }}')">
      {{ tag }}
    </button>
  {% endfor %}
</div>

<!-- ================= LANGUAGE FILTER ================= -->

<div class="lang-toggle">
  <button class="filter-button" onclick="filterLang('all')">All</button>
  <button class="filter-button" onclick="filterLang('en')">English</button>
  <button class="filter-button" onclick="filterLang('hi')">हिंदी</button>
</div>

<hr>

<!-- Anchor target for "All Series" -->
<div id="all"></div>

<!-- ================= POSTS BY SERIES ================= -->

{% for series_item in all_series %}

  <h2 id="{{ series_item | slugify }}">
    {{ series_item | upcase }}
  </h2>

{% comment %}
Collect posts that CONTAIN this series
{% endcomment %}
{% assign posts_in_series = "" | split: "" %}
{% for post in all_posts %}
{% if post.series contains series_item %}
{% assign posts_in_series = posts_in_series | push: post %}
{% endif %}
{% endfor %}

  <div class="category-posts">

    {% for post in posts_in_series %}
      <div class="post-block post-item"
           data-lang="{{ post.lang | default: 'en' }}"
           data-tags="{{ post.tags | join: ',' }}"
           data-series="{{ post.series | join: ',' }}">

        <article>
          <h3 class="post-item-title">
            <a href="{{ post.url }}">
              {{ post.title }}
            </a>
          </h3>
        </article>

      </div>
    {% endfor %}

  </div>

{% endfor %}
