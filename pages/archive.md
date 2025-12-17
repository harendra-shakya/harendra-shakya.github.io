---
title: Archive
permalink: /archive/
layout: page
excerpt: Archive for writings that unravel complex ideas and nurture mindful understanding.
description: Archive for writings that unravel complex ideas and nurture mindful understanding.
comments: false
---

<div class="archive-container">
  <!-- Posts Section -->
  <div class="archive-column">
    <h2>Posts</h2>
    {%- assign previous_year = "" -%}
    {%- assign sorted_posts = site.posts | sort: 'date' | reverse -%} <!-- Correct sorting and reverse -->
    {%- for post in sorted_posts -%}
      {%- capture current_year -%}{{ post.date | date: "%Y" }}{%- endcapture -%}
      {%- unless current_year == previous_year -%}
        <h3>{{ current_year }}</h3>
        {%- assign previous_year = current_year -%}
      {%- endunless -%}

      <article class="post-item">
        <h4 class="post-item-title">
          <a href="{{ post.url }}">{{ post.title | escape }}</a>
        </h4>
      </article>
    {%- endfor -%}

  </div>

  <!-- Insights Section -->
  <div class="archive-column">
    <h2>Insights</h2>
    {%- assign previous_year = "" -%}
    {%- assign sorted_insights = site.insights | sort: 'date' | reverse -%} <!-- Correct sorting and reverse -->
    {%- for insight in sorted_insights -%}
      {%- capture current_year -%}{{ insight.date | date: "%Y" }}{%- endcapture -%}
      {%- unless current_year == previous_year -%}
        <h3>{{ current_year }}</h3>
        {%- assign previous_year = current_year -%}
      {%- endunless -%}

      <article class="post-item">
        <h4 class="post-item-title">
          <a href="{{ insight.url }}">{{ insight.title | escape }}</a>
        </h4>
      </article>
    {%- endfor -%}

  </div>

  <!-- Bhajans Section -->
  <div class="archive-column">
    <h2>Bhajans</h2>
    {%- assign previous_year = "" -%}
    {%- assign sorted_bhajans = site.bhajans | sort: 'date' | reverse -%} <!-- Correct sorting and reverse -->
    {%- for bhajan in sorted_bhajans -%}
      {%- capture current_year -%}{{ bhajan.date | date: "%Y" }}{%- endcapture -%}
      {%- unless current_year == previous_year -%}
        <h3>{{ current_year }}</h3>
        {%- assign previous_year = current_year -%}
      {%- endunless -%}

      <article class="post-item">
        <h4 class="post-item-title">
          <a href="{{ bhajan.url }}">{{ bhajan.title | escape }}</a>
        </h4>
      </article>
    {%- endfor -%}

  </div>

  <!-- Poetry Section -->
  <div class="archive-column">
    <h2>Poetry</h2>
    {%- assign previous_year = "" -%}
    {%- assign sorted_dohe = site.poetry | sort: 'date' | reverse -%} <!-- Correct sorting and reverse -->
    {%- for doha in sorted_dohe -%}
      {%- capture current_year -%}{{ doha.date | date: "%Y" }}{%- endcapture -%}
      {%- unless current_year == previous_year -%}
        <h3>{{ current_year }}</h3>
        {%- assign previous_year = current_year -%}
      {%- endunless -%}

      <article class="post-item">
        <h4 class="post-item-title">
          <a href="{{ doha.url }}">{{ doha.title | escape }}</a>
        </h4>
      </article>
    {%- endfor -%}

  </div>
</div>
