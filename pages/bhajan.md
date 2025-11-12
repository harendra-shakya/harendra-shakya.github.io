---
title: Bhajans
permalink: /bhajans/
layout: page
excerpt: Concise, lyrical bhajans capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical bhajans capturing fleeting moments of clarity and wisdom.
comments: false
---

{%- assign sorted_bhajans = site.bhajans | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for bhajan in sorted_bhajans -%}
{%- capture current_year -%}{{ bhajan.date | date: "%Y" }}{%- endcapture -%}
{%- unless current_year == previous_year -%}

<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

  <article class="post-item">
    <h3 class="post-item-title">
      <a href="{{ bhajan.url }}">{{ bhajan.title | escape }}</a>
    </h3> 
  </article>
{%- endfor -%}
