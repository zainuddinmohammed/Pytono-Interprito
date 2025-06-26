const resizer = document.getElementById('resizer');
const left = document.getElementById('editor-pane');
const right = document.getElementById('output-pane');
let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  document.body.style.cursor = 'col-resize';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const offsetLeft = e.clientX;
  const containerWidth = document.getElementById('main').offsetWidth;
  const newLeftWidth = (offsetLeft / containerWidth) * 100;

  // Apply limits
  if (newLeftWidth > 20 && newLeftWidth < 80) {
    left.style.width = `${newLeftWidth}%`;
  }
});

document.addEventListener('mouseup', () => {
  isResizing = false;
  document.body.style.cursor = 'default';
});

require.config({ paths: { vs: "https://unpkg.com/monaco-editor@0.44.0/min/vs" } });
require(["vs/editor/editor.main"], async function () {

  // 1. Fetch categorized translation data from the backend
  const res = await fetch("http://127.0.0.1:5000/translations");
  const categories = await res.json();

  // 2. Map category to Monaco token types
  const categoryToToken = {
    "Conditionals": "keyword",
    "Exceptions": "keyword",
    "Functions": "function",
    "Input/Output": "function",
    "Logic Operators": "keyword",
    "Loops": "keyword"
  };

  const tokenRules = [];

  // 3. Dynamically construct tokenizer rules based on categories
  for (const [category, keywords] of categories) {
    const tokenType = categoryToToken[category] || "keyword"; // default fallback
    for (const word of Object.keys(keywords)) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape for regex
      tokenRules.push([new RegExp(`\\b${escaped}\\b`), tokenType]);
    }
  }

  // 4. Add default rules (identifiers, numbers, etc.)
  tokenRules.push(
    [/[a-zA-Z_]\w*/, "identifier"],
    [/\d+/, "number"],
    [/"[^"]*"|'[^']*'/, "string"],
    [/[(){}\[\]:]/, "delimiter"]
  );

  // 5. Register language and theme
  monaco.languages.register({ id: "brainrot" });

  monaco.languages.setMonarchTokensProvider("brainrot", {
    tokenizer: {
      root: tokenRules
    }
  });

  monaco.editor.defineTheme("brainrotTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "ff79c6" },
      { token: "function", foreground: "8be9fd" },
      { token: "number", foreground: "bd93f9" },
      { token: "string", foreground: "f1fa8c" }
    ],
    colors: {
      "editor.foreground": "#ffffff",
      "editor.background": "#1e1e1e"
    }
  });

  // 6. Create editor
  window.editor = monaco.editor.create(document.getElementById("container"), {
    value: `x = 10\nratatata x > 5:\n    tralala("ok")`,
    language: "brainrot",
    theme: "brainrotTheme",
    automaticLayout: true
  });

  // 7. Bind Run button
  document.getElementById("runButton").addEventListener("click", async () => {
    const code = window.editor.getValue();
    const inputs = [];

    // Match both: input("...") and tralalelo("..."), with or without prompt text
    const inputMatches = [...code.matchAll(/\b(?:input|tralalelo)\s*\(\s*(?:"([^"]*)"|'([^']*)')?\s*\)/g)];

    for (const match of inputMatches) {
      const promptText = match[1] || match[2] || "";
      const inputVal = prompt(promptText);
      inputs.push(inputVal);
    }

    const response = await fetch("http://127.0.0.1:5000/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, inputs })
    });

    const data = await response.json();
    document.getElementById("output").textContent = data.output || "";
  });

  // 8. Ctrl+Enter binding
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      document.getElementById("runButton").click();
    }
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    document.getElementById("runButton").click();
  });
});

document.getElementById("infoButton").addEventListener("click", async () => {
  const modal = document.getElementById("translationModal");
  const list = document.getElementById("translationList");

  const response = await fetch("http://127.0.0.1:5000/translations");
  const groupedTranslations = await response.json();

  // Clear old content
  list.innerHTML = "";

  for (const [category, mappings] of groupedTranslations) {
    const categoryHeader = document.createElement("h3");
    categoryHeader.textContent = category;
    categoryHeader.style.marginTop = "15px";
    list.appendChild(categoryHeader);

    const ul = document.createElement("ul");
    ul.style.paddingLeft = "20px";

    for (const [brainrot, py] of Object.entries(mappings)) {
      const item = document.createElement("li");
      item.textContent = `"${brainrot}" → ${py}`;
      ul.appendChild(item);
    }

    list.appendChild(ul);
  }

  modal.style.display = "flex";
});

document.querySelector(".close").onclick = () => {
  document.getElementById("translationModal").style.display = "none";
};

window.onclick = (event) => {
  const modal = document.getElementById("translationModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.getElementById('min-btn').addEventListener('click', () => {
  window.electronAPI.minimize();
});

document.getElementById('max-btn').addEventListener('click', () => {
  window.electronAPI.maximize();
});

document.getElementById('close-btn').addEventListener('click', () => {
  window.electronAPI.close();
});
