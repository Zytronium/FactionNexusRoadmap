document.addEventListener("DOMContentLoaded", function() {
    // Animate loading certain elements
    document.querySelectorAll(".animate-vertically-on-load").forEach(element => {
        element.style.overflow = "hidden";
        element.style.transition = "height 2s ease";
        element.style.visibility = "hidden";

        // wait 1 millisecond before measuring height to ensure accurate measurement.
        setTimeout(() => {
            // Measure the full height plus padding and margins
            let computedStyle = window.getComputedStyle(element);
            let paddingTop = parseFloat(computedStyle.paddingTop);
            let paddingBottom = parseFloat(computedStyle.paddingBottom);
            let marginTop = parseFloat(computedStyle.marginTop);
            let marginBottom = parseFloat(computedStyle.marginBottom);
            let totalHeight = element.clientHeight - paddingTop - paddingBottom;

            console.log(`total height: ${totalHeight}`);
            console.log(`client height: ${element.clientHeight}`);
            console.log(`just height: ${parseFloat(computedStyle.height)}`);
            // Set initial height to 0
            element.style.height = "0px";
            element.style.visibility = "";

            // Allow reflow before applying the transition
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.height = totalHeight + "px";
                });
            });

            // Cleanup after animation
            setTimeout(() => {
                element.style.height = ""; // Reset to natural height
                element.style.overflow = "visible";
                computedStyle = window.getComputedStyle(element);
                paddingTop = parseFloat(computedStyle.paddingTop);
                paddingBottom = parseFloat(computedStyle.paddingBottom);
                totalHeight = element.clientHeight - paddingTop - paddingBottom;

                console.log(`total height: ${totalHeight}`);
                console.log(`client height: ${element.clientHeight}`);
                console.log(`just height: ${parseFloat(computedStyle.height)}`);
            }, 2000);

            element.classList.remove("animate-vertically-on-load");
        }, 1) // 1 ms delay before doing all of this. Explanation above.

    });

    // Set the type label for all roadmap items.
    document.querySelectorAll(".item").forEach(element => {
        let type = element.classList.item(0);
        let type_text = element.children.item(0).children.item(1);

        type_text.textContent = type.charAt(0).toUpperCase() + type.substring(1).replace('-', ' ');

    });

// Function to update icon colors based on priority value
    function updatePriorityIcons(priorityMeter) {
        const priorityValue = parseInt(priorityMeter.getAttribute('data-priority'), 10);

        const icons = priorityMeter.querySelectorAll('[class^="priority-icon-"]');

        // Update colors based on the priority value
        icons.forEach((icon, index) => {
            const iconPriority = index + 1; // Icon index starts at 0, so we add 1

            if (iconPriority <= priorityValue) {
                // Apply the appropriate color based on priority
                icon.style.backgroundColor = `var(--priority-${iconPriority})`;
            } else {
                // Set icons beyond the priority to gray
                icon.style.backgroundColor = 'dimgray';
            }
        });

        // Update the tooltip text based on priority value
        const priorityText = [
            'Minimal', // Priority 1
            'Low',     // Priority 2
            'Medium',  // Priority 3
            'High',    // Priority 4
            'Urgent'   // Priority 5
        ];

        priorityMeter.setAttribute('data-tooltip', priorityText[priorityValue - 1]);
    }

    // Run the function for each priority meter
    document.querySelectorAll('.priority-meter').forEach(updatePriorityIcons);

    // code for show more spans
    document.querySelectorAll(".toggle").forEach((toggle) => {
        const wrapper = toggle.previousElementSibling; // Find the sibling before the toggle button

        if (!wrapper || !wrapper.classList.contains("description-wrapper")) {
            console.warn("No matching .description-wrapper found for", toggle);
            return; // Skip if no matching description-wrapper
        }

        // Check if the content overflows the 155px limit by at least 5px
        if (wrapper.scrollHeight <= 160) {
            toggle.style.display = "none"; // Hide the button if content fits
            wrapper.classList.add("expanded");
        }

        toggle.addEventListener("click", function () {
            if (wrapper.classList.contains("expanded")) {
                wrapper.classList.remove("expanded");
                wrapper.style.maxHeight = "155px";
                this.textContent = "Show More";
            } else {
                wrapper.classList.add("expanded");
                wrapper.style.maxHeight = wrapper.scrollHeight + "px";
                this.textContent = "Show Less";
            }
        });
    });
});
