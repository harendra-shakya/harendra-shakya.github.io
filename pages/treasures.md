---
title: Treasures of Media & Literature
permalink: /treasures/
layout: page
description: A curated collection of treasured media, classic literature, legendary characters, and spiritual icons. Discover the stories and figures that continue to inspire across time, culture, and genre.
comments: false
---

{% for category in site.data.treasures %}

  <h2>{{ category[0] | capitalize }}</h2>
  <ul>
    {% for item in category[1] %}
      <li><a href="{{ item.url }}" target="_blank" rel="noopener">{{ item.title }} </a></li>
    {% endfor %}
  </ul>
{% endfor %}
