---
title: Tags
permalink: /tags/
layout: page
excerpt: Sorted article by tags.
---

<!-- - Advaita Vedanta
- Sankhya Dualism
- Patanjali’s Yoga Sutras
- Mimamsa
- Bhagavad Gita
- Karma
- Dharma
- Maya (Illusion)
- Pramana (Means of Knowledge)
- Logical Fallacies (Nyaya)
- Suffering (Dukkha)
- Meditation Techniques
- Confirmation Bias
- Heuristics
- First Principles
- Inversion
- Opportunity Cost
- Rationality
- Mental Model: Circle of Competence
- Cognitive Bias
- Sunk Cost Fallacy
- Socratic Method -->

<div class="archive-tags">
  <a class="tag-item" href="#">all</a>
  {%- for tag in site.tags -%} 
    {% capture name %}{{ tag | first }}{% endcapture %}
    <a class="tag-item" href="#{{name}}">{{ name }}</a> 
  {%- endfor -%}
</div>

{%- for tag in site.tags -%}
{%- capture name -%}{{ tag | first }}{%- endcapture -%}

  <h2 id="{{ name }}">{{ name | upcase }}</h2>
  {%- for post in site.tags[name] -%}
    <article class="post-item" id="results-container">
      <span class="post-item-date">{{ post.date | date: "%b %d, %Y" }}</span>
      <h3 class="post-item-title">
        <a href="{{ post.url }}">{{ post.title | escape }}</a>
      </h3> 
    </article>
  {%- endfor -%}
{%- endfor -%}
