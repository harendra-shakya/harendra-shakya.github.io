document.addEventListener("DOMContentLoaded", function () {
  console.log("Wiki script loaded");

  const contentDiv = document.querySelector('[itemprop="articleBody"]');
  if (!contentDiv) return;

  function createSlug(text) {
    return text
      .toLowerCase()
      .normalize("NFC")
      .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "") // removed comma from slug
      .trim()
      .replace(/\s+/g, "-");
  }

  function shouldSkip(node) {
    return (
      node.closest &&
      (node.closest("a") ||
        node.closest("code") ||
        node.closest("pre") ||
        node.closest(".highlight"))
    );
  }

  function processNode(node) {
    if (shouldSkip(node)) return;

    // TEXT NODE
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const regex = /\[\[([^\]]+)\]\]/g;

      if (!regex.test(text)) return;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      regex.lastIndex = 0;

      let match;
      while ((match = regex.exec(text)) !== null) {
        const fullMatch = match[0];
        const innerText = match[1].trim();

        // Add text before match
        if (match.index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex, match.index)),
          );
        }

        const link = document.createElement("a");

        /* --------------------------
           External Link [[Title::URL]]
        ---------------------------*/
        if (innerText.includes("::")) {
          const parts = innerText.split("::");
          const title = parts[0].trim();
          const url = parts[1].trim();

          link.href = url;
          link.textContent = title;
          link.target = "_blank";
          link.rel = "noopener";
          link.className = "external-link";
        } else {
          /* --------------------------
           Internal Link
        ---------------------------*/
          // [[Page|Custom]]
          const parts = innerText.split("|");
          const pagePart = parts[0].trim();
          const displayText = parts[1] ? parts[1].trim() : pagePart;

          // [[Page#section]]
          const anchorSplit = pagePart.split("#");
          const pageName = anchorSplit[0].trim();
          const anchor = anchorSplit[1];

          const slug = createSlug(pageName);

          let url = "/" + slug + "/";

          if (anchor) {
            url += "#" + createSlug(anchor);
          }

          link.href = url;
          link.textContent = displayText;
          link.className = "wiki-link";
        }

        fragment.appendChild(link);
        lastIndex = match.index + fullMatch.length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      node.parentNode.replaceChild(fragment, node);
    }

    // ELEMENT NODE
    else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(processNode);
    }
  }

  processNode(contentDiv);
});
