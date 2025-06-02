---
title: Insights
permalink: /insights/
layout: page
comments: false
---

{% for insight in site.insights %}
<a href="{{ insight.url }}">{{ insight.title }}</a> – {{ insight.date | date:
"%b %d, %Y" }} {% endfor %}
