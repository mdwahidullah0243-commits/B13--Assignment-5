const cardContainer = document.getElementById('issue-cards-container');
const totalIssueCard = document.getElementById('count-issue-card');

// load all issue card
const loadAllIssueCard = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

    const res = await fetch(url);
    const data = await res.json();

    displayAllIssueCard(data.data)
}

// display all issue card
const displayAllIssueCard = (issueCardBox) => {
    cardContainer.innerHTML = '';

    issueCardBox.forEach(issueCard => {
        // create a new card
        const div = document.createElement('div');
        div.className = 'py-5 shadow-md border-t-4 border-[#00A96E] rounded-xl space-y-5';
        div.innerHTML = `
            <!-- content: 1 -->
            <div class="px-5 flex justify-between items-start">
                <div>
                    <img src="./assets/Open-Status.png" alt="">
                </div>
                <div class="badge badge-soft badge-error border-none bg-[#FEECEC] font-medium py-3 px-6">
                    High
                </div>
            </div>

            <!-- content: 2 -->
            <div class="px-5 space-y-2">
                <h2 class="text-[#1F2937] text-lg font-semibold">
                    Fix navigation menu on mobile devices
                </h2>
                <p class="text-[#64748B] line-clamp-3">
                    The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.
                </p>
            </div>

            <!-- content: 3 -->
            <div class="px-5 flex gap-2">
                <div class="badge badge-outline badge-error text-sm font-medium h-auto py-1">
                    <span><i class="fa-solid fa-bug"></i></span>
                    BUG
                </div>
                <div class="badge badge-outline badge-warning h-auto text-sm font-medium py-1">
                    <span><i class="fa-solid fa-life-ring"></i></span>
                    HELP WANTED
                </div>
            </div>

            <!-- content: 4 -->
            <hr class="text-[#bdbdbd]">

            <!-- content: 5 -->
            <div class="text-[#64748B] px-5 space-y-2">
                <p>#1 by john_doe</p>
                <p>1/15/2024</p>
            </div>
        `;

        // append the new card into the cardContainer
        cardContainer.appendChild(div);
    });

    // Count all the issue cards and say how many cards there are.
    totalIssueCard.textContent = cardContainer.children.length;
}

loadAllIssueCard();