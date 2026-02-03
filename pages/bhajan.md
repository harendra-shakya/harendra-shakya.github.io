---
title: Bhajans
permalink: /bhajans/
layout: page
excerpt: Concise, lyrical bhajans capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical bhajans capturing fleeting moments of clarity and wisdom.
comments: false
---

<!-- Tag Toggle -->
<div class="lang-toggle">
  <button class="filter-button" data-filter-type="tag" data-filter-value="all" onclick="filterTags('all')">all</button>
  {% assign all_tags = site.bhajans | map: 'tags' | flatten | uniq %}
  {% for tag in all_tags %}
    <button class="filter-button" data-filter-type="tag" data-filter-value="{{ tag | escape }}" onclick="filterTags('{{ tag | escape }}')">{{ tag | escape }}</button>
  {% endfor %}
</div>

{%- assign sorted_bhajans = site.bhajans | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for bhajan in sorted_bhajans -%}
{%- capture current_year -%}{{ bhajan.date | date: "%Y" }}{%- endcapture -%}
{%- unless current_year == previous_year -%}

<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

  <div class="post-block post-item" 
       data-lang="{{ bhajan.lang | default: 'en' }}" 
       data-tags="{{ bhajan.tags | join: ',' }}" 
       data-categories="{{ bhajan.categories | join: ',' }}">
    <article>
      <h3 class="post-item-title">
        <a href="{{ bhajan.url }}">{{ bhajan.title | escape }}</a>
      </h3>
    </article>
  </div>
{%- endfor -%}
