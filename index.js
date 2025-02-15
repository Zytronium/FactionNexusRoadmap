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
});
