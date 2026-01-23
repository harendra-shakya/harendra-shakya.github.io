---
title: Sahitya
permalink: /sahitya/
layout: page
excerpt: Concise, lyrical sahitya capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical sahitya capturing fleeting moments of clarity and wisdom.
comments: false
---

{%- assign sorted_sahitya = site.sahitya | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for post in sorted_sahitya -%}
{%- capture current_year -%}{{ post.date | date: "%Y" }}{%- endcapture -%}
{%- unless current_year == previous_year -%}

<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

  <article class="post-item">
    <h3 class="post-item-title">
      <a href="{{ post.url }}">{{ post.title | escape }}</a>
    </h3> 
  </article>
{%- endfor -%}
