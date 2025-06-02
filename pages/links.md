---
title: Links
permalink: /links/
layout: page
comments: false
---

<div class="linktree-container">
  {% for link in site.data.links %}
    {% if link.url and link.title %}
    <li>
      <a class="linktree-link" href="{{ link.url }}" target="_blank" rel="noopener">
        <span>{{ link.icon }}</span> {{ link.title }}
      </a>
    </li>
    {% endif %}
{% endfor %}
</div>

<!-- site links -->

<hr>
<h2>All Site Pages</h2>
<ul class="site-links">
  {% assign excluded_pages = "404.md" | split: "," %}
  {% for page in site.pages %}
    {% unless excluded_pages contains page.name or page.dir contains "_posts" or page.dir contains "_insights"  or page.title == nil %}
      <li>
        <a href="{{ page.url | relative_url }}">{{ page.title }}</a>
      </li>
    {% endunless %}
  {% endfor %}
</ul>

<!--
<h2>External GitHub Pages</h2>
<ul class="site-links">
  {% for page in site.data.external_pages %}
    <li>
      <a href="{{ page.url }}">{{ page.title }}</a>
    </li>
  {% endfor %}
</ul>
-->
