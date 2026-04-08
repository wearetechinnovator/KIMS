document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');

    // Function to activate a tab
    function activateTab(tab) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }

    // Add hover event listeners
    tabs.forEach(tab => {
        tab.addEventListener('mouseover', function () {
            activateTab(this);
        });
    });

    // Keep first tab active on page load
    document.querySelector('.tab').classList.add('active');
    document.getElementById('tab1').classList.add('active');
});




// ----------------------
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    // Initialize the accordion
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        // Set ARIA attributes for accessibility
        const content = item.querySelector('.accordion-content');
        const contentId = `content-${Math.random().toString(36).substring(2, 9)}`;

        header.setAttribute('aria-expanded', item.classList.contains('active'));
        header.setAttribute('aria-controls', contentId);
        content.setAttribute('id', contentId);

        // Add click event
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });

        // Add keyboard support
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
});

