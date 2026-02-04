---
title: Categories
permalink: /categories/
layout: page
excerpt: Sorted articles by categories.
---

{% assign all_posts = site.posts | concat: site.bhajans | concat: site.poetry | concat: site.insights | concat: site.sahitya | concat: site.avalokan %}

<!-- Category Filter -->
<div class="archive-categories">
  <a class="category-item" href="#all">All Categories</a>
  {% assign all_categories = all_posts | map: 'categories' | flatten | uniq %}
  {% for category in all_categories %}
    <a class="category-item" href="#{{ category | downcase | slugify | escape }}">{{ category | escape }}</a>
  {% endfor %}
</div>

<!-- Tag Toggle -->
<div class="lang-toggle">
  <button class="filter-button" data-filter-type="tag" data-filter-value="all" onclick="filterTags('all')">All</button>
  {% assign all_tags = all_posts | map: 'tags' | flatten | uniq %}
  {% for tag in all_tags %}
    <button class="filter-button" data-filter-type="tag" data-filter-value="{{ tag | escape }}" onclick="filterTags('{{ tag | escape }}')">{{ tag | escape }}</button>
  {% endfor %}
</div>

<!-- Language Toggle -->
<div class="lang-toggle">
  <button class="filter-button" data-filter-type="lang" data-filter-value="all" onclick="filterLang('all')">All</button>
  <button class="filter-button" data-filter-type="lang" data-filter-value="en" onclick="filterLang('en')">English</button>
  <button class="filter-button" data-filter-type="lang" data-filter-value="hi" onclick="filterLang('hi')">हिंदी</button>
</div>

<!-- Post Sections by Category -->

{% assign all_categories = all_posts | map: 'categories' | flatten | uniq %}
{% for category in all_categories %}

  <h2 id="{{ category | downcase | slugify | escape }}">{{ category | upcase }}</h2>
  
  <div class="category-posts" id="category-{{ category | downcase | slugify | escape }}">
    {% assign posts_in_category = all_posts | where: "categories", category %}
    
    {% for post in posts_in_category %}
      <div class="post-block post-item"
           data-lang="{{ post.lang | default: 'en' }}"
           data-tags="{{ post.tags | join: ',' }}"
           data-categories="{{ post.categories | join: ',' }}">
        <article>
          <h3 class="post-item-title">
            <a href="{{ post.url }}">{{ post.title | escape }}</a>
          </h3>
        </article>
      </div>
    {% endfor %}
  </div>
{% endfor %}
