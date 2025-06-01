---
title: Quotes
permalink: /quotes/
layout: page
comments: false
---

<ul>
  {% for item in site.data.quotes %}
    <li>
      <blockquote>
        <p>"{{ item.quote }}"</p>
        <footer>— {{ item.by }}</footer>
      </blockquote>
    </li>
  {% endfor %}
</ul>
