---
title: Evergreen Notes
permalink: /evergreen/
layout: page
excerpt: Concise, lyrical evergreen capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical evergreen capturing fleeting moments of clarity and wisdom.
comments: false
---

<!-- Language Toggle -->
<div class="lang-toggle">
  <button class="filter-button" data-filter-type="lang" data-filter-value="all" onclick="filterLang('all')">All</button>
  <button class="filter-button" data-filter-type="lang" data-filter-value="en" onclick="filterLang('en')">English</button>
  <button class="filter-button" data-filter-type="lang" data-filter-value="hi" onclick="filterLang('hi')">हिंदी</button>
</div>

<div>
  {% for item in site.evergreen %}
  <article class="random-item" hidden>
      Random: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

{%- assign sorted_evergreen = site.evergreen | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for post in sorted_evergreen -%}
{%- capture current_year -%}{{ post.date | date: "%Y" }}{%- endcapture -%}
{%- unless current_year == previous_year -%}

<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

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
{%- endfor -%}
