---
title: Media I like
permalink: /media/
layout: page
description: Media that I like
comments: false
---

{% for category in site.data.media %}

  <h2>{{ category[0] | capitalize }}</h2>
  <ul>
    {% for item in category[1] %}
      <li><a href="{{ item.url }}" target="_blank" rel="noopener">{{ item.title }} </a></li>
    {% endfor %}
  </ul>
{% endfor %}
