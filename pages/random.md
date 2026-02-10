---
layout: page
title: Random
permalink: /random/
---

<div id="random-pool">
  {% for item in site.insights %}
  <article class="random-item insights" hidden>
    <h2>{{ item.title }}</h2>
    {{ item.content }}
  </article>
  {% endfor %} {% for item in site.poetry %}
  <article class="random-item poetry" hidden>
    <h2>{{ item.title }}</h2>
    {{ item.content }}
  </article>
  {% endfor %} {% for item in site.evergreen %}
  <article class="random-item evergreen" hidden>
    <h2>{{ item.title }}</h2>
    {{ item.content }}
  </article>
  {% endfor %}
</div>

<!-- {% assign all_posts = site.posts | concat: site.bhajans | concat: site.poetry | concat: site.insights | concat: site.sahitya | concat: site.avalokan | concat: site.evergreen | concat: site.mantra %}

<div>
  {% for item in site.bhajans %}
  <article class="random-item" hidden>
      Random Bhajan: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

<div>
  {% for item in site.poetry %}
  <article class="random-item" hidden>
      Random Poetry: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

<div>
  {% for item in site.insights %}
  <article class="random-item" hidden>
      Random Insight: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

<div>
  {% for item in site.sahitya %}
  <article class="random-item" hidden>
      Random Wisdom Literature: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

<div>
  {% for item in site.avalokan %}
  <article class="random-item" hidden>
      Random Avalokan: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

<div>
  {% for item in site.evergreen %}
  <article class="random-item" hidden>
      Random Evergreen Note: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

<div>
  {% for item in all_posts %}
  <article class="random-item" hidden>
      Random All: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div> -->
