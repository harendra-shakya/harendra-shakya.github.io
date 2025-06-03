---
title: Insights
permalink: /insights/
layout: page
excerpt: Concise, lyrical insights capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical insights capturing fleeting moments of clarity and wisdom.
comments: false
---

{% for insight in site.insights %}
<a href="{{ insight.url }}">{{ insight.title }}</a> – {{ insight.date | date:
"%b %d, %Y" }} {% endfor %}
