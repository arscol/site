(function () {
  const nameElement = document.getElementById("animated-name");
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";

  if (!isHomePage) {
    return;
  }

  function splitLetters() {
    nameElement.textContent = "carlos";
    const text = nameElement.textContent.trim();
    nameElement.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");

      span.className = "letter";
      span.textContent = text[i];
      span.style.order = i;

      nameElement.appendChild(span);
    }
  }

  function rearrangeLetters() {
    const letters = Array.from(nameElement.querySelectorAll(".letter"));
    const newOrder = [3, 0, 1, 5, 4, 2];
    const firstRects = letters.map((l) => l.getBoundingClientRect());

    letters.forEach((letter, i) => {
      const targetIndex = newOrder[i];
      const dx = firstRects[targetIndex].left - firstRects[i].left;
      const dy = firstRects[targetIndex].top - firstRects[i].top;

      letter.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    setTimeout(() => {
      const fragment = document.createDocumentFragment();

      for (let pos = 0; pos < newOrder.length; pos++) {
        const idx = newOrder.indexOf(pos);
        const node = letters[idx];
        node.style.transform = "";
        node.style.order = "";
        fragment.appendChild(node);
      }

      nameElement.appendChild(fragment);
    }, 1100);
  }

  splitLetters();

  setTimeout(() => {
    rearrangeLetters();
  }, 500);
})();
