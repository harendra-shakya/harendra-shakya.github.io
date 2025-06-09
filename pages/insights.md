---
title: Insights
permalink: /insights/
layout: page
excerpt: Concise, lyrical insights capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical insights capturing fleeting moments of clarity and wisdom.
comments: false
---

{%- assign sorted_insights = site.insights | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for insight in sorted_insights -%}
{%- capture current_year -%}{{ insight.date | date: "%Y" }}{%- endcapture -%}
{%- unless current_year == previous_year -%}
<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

  <article class="post-item">
    <h3 class="post-item-title">
      <a href="{{ insight.url }}">{{ insight.title | escape }}</a>
    </h3> 
  </article>
{%- endfor -%}
