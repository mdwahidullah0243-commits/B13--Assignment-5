const cardContainer = document.getElementById('issue-cards-container');
const totalIssueCard = document.getElementById('count-issue-card');
let currentStatus = 'all-issue-card';

window.addEventListener('DOMContentLoaded', function() {
    loadAllIssueCard();
})

function toggleStyle(id) {
    currentStatus = id;

    const allTab = document.getElementById('all-issue-card');
    const openTab = document.getElementById('open-issue-card');
    const closedTab = document.getElementById('close-issue-card');

    allTab.classList.remove('btn-primary');
    openTab.classList.remove('btn-primary');
    closedTab.classList.remove('btn-primary');

    allTab.classList.add('text-[#64748B]');
    openTab.classList.add('text-[#64748B]');
    closedTab.classList.add('text-[#64748B]');

    // condition matching clickable tab btn
    if (currentStatus === 'open-issue-card') {
        openTab.classList.add('btn-primary');
        openTab.classList.remove('text-[#64748B]');

        loadAllIssueCard();
        
    } else if (currentStatus === 'close-issue-card') {
        closedTab.classList.add('btn-primary');
        closedTab.classList.remove('text-[#64748B]');

        loadAllIssueCard();
        
    } else if (currentStatus === 'all-issue-card') {
        allTab.classList.add('btn-primary');
        allTab.classList.remove('text-[#64748B]');

        loadAllIssueCard();
    }
}

// load all issue card data
async function loadAllIssueCard() {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

    const res = await fetch(url);
    const data = await res.json();

    // console.log(data);

    displayIssueCard(data.data);
}

// load details card for modal purpose
async function loadDetails(id, shortDate) {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    const res = await fetch(url);
    const data = await res.json();

    displayDetails(data.data, shortDate);
}

// display card details with modal 
function displayDetails(details, shortDate) {
    const issueDetails = document.getElementById('issue-details');
    const modalContentBox = document.getElementById('modal-content');

    let statusClass = '';

    if (details.status === 'open') {
        statusClass = `bg-[#00A96E]`;
    } else {
        statusClass = `bg-[#EF4444]`;
    }

    let priorityClass = '';

    if (details.priority === 'high') {
        priorityClass = `bg-[#FEECEC] text-[#EF4444]`;
    } else if (details.priority === 'medium') {
        priorityClass = `bg-[#FFF6D1] text-[#F59E0B]`;
    } else {
        priorityClass = `text-[#9CA3AF] bg-[#EEEFF2]`;
    }

    modalContentBox.innerHTML = `
        <!-- content: 1 -->
        <div class="space-y-2">
            <h2 class="text-2xl text-[#1F2937] font-bold">
                ${details.title}
            </h2>
            <div class="text-[#64748B] font-normal flex items-center gap-2">
                <span class="${statusClass} px-3 py-1 rounded-xl text-base text-[#FFFFFF] font-medium">${details.status === 'open' ? 'Opened' : 'Closed'}</span>
                <span class="text-[5px] text-[#64748B]"><i class="fa-solid fa-circle"></i></span>
                ${details.status === 'open' ? 'Opened' : 'Closed'} by ${details.author}
                <span class="text-[5px] text-[#64748B]"><i class="fa-solid fa-circle"></i></span>
                ${shortDate}
            </div>
        </div>

        <!-- content: 2 -->
        <div class="label-container flex flex-wrap gap-3">
            
        </div>

        <!-- content: 3 -->
        <div>
            <p class="text-[#64748B] text-lg">
                ${details.description}
            </p>
        </div>

        <!-- content: 4 -->
        <div class="bg-[#F8FAFC] p-5 rounded-lg flex gap-20">
            <div class="space-y-1">
                <h3 class="text-[#64748B] text-xl">Assignee:</h3>
                <h2 class="text-[#1F2937] text-lg font-semibold">${details.assignee ? details.assignee : 'NOT FOUND'}</h2>
            </div>

            <div class="space-y-1">
                <h3 class="text-[#64748B] text-xl">Priority:</h3>
                <span class="${priorityClass} text-lg font-medium rounded-2xl px-5 py-1">
                    ${details.priority.toUpperCase()}
                </span>
            </div>
        </div>
    `;

    const labelContainer = modalContentBox.querySelector('.label-container');
    showModalLabel(labelContainer);

    function showModalLabel(element) {
        element.innerHTML = '';

        details.labels.forEach(label => {
            if (label === 'bug') {
                const div = document.createElement('div');
                div.className = 'badge badge-outline badge-error text-sm font-medium h-auto py-1'
                div.innerHTML = `
                        <span><i class="fa-solid fa-bug"></i></span>
                        <span>BUG</span>
                    `;

                element.appendChild(div);

            } else if (label === 'help wanted') {
                const div = document.createElement('div');
                div.className = 'badge badge-outline badge-warning h-auto text-sm font-medium py-1'
                div.innerHTML = `
                        <span><i class="fa-solid fa-life-ring"></i></span>
                        <span>HELP WANTED</span>
                    `;

                element.appendChild(div);

            } else if (label === 'enhancement') {
                const div = document.createElement('div');
                div.className = 'badge badge-outline badge-accent h-auto text-sm font-medium py-1'
                div.innerHTML = `
                        <span><img src="./assets/Sparkle.png"></span>
                        <span>ENHANCEMENT</span>
                    `;

                element.appendChild(div);

            } else if (label === 'good first issue') {
                const div = document.createElement('div');
                div.className = 'badge badge-outline badge-info h-auto text-sm font-medium py-1'
                div.innerHTML = `
                        <span><i class="fa-solid fa-circle-check"></i></span>
                        <span>GOOD FIRST ISSUE</span>
                    `;

                element.appendChild(div);

            } else if (label === 'documentation') {
                // <div class="">Primary</div>
                const div = document.createElement('div');
                div.className = 'badge badge-soft badge-primary h-auto text-sm font-medium py-1'
                div.innerHTML = `
                        <span><i class="fa-solid fa-book-open"></i></span>
                        <span>DOCUMENTATION</span>
                    `;

                element.appendChild(div);
            }
        })
    }

    issueDetails.showModal();
}

// display tab-based cards
function displayIssueCard(allCard) {
    cardContainer.innerHTML = '';

    if (currentStatus === 'open-issue-card') {
        allCard.forEach(issueCard => {
            if (issueCard.status === 'open') {
                const isoDate = issueCard.createdAt;
                const shortDate = new Date(isoDate).toLocaleDateString('en-US');
                // console.log(shortDate);

                let img = null;
                let cardClass = '';

                if (issueCard.status === 'open') {
                    img = `<img src="./assets/Open-Status.png" alt="">`;
                    cardClass = `border-[#00A96E]`
                } else {
                    img = `<img src="./assets/Closed- Status .png" alt="">`;
                    cardClass = `border-[#A855F7]`;
                }

                let priorityClass = null;

                if (issueCard.priority === 'high') {
                    priorityClass = `bg-[#FEECEC] text-[#EF4444]`;
                } else if (issueCard.priority === 'medium') {
                    priorityClass = `bg-[#FFF6D1] text-[#F59E0B]`;
                } else {
                    priorityClass = `text-[#9CA3AF] bg-[#EEEFF2]`;
                }

                // create a new card
                const div = document.createElement('div');
                div.className = `py-5 shadow-md border-t-4 ${cardClass} rounded-xl space-y-5`;
                div.innerHTML = `
                <!-- content: 1 -->
                <div class="px-5 flex justify-between items-center">
                    <div>
                        ${img}
                    </div>
                    <div class="${priorityClass} border-none font-medium py-2 px-6 rounded-lg">
                        ${(issueCard.priority).toUpperCase()}
                    </div>
                </div>

                <!-- content: 2 -->
                <div class="px-5 space-y-2">
                    <h2 class="text-[#1F2937] text-lg font-semibold">
                        ${issueCard.title}
                    </h2>
                    <p class="text-[#64748B] line-clamp-3">
                        ${issueCard.description}
                    </p>
                </div>

                <!-- content: 3 -->
                <div class="label-container px-5 flex flex-wrap gap-2">
                    
                </div>

                <!-- content: 4 -->
                <hr class="text-[#bdbdbd]">

                <!-- content: 5 -->
                <div class="text-[#64748B] px-5 space-y-2">
                    <p>#${issueCard.id} by ${issueCard.author}</p>
                    <p>${shortDate}</p>
                </div>
            `;

                // append the new card into the cardContainer
                cardContainer.appendChild(div);

                const labelContainer = div.querySelector('.label-container');
                showLabel(labelContainer);

                function showLabel(element) {
                    element.innerHTML = '';

                    issueCard.labels.forEach(label => {
                        if (label === 'bug') {
                            const div = document.createElement('div');
                            div.className = 'badge badge-outline badge-error text-sm font-medium h-auto py-1'
                            div.innerHTML = `
                        <span><i class="fa-solid fa-bug"></i></span>
                        <span>BUG</span>
                    `;

                            element.appendChild(div);

                        } else if (label === 'help wanted') {
                            const div = document.createElement('div');
                            div.className = 'badge badge-outline badge-warning h-auto text-sm font-medium py-1'
                            div.innerHTML = `
                        <span><i class="fa-solid fa-life-ring"></i></span>
                        <span>HELP WANTED</span>
                    `;

                            element.appendChild(div);

                        } else if (label === 'enhancement') {
                            const div = document.createElement('div');
                            div.className = 'badge badge-outline badge-accent h-auto text-sm font-medium py-1'
                            div.innerHTML = `
                        <span><img src="./assets/Sparkle.png"></span>
                        <span>ENHANCEMENT</span>
                    `;

                            element.appendChild(div);

                        } else if (label === 'good first issue') {
                            const div = document.createElement('div');
                            div.className = 'badge badge-outline badge-info h-auto text-sm font-medium py-1'
                            div.innerHTML = `
                        <span><i class="fa-solid fa-circle-check"></i></span>
                        <span>GOOD FIRST ISSUE</span>
                    `;

                            element.appendChild(div);

                        } else if (label === 'documentation') {
                            // <div class="">Primary</div>
                            const div = document.createElement('div');
                            div.className = 'badge badge-soft badge-primary h-auto text-sm font-medium py-1'
                            div.innerHTML = `
                        <span><i class="fa-solid fa-book-open"></i></span>
                        <span>DOCUMENTATION</span>
                    `;

                            element.appendChild(div);
                        }
                    })
                }

                div.onclick = () => loadDetails(issueCard.id, shortDate);

                // Count all the issue cards and say how many cards there are.
                totalIssueCard.textContent = cardContainer.children.length;

            }
        })

    } else if (currentStatus === 'close-issue-card') {
        allCard.forEach(issueCard => {
            if (issueCard.status === 'closed') {
                const isoDate = issueCard.createdAt;
                const shortDate = new Date(isoDate).toLocaleDateString('en-US');
                // console.log(shortDate);

                let img = null;
                let cardClass = '';

                if (issueCard.status === 'open') {
                    img = `<img src="./assets/Open-Status.png" alt="">`;
                    cardClass = `border-[#00A96E]`
                } else {
                    img = `<img src="./assets/Closed- Status .png" alt="">`;
                    cardClass = `border-[#A855F7]`;
                }

                let priorityClass = null;

                if (issueCard.priority === 'high') {
                    priorityClass = `bg-[#FEECEC] text-[#EF4444]`;
                } else if (issueCard.priority === 'medium') {
                    priorityClass = `bg-[#FFF6D1] text-[#F59E0B]`;
                } else {
                    priorityClass = `text-[#9CA3AF] bg-[#EEEFF2]`;
                }

                // create a new card
                const div = document.createElement('div');
                div.className = `py-5 shadow-md border-t-4 ${cardClass} rounded-xl space-y-5`;
                div.innerHTML = `
                <!-- content: 1 -->
                <div class="px-5 flex justify-between items-center">
                    <div>
                        ${img}
                    </div>
                    <div class="${priorityClass} border-none font-medium py-2 px-6 rounded-lg">
                        ${(issueCard.priority).toUpperCase()}
                    </div>
                </div>

                <!-- content: 2 -->
                <div class="px-5 space-y-2">
                    <h2 class="text-[#1F2937] text-lg font-semibold">
                        ${issueCard.title}
                    </h2>
                    <p class="text-[#64748B] line-clamp-3">
                        ${issueCard.description}
                    </p>
                </div>

                <!-- content: 3 -->
                <div class="label-container px-5 flex flex-wrap gap-2">
                    
                </div>

                <!-- content: 4 -->
                <hr class="text-[#bdbdbd]">

                <!-- content: 5 -->
                <div class="text-[#64748B] px-5 space-y-2">
                    <p>#${issueCard.id} by ${issueCard.author}</p>
                    <p>${shortDate}</p>
                </div>
            `;

                // append the new card into the cardContainer
                cardContainer.appendChild(div);

                const labelContainer = div.querySelector('.label-container');
                showLabel(labelContainer);

                function showLabel(element) {
                    element.innerHTML = '';

                    issueCard.labels.forEach(label => {
                        if (label === 'bug') {
                            const div = document.createElement('div');
                            div.className = 'badge badge-outline badge-error text-sm font-medium h-auto py-1'
                            div.innerHTML = `
                        <span><i class="fa-solid fa-bug"></i></span>
                        <span>BUG</span>
                    `;

                            element.appendChild(div);

                        } else if (label === 'help wanted') {
                            const div = document.createElement('div');
                            div.className = 'badge badge-outline badge-warning h-auto text-sm font-medium py-1'
                            div.innerHTML = `
                        <span><i class="fa-solid fa-life-ring"></i></span>
                        <span>HELP WANTED</span>
                    `;

                            element.appendChild(div);

                        } else if (label === 'enhancement') {
                            const div = document.createElement('div');
                            div.className = 'badge badge-outline badge-accent h-auto text-sm font-medium py-1'
                            div.innerHTML = `
                        <span><img src="./assets/Sparkle.png"></span>
                        <span>ENHANCEMENT</span>
                    `;

                            element.appendChild(div);

                        } else if (label === 'good first issue') {
                            const div = document.createElement('div');
                            div.className = 'badge badge-outline badge-info h-auto text-sm font-medium py-1'
                            div.innerHTML = `
                        <span><i class="fa-solid fa-circle-check"></i></span>
                        <span>GOOD FIRST ISSUE</span>
                    `;

                            element.appendChild(div);

                        } else if (label === 'documentation') {
                            // <div class="">Primary</div>
                            const div = document.createElement('div');
                            div.className = 'badge badge-soft badge-primary h-auto text-sm font-medium py-1'
                            div.innerHTML = `
                        <span><i class="fa-solid fa-book-open"></i></span>
                        <span>DOCUMENTATION</span>
                    `;

                            element.appendChild(div);
                        }
                    })
                }

                div.onclick = () => loadDetails(issueCard.id, shortDate);

                // Count all the issue cards and say how many cards there are.
                totalIssueCard.textContent = cardContainer.children.length;
            }
        })

    } else if (currentStatus === 'all-issue-card') {
        allCard.forEach(issueCard => {
            const isoDate = issueCard.createdAt;
            const shortDate = new Date(isoDate).toLocaleDateString('en-US');
            // console.log(shortDate);

            let img = null;
            let cardClass = '';

            if (issueCard.status === 'open') {
                img = `<img src="./assets/Open-Status.png" alt="">`;
                cardClass = `border-[#00A96E]`
            } else {
                img = `<img src="./assets/Closed- Status .png" alt="">`;
                cardClass = `border-[#A855F7]`;
            }

            let priorityClass = null;

            if (issueCard.priority === 'high') {
                priorityClass = `bg-[#FEECEC] text-[#EF4444]`;
            } else if (issueCard.priority === 'medium') {
                priorityClass = `bg-[#FFF6D1] text-[#F59E0B]`;
            } else {
                priorityClass = `text-[#9CA3AF] bg-[#EEEFF2]`;
            }

            // create a new card
            const div = document.createElement('div');
            div.className = `py-5 shadow-md border-t-4 ${cardClass} rounded-xl space-y-5`;
            div.innerHTML = `
                <!-- content: 1 -->
                <div class="px-5 flex justify-between items-center">
                    <div>
                        ${img}
                    </div>
                    <div class="${priorityClass} border-none font-medium py-2 px-6 rounded-lg">
                        ${(issueCard.priority).toUpperCase()}
                    </div>
                </div>

                <!-- content: 2 -->
                <div class="px-5 space-y-2">
                    <h2 class="text-[#1F2937] text-lg font-semibold">
                        ${issueCard.title}
                    </h2>
                    <p class="text-[#64748B] line-clamp-3">
                        ${issueCard.description}
                    </p>
                </div>

                <!-- content: 3 -->
                <div class="label-container px-5 flex flex-wrap gap-2">
                    
                </div>

                <!-- content: 4 -->
                <hr class="text-[#bdbdbd]">

                <!-- content: 5 -->
                <div class="text-[#64748B] px-5 space-y-2">
                    <p>#${issueCard.id} by ${issueCard.author}</p>
                    <p>${shortDate}</p>
                </div>
                `;

            // append the new card into the cardContainer
            cardContainer.appendChild(div);

            const labelContainer = div.querySelector('.label-container');
            showLabel(labelContainer);

            function showLabel(element) {
                element.innerHTML = '';

                issueCard.labels.forEach(label => {
                    if (label === 'bug') {
                        const div = document.createElement('div');
                        div.className = 'badge badge-outline badge-error text-sm font-medium h-auto py-1'
                        div.innerHTML = `
                        <span><i class="fa-solid fa-bug"></i></span>
                        <span>BUG</span>
                    `;

                        element.appendChild(div);

                    } else if (label === 'help wanted') {
                        const div = document.createElement('div');
                        div.className = 'badge badge-outline badge-warning h-auto text-sm font-medium py-1'
                        div.innerHTML = `
                        <span><i class="fa-solid fa-life-ring"></i></span>
                        <span>HELP WANTED</span>
                    `;

                        element.appendChild(div);

                    } else if (label === 'enhancement') {
                        const div = document.createElement('div');
                        div.className = 'badge badge-outline badge-accent h-auto text-sm font-medium py-1'
                        div.innerHTML = `
                        <span><img src="./assets/Sparkle.png"></span>
                        <span>ENHANCEMENT</span>
                    `;

                        element.appendChild(div);

                    } else if (label === 'good first issue') {
                        const div = document.createElement('div');
                        div.className = 'badge badge-outline badge-info h-auto text-sm font-medium py-1'
                        div.innerHTML = `
                        <span><i class="fa-solid fa-circle-check"></i></span>
                        <span>GOOD FIRST ISSUE</span>
                    `;

                        element.appendChild(div);

                    } else if (label === 'documentation') {
                        // <div class="">Primary</div>
                        const div = document.createElement('div');
                        div.className = 'badge badge-soft badge-primary h-auto text-sm font-medium py-1'
                        div.innerHTML = `
                        <span><i class="fa-solid fa-book-open"></i></span>
                        <span>DOCUMENTATION</span>
                    `;

                        element.appendChild(div);
                    }
                })
            }

            div.onclick = () => loadDetails(issueCard.id, shortDate);

            // Count all the issue cards and say how many cards there are.
            totalIssueCard.textContent = cardContainer.children.length;
        })
    }
}