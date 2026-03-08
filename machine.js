// Scope ==> Common Variable Scope

const allTab = document.getElementById('all-issue-card');
const openTab = document.getElementById('open-issue-card');
const closedTab = document.getElementById('close-issue-card');


// Scope ==> Common Function Scope

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

function removeActive() {
    allTab.classList.remove('btn-primary');
    openTab.classList.remove('btn-primary');
    closedTab.classList.remove('btn-primary');

    allTab.classList.add('text-[#64748B]');
    openTab.classList.add('text-[#64748B]');
    closedTab.classList.add('text-[#64748B]');
}