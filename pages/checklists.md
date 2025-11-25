---
title: Checklists
layout: page
permalink: /checklists/
---

{%- assign sorted_checklists = site.checklists | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for checklist in sorted_checklists -%}
{%- capture current_year -%}{{ checklist.date | date: "%Y" }}{%- endcapture -%}
{%- unless current_year == previous_year -%}

<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

  <article class="post-item">
    <h3 class="post-item-title">
      <a href="{{ checklist.url }}">{{ checklist.title | escape }}</a>
    </h3> 
  </article>
{%- endfor -%}
