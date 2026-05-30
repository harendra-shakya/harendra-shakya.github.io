---
title: Archive
permalink: /archive/
layout: page
excerpt: Archive for writings that unravel complex ideas and nurture mindful understanding.
description: Archive for writings that unravel complex ideas and nurture mindful understanding.
comments: false
---

{% assign all_posts = site.posts | concat: site.bhajans | concat: site.poetry | concat: site.insights | concat: site.sahitya | concat: site.avalokan | concat: site.evergreen | concat: site.mantra | concat: site.bodhkarya | concat: site.notes %}

<div class="search-article">
  <label for="search-input" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(128,128,128,0.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  </label>
  <input type="search" id="search-input" placeholder="Search by title, topic, or keyword" aria-label="Search">
</div>

<ul id="search-results"></ul>

<!-- Series Toggle -->
<div class="lang-toggle">
  <button class="filter-button selected" data-filter-type="series" data-filter-value="all" onclick="filterSeries('all')">All Series</button>

{% assign all_series = "" | split: "" %}
{% for post in all_posts %}
{% if post.series %}
{% if post.series.first %}
{% assign all_series = all_series | concat: post.series %}
{% else %}
{% assign all_series = all_series | push: post.series %}
{% endif %}
{% endif %}
{% endfor %}

{% assign all_series = all_series | uniq | sort %}
{% for series in all_series %}
{% unless series == "" %}
<button class="filter-button" data-filter-type="series" data-filter-value="{{ series | escape }}" onclick="filterSeries('{{ series | escape }}')">{{ series | escape }}</button>
{% endunless %}
{% endfor %}
</div>

<!-- Language Toggle -->
<div class="lang-toggle">
  <button class="filter-button selected" data-filter-type="lang" data-filter-value="all" onclick="filterLang('all')">All Languages</button>
  <button class="filter-button" data-filter-type="lang" data-filter-value="en" onclick="filterLang('en')">English</button>
  <button class="filter-button" data-filter-type="lang" data-filter-value="hi" onclick="filterLang('hi')">हिंदी</button>
</div>

<div>
  {% for item in all_posts %}
  <article class="random-item" hidden>
      Random: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

<!-- Post List Grouped by Year -->

{%- assign sorted_posts = all_posts | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for post in sorted_posts -%}
{%- capture current_year -%}{{ post.date | date: "%Y" }}{%- endcapture -%}
{%- unless current_year == previous_year -%}
<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

  <div class="post-block post-item"
       data-lang="{{ post.lang | default: 'en' }}"
       data-tags="{{ post.tags | join: ',' }}"
       data-series="{{ post.series | join: ',' }}"
       data-categories="{{ post.categories | join: ',' }}">
    <article>
      <h3 class="post-item-title">
        <a href="{{ post.url }}">{{ post.title | escape }}</a>
      </h3>
    </article>
  </div>
{%- endfor -%}
