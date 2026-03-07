function getValueFromInput(id) {
    const input = document.getElementById(id);
    const value = input.value;
    return value;
}

function getContentFromElement(id) {
    const element = document.getElementById(id);
    const textContent = element.textContent;
    return textContent;
}