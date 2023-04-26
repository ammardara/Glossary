"use strict";
//here can be replaced by a BE API
var keywords = [
    { keyword: "Usetiful", explanation: "Usetiful is a Digital Adoption Platform that clients embed into their digital products." },
    { keyword: "Hetzner", explanation: "Hetzner, the German hosting and cloud provider launched four new Hetzner Cloud servers" },
    { keyword: "customers", explanation: "Our business partners" },
    { keyword: "JS", explanation: "JavaScript(JS) is a programming language that is commonly used to create interactive effects within web browsers" }
];
function addKeyword(keyword, explanation) {
    keywords.push({ keyword: keyword, explanation: explanation });
    highlightKeywords(document.body);
}
function deleteKeyword(keyword) {
    var toBeDeleteKeyword = keywords.filter(function (k) { return k.keyword == keyword; });
    if (toBeDeleteKeyword.length = 1) {
        var keyword_explanation = toBeDeleteKeyword[0].explanation;
        keywords = keywords.filter(function (k) { return k.keyword !== keyword; });
        highlightKeywords(document.body);
        var elements_1 = document.querySelectorAll("span.usetiful_keyword[data-explanation=\"".concat(keyword_explanation, "\"]"));
        elements_1.forEach(function (element) {
            element.outerHTML = element.innerHTML;
        });
    }
}
function initKeywordsList() {
    var keywordsListElement = document.getElementById("keywords-list");
    if (!keywordsListElement)
        return;
    var _loop_1 = function (keyword) {
        var listItem = document.createElement("li");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteKeyword(keyword.keyword);
            listItem.remove();
        };
        listItem.textContent = "".concat(keyword.keyword, ": ").concat(keyword.explanation);
        listItem.appendChild(deleteButton);
        keywordsListElement.appendChild(listItem);
    };
    for (var _i = 0, keywords_1 = keywords; _i < keywords_1.length; _i++) {
        var keyword = keywords_1[_i];
        _loop_1(keyword);
    }
}
window.onload = function () {
    initKeywordsList();
    var addKeywordButton = document.getElementById("add-keyword-button");
    var keywordInput = document.getElementById("keyword-input");
    var explanationInput = document.getElementById("explanation-input");
    addKeywordButton.onclick = function () {
        var keyword = keywordInput.value.trim();
        var explanation = explanationInput.value.trim();
        if (!keyword || !explanation)
            return;
        addKeyword(keyword, explanation);
        var listItem = document.createElement("li");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteKeyword(keyword);
            listItem.remove();
        };
        listItem.textContent = "".concat(keyword, ": ").concat(explanation);
        listItem.appendChild(deleteButton);
        var keywordsListElement = document.getElementById("keywords-list");
        if (keywordsListElement)
            keywordsListElement.appendChild(listItem);
        keywordInput.value = "";
        explanationInput.value = "";
    };
};
var tooltipElement = document.createElement("div");
tooltipElement.classList.add("usetiful_tooltip");
document.body.appendChild(tooltipElement);
document.body.addEventListener("mouseover", function (event) {
    var target = event.target;
    if (target.classList.contains("usetiful_keyword")) {
        tooltipElement.textContent = target.getAttribute("data-explanation");
        tooltipElement.style.display = "block";
        tooltipElement.style.top = "".concat(target.getBoundingClientRect().bottom, "px");
        tooltipElement.style.left = "".concat(target.getBoundingClientRect().left, "px");
    }
});
document.body.addEventListener("mouseout", function (event) {
    var target = event.target;
    if (target.classList.contains("usetiful_keyword")) {
        tooltipElement.style.display = "none";
    }
});
var elements = document.querySelectorAll("*:not(script):not(style):not(head)");
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    var nodesToRemove = [];
    while (walker.nextNode()) {
        var node = walker.currentNode;
        var regex = new RegExp(keywords.map(function (k) { return "\\b".concat(k.keyword, "\\b"); }).join("|"), "gi");
        if (node.parentNode && node.textContent && regex.test(node.textContent)) {
            var newNode = document.createRange().createContextualFragment(node.textContent.replace(regex, function (match) {
                var found = keywords.find(function (k) { return k.keyword.toLowerCase() === match.toLowerCase(); });
                return found ? "<span class=\"usetiful_keyword\" data-explanation=\"".concat(found.explanation, "\">").concat(match, "</span>") : match;
            }));
            node.parentNode.replaceChild(newNode, node);
            nodesToRemove.push(node);
        }
    }
    nodesToRemove.forEach(function (node) { return node.remove(); });
}
function highlightKeywords(node) {
    var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
    var nodesToRemove = [];
    while (walker.nextNode()) {
        var node_1 = walker.currentNode;
        var regex = new RegExp(keywords.map(function (k) { return "\\b".concat(k.keyword, "\\b"); }).join("|"), "gi");
        if (node_1.parentNode && node_1.textContent && regex.test(node_1.textContent)) {
            var newNode = document.createRange().createContextualFragment(node_1.textContent.replace(regex, function (match) {
                var found = keywords.find(function (k) { return k.keyword.toLowerCase() === match.toLowerCase(); });
                return found ? "<span class=\"usetiful_keyword\" data-explanation=\"".concat(found.explanation, "\">").concat(match, "</span>") : match;
            }));
            node_1.parentNode.replaceChild(newNode, node_1);
            nodesToRemove.push(node_1);
        }
    }
    nodesToRemove.forEach(function (node) { return node.remove(); });
}
highlightKeywords(document.body);
// Get a reference to the button element
var button = document.getElementById("AddContent");
var dynamicContentText = document.getElementById("DynamicContent");
// Define the function to be executed on click
function addContent() {
    // Get the dynamic content from the input
    var dynamicContent = dynamicContentText.value.trim();
    // Create a new div element to hold the dynamic content
    var newDiv = document.createElement("div");
    // Add the dynamic content to the new div element
    newDiv.innerHTML = dynamicContent;
    // Highlight the keywords in the new div element
    highlightKeywords(newDiv);
    // Append the new div element to the body
    document.body.appendChild(newDiv);
}
// Attach the function to the onclick event of the button
button.onclick = addContent;
