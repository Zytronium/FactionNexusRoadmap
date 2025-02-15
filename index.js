document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".animate-vertically-on-load").forEach(element => {
        element.style.overflow = "hidden";
        element.style.transition = "height 2s ease-out";

        // Measure the full height including padding but ignoring margins
        let computedStyle = window.getComputedStyle(element);
        let paddingTop = parseFloat(computedStyle.paddingTop);
        let paddingBottom = parseFloat(computedStyle.paddingBottom);
        let totalHeight = element.scrollHeight - paddingTop - paddingBottom;

        // Set initial height to 0
        element.style.height = "0px";

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
        }, 2000);

        element.classList.remove("animate-vertically-on-load");
    });

    document.querySelectorAll(".item").forEach(element => {
        let type = element.classList.item(0);
        let type_text = element.children.item(0).children.item(1);

        type_text.textContent = type;

    });
});
