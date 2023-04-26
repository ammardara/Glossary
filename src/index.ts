interface Node {
  remove(): void;
}
//here can be replaced by a BE API
let keywords = [
  { keyword: "Usetiful", explanation: "Usetiful is a Digital Adoption Platform that clients embed into their digital products." },
  { keyword: "Hetzner", explanation: "Hetzner, the German hosting and cloud provider launched four new Hetzner Cloud servers" },
  { keyword: "customers", explanation: "Our business partners" },
  { keyword: "JS", explanation: "JavaScript(JS) is a programming language that is commonly used to create interactive effects within web browsers" }
];

function addKeyword(keyword: string, explanation: string) {
  keywords.push({ keyword, explanation });
  highlightKeywords(document.body);
}

function deleteKeyword(keyword: string) {
  let toBeDeleteKeyword=keywords.filter(k => k.keyword == keyword);
  if(toBeDeleteKeyword.length=1){
    let keyword_explanation=toBeDeleteKeyword[0].explanation;
  keywords = keywords.filter(k => k.keyword !== keyword);
  highlightKeywords(document.body);
  const elements = document.querySelectorAll(`span.usetiful_keyword[data-explanation="${keyword_explanation}"]`);
  elements.forEach((element: Element) => {
    element.outerHTML = element.innerHTML;
  });
  }

}

function initKeywordsList() {
  const keywordsListElement = document.getElementById("keywords-list");
  if (!keywordsListElement) return;

  for (const keyword of keywords) {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      deleteKeyword(keyword.keyword);
      listItem.remove();
    };
    listItem.textContent = `${keyword.keyword}: ${keyword.explanation}`;
    listItem.appendChild(deleteButton);
    keywordsListElement.appendChild(listItem);
  }
}

window.onload = () => {
  initKeywordsList();

  const addKeywordButton = document.getElementById("add-keyword-button") as HTMLButtonElement;
  const keywordInput = document.getElementById("keyword-input") as HTMLInputElement;
  const explanationInput = document.getElementById("explanation-input") as HTMLInputElement;

  addKeywordButton.onclick = () => {
    const keyword = keywordInput.value.trim();
    const explanation = explanationInput.value.trim();
    if (!keyword || !explanation) return;

    addKeyword(keyword, explanation);

    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      deleteKeyword(keyword);
      listItem.remove();
    };
    listItem.textContent = `${keyword}: ${explanation}`;
    listItem.appendChild(deleteButton);
    const keywordsListElement = document.getElementById("keywords-list");
    if (keywordsListElement) keywordsListElement.appendChild(listItem);

    keywordInput.value = "";
    explanationInput.value = "";
  };
};

const tooltipElement = document.createElement("div");
tooltipElement.classList.add("usetiful_tooltip");
document.body.appendChild(tooltipElement);

document.body.addEventListener("mouseover", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("usetiful_keyword")) {
    tooltipElement.textContent = target.getAttribute("data-explanation");
    tooltipElement.style.display = "block";
    tooltipElement.style.top = `${target.getBoundingClientRect().bottom}px`;
    tooltipElement.style.left = `${target.getBoundingClientRect().left}px`;
  }
});

document.body.addEventListener("mouseout", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("usetiful_keyword")) {
    tooltipElement.style.display = "none";
  }
});

const elements = document.querySelectorAll("*:not(script):not(style):not(head)");

for (let i = 0; i < elements.length; i++) {
  const element = elements[i];

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null as NodeFilter | null);

  const nodesToRemove: Node[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;

    const regex = new RegExp(keywords.map((k) => `\\b${k.keyword}\\b`).join("|"), "gi");

    if (node.parentNode && node.textContent && regex.test(node.textContent)) {
      const newNode = document.createRange().createContextualFragment(
        node.textContent.replace(regex, (match) => {
          const found = keywords.find((k) => k.keyword.toLowerCase() === match.toLowerCase());
          return found ? `<span class="usetiful_keyword" data-explanation="${found.explanation}">${match}</span>` : match;
        })
      );

      node.parentNode.replaceChild(newNode, node);
      nodesToRemove.push(node);
    }
  }

  nodesToRemove.forEach(node => node.remove());
}

function highlightKeywords(node: Node) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null as NodeFilter | null);
  const nodesToRemove: Node[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const regex = new RegExp(keywords.map((k) => `\\b${k.keyword}\\b`).join("|"), "gi");

    if (node.parentNode && node.textContent && regex.test(node.textContent)) {
      const newNode = document.createRange().createContextualFragment(
        node.textContent.replace(regex, (match) => {
          const found = keywords.find((k) => k.keyword.toLowerCase() === match.toLowerCase());
          return found ? `<span class="usetiful_keyword" data-explanation="${found.explanation}">${match}</span>` : match;
        })
      );
	  node.parentNode.replaceChild(newNode, node);
      nodesToRemove.push(node);
    }
  }

  nodesToRemove.forEach(node => node.remove());
}

highlightKeywords(document.body);
// Get a reference to the button element
const button = document.getElementById("AddContent") as HTMLButtonElement;
const dynamicContentText = document.getElementById("DynamicContent") as HTMLButtonElement;
// Define the function to be executed on click
function addContent() {
   // Get the dynamic content from the input
  const dynamicContent = dynamicContentText.value.trim();
  
  // Create a new div element to hold the dynamic content
  const newDiv = document.createElement("div");
  
  // Add the dynamic content to the new div element
  newDiv.innerHTML = dynamicContent;
  
  // Highlight the keywords in the new div element
  highlightKeywords(newDiv);
  
  // Append the new div element to the body
  document.body.appendChild(newDiv);
  
}

// Attach the function to the onclick event of the button
button.onclick = addContent;