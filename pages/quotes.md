---
title: Quotes
permalink: /quotes/
layout: page
excerpt: "Timeless quotes from great thinkers, offering insight and inspiration for mindful living"
description: "Timeless quotes from great thinkers, offering insight and inspiration for mindful living"
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
