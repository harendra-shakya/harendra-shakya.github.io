---
title: मेरी चतुष्पदियाँ
permalink: /poetry/
layout: page
excerpt: Concise, lyrical poetry capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical poetry capturing fleeting moments of clarity and wisdom.
comments: false
---

<!-- Poetry in Hindi is called "कविता" (kavita). -->
<!-- चतुष्पदी (chatushpadi) -->

{%- assign sorted_poetry = site.poetry | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for doha in sorted_poetry -%}
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
