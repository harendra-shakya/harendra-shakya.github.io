---
title: Tags
permalink: /tags/
layout: page
excerpt: Sorted articles by tags.
---

{% assign all_posts = site.posts | concat: site.bhajans | concat: site.poetry | concat: site.insights | concat: site.sahitya | concat: site.avalokan | concat: site.evergreen | concat: site.mantra | concat: site.bodhkarya %}

<!-- Tag Filter -->
<div class="archive-tags">
  <a class="tag-item" href="#all">All Tags</a>
  {% assign all_tags = all_posts | map: 'tags' | flatten | uniq %}
  {% for tag in all_tags %}
    <a class="tag-item" href="#{{ tag | downcase | slugify | escape }}">{{ tag | escape }}</a>
  {% endfor %}
</div>

<!-- Category Toggle -->
<div class="lang-toggle">
  <button class="filter-button" data-filter-type="category" data-filter-value="all" onclick="filterCategory('all')">All Categories</button>
  {% assign all_categories = all_posts | map: 'categories' | flatten | uniq %}
  {% for category in all_categories %}
    <button class="filter-button" data-filter-type="category" data-filter-value="{{ category | escape }}" onclick="filterCategory('{{ category | escape }}')">{{ category | escape }}</button>
  {% endfor %}
</div>

<!-- Language Toggle -->
<div class="lang-toggle">
  <button class="filter-button" data-filter-type="lang" data-filter-value="all" onclick="filterLang('all')">All</button>
  <button class="filter-button" data-filter-type="lang" data-filter-value="en" onclick="filterLang('en')">English</button>
  <button class="filter-button" data-filter-type="lang" data-filter-value="hi" onclick="filterLang('hi')">हिंदी</button>
</div>

<!-- Post Sections by Tag -->

{% assign all_tags = all_posts | map: 'tags' | flatten | uniq %}
{% for tag in all_tags %}

  <h2 id="{{ tag | downcase | slugify | escape }}">{{ tag | upcase }}</h2>
  
  <div class="tag-posts" id="tag-{{ tag | downcase | slugify | escape }}">
    {% assign posts_in_tag = all_posts | where: "tags", tag %}
    
    {% for post in posts_in_tag %}
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
