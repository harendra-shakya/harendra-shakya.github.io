---
title: Avalokan
permalink: /avalokan/
layout: page
excerpt: Concise, lyrical avalokan capturing fleeting moments of clarity and wisdom.
description: Concise, lyrical avalokan capturing fleeting moments of clarity and wisdom.
comments: false
---

<!-- Tag Toggle -->
<div class="lang-toggle">
  <button
    class="filter-button"
    data-filter-type="tag"
    data-filter-value="all"
    onclick="filterTags('all')"
  >
    All
  </button>

{% assign all_tags = site.avalokan | map: 'tags' | flatten | uniq %}
{% for tag in all_tags %}
<button
      class="filter-button"
      data-filter-type="tag"
      data-filter-value="{{ tag | escape }}"
      onclick="filterTags('{{ tag | escape }}')"
    >
{{ tag | escape }}
</button>
{% endfor %}

</div>

<!-- Series Toggle -->
<div class="lang-toggle">
  <button
    class="filter-button"
    data-filter-type="series"
    data-filter-value="all"
    onclick="filterSeries('all')"
  >
    All
  </button>

{% assign all_series = "" | split: "" %}
{% for post in site.avalokan %}
{% if post.series %}
{% if post.series.first %}
{% assign all_series = all_series | concat: post.series %}
{% else %}
{% assign all_series = all_series | push: post.series %}
{% endif %}
{% endif %}
{% endfor %}

{% assign all_series = all_series | uniq %}
{% for series in all_series %}
{% unless series == "" %}
<button
        class="filter-button"
        data-filter-type="series"
        data-filter-value="{{ series | escape }}"
        onclick="filterSeries('{{ series | escape }}')"
      >
{{ series | escape }}
</button>
{% endunless %}
{% endfor %}

</div>

<!-- Language Toggle -->
<div class="lang-toggle">
  <button
    class="filter-button"
    data-filter-type="lang"
    data-filter-value="all"
    onclick="filterLang('all')"
  >
    All
  </button>

<button
class="filter-button"
data-filter-type="lang"
data-filter-value="en"
onclick="filterLang('en')"

>

    English

  </button>

<button
class="filter-button"
data-filter-type="lang"
data-filter-value="hi"
onclick="filterLang('hi')"

>

    हिंदी

  </button>
</div>

<div>
  {% for item in site.avalokan %}
  <article class="random-item" hidden>
      Random: <a href="{{ item.url }}">{{ item.title }}</a>
  </article>
  {% endfor %}
</div>

{%- assign sorted_avalokan = site.avalokan | sort: "date" | reverse -%}
{%- assign previous_year = "" -%}

{%- for post in sorted_avalokan -%}
{%- capture current_year -%}{{ post.date | date: "%Y" }}{%- endcapture -%}

{%- unless current_year == previous_year -%}

<h2>{{ current_year }}</h2>
{%- assign previous_year = current_year -%}
{%- endunless -%}

  <div
    class="post-block post-item"
    data-lang="{{ post.lang | default: 'en' }}"
    data-tags="{{ post.tags | join: ',' }}"
    data-categories="{{ post.categories | join: ',' }}"
    data-series="{{ post.series | join: ',' }}"
  >
    <article>
      <h3 class="post-item-title">
        <a href="{{ post.url }}">
          {{ post.title | escape }}
        </a>
      </h3>
    </article>
  </div>
{%- endfor -%}
