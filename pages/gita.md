---
title: Bhagavad Gita
permalink: /gita/
layout: page
comments: false
---

<!-- Language Switcher -->
<div class="lang-toggle">
  <button onclick="switchLanguage('en')">English</button>
  <button onclick="switchLanguage('hi')">हिन्दी</button>
</div>

<!-- English Gita Content -->
<div id="gita-content-en" class="gita-content">
  {% assign chapters = site.data.gita.chapters %}
  {% assign verses = site.data.gita.verses %}
  {% assign translations_en = site.data.gita.translations | where: "authorName", "Swami Sivananda" %}

{% for chapter in chapters %}

  <details class="chapter-dropdown">
    <summary>
      <strong>{{ chapter.chapter_number }}. {{ chapter.name_translation }}</strong> ({{ chapter.name_meaning }})
    </summary>
    <div class="chapter-summary">
      <p>{{ chapter.chapter_summary }}</p>
    </div>
    <ul class="verses-list">
      {% for verse in verses %}
        {% if verse.chapter_id == chapter.id %}
          {% assign trans = translations_en | where: "verse_id", verse.id | first %}
          {% if trans %}
            <li>Verse {{ verse.verse_number }}: {{ trans.description }}</li>
          {% endif %}
        {% endif %}
      {% endfor %}
    </ul>
  </details>
  {% endfor %}
</div>

<!-- Hindi Gita Content -->
<div id="gita-content-hi" class="gita-content" style="display: none;">
  {% assign translations_hi = site.data.gita.translations | where: "authorName", "Swami Ramsukhdas" %}

{% for chapter in chapters %}

  <details class="chapter-dropdown">
    <summary>
      <strong>{{ chapter.chapter_number }}. {{ chapter.name }}</strong> ({{ chapter.name_meaning }})
    </summary>
    <div class="chapter-summary">
      <p>{{ chapter.chapter_summary_hindi }}</p>
    </div>
    <ul class="verses-list">
      {% for verse in verses %}
        {% if verse.chapter_id == chapter.id %}
          {% assign trans = translations_hi | where: "verse_id", verse.id | first %}
          {% if trans %}
            <li>श्लोक {{ verse.verse_number }}: {{ trans.description }}</li>
          {% endif %}
        {% endif %}
      {% endfor %}
    </ul>
  </details>
  {% endfor %}
</div>

<!-- JavaScript for Language Toggle -->
<script>
  function switchLanguage(lang) {
    const show = (id) => document.getElementById(id).style.display = 'block';
    const hide = (id) => document.getElementById(id).style.display = 'none';

    if (lang === 'hi') {
      hide('gita-content-en'); show('gita-content-hi');
      hide('title-en');        show('title-hi');
      hide('desc-en');         show('desc-hi');
    } else {
      show('gita-content-en'); hide('gita-content-hi');
      show('title-en');        hide('title-hi');
      show('desc-en');         hide('desc-hi');
    }
  }

  // Optional: persist language selection
  // You can also add: localStorage.setItem('lang', lang) and retrieve on load
</script>
