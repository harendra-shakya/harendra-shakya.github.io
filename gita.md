---
title: Bhagavad Gita
permalink: /gita
layout: page
comments: false
---

<div class="chapters-list">
  {% assign chapters = site.data.gita.chapters %} {% assign verses = site.data.gita.verses
  %} {% assign translations = site.data.gita.translations | where: "authorName",
  "Swami Sivananda" %} {% for chapter in chapters %}
  <details class="chapter-dropdown">
    <summary>
      <strong
        >{{ chapter.chapter_number }}. {{ chapter.name_translation }}</strong
      >
      ({{ chapter.name_meaning }})
    </summary>
    <div class="chapter-summary">
      <p>{{ chapter.chapter_summary }}</p>
    </div>

    <ul class="verses-list">
      {% for verse in verses %} {% if verse.chapter_id == chapter.id %} {%
      assign trans = translations | where: "verse_id", verse.id | first %} {% if
      trans %}
      <li>Verse {{ verse.verse_number }}: {{ trans.description }}</li>
      {% endif %} {% endif %} {% endfor %}
    </ul>

  </details>
  {% endfor %}
</div>
