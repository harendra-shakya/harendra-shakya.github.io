---
title: Dohe
permalink: /dohe/
layout: page
excerpt: Concise, lyrical dohe capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical dohe capturing fleeting moments of clarity and wisdom.
comments: false
---

{%- assign sorted_dohe = site.dohe | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for doha in sorted_dohe -%}
{%- capture current_year -%}{{ doha.date | date: "%Y" }}{%- endcapture -%}
{%- unless current_year == previous_year -%}

<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

  <article class="post-item">
    <h3 class="post-item-title">
      <a href="{{ doha.url }}">{{ doha.title | escape }}</a>
    </h3> 
  </article>
{%- endfor -%}
