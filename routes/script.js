// script.js
document.addEventListener("DOMContentLoaded", function () {
    const selectBox = document.querySelector(".select-box");
    const options = document.querySelector(".options");

    selectBox.addEventListener("click", function () {
        options.style.display = options.style.display === "block" ? "none" : "block";
    });

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const selectedItems = [...checkboxes].filter((cb) => cb.checked).map((cb) => cb.nextElementSibling.textContent);
            if (selectedItems.length === 0) {
                selectBox.querySelector(".placeholder").textContent = "Select items";
            } else {
                selectBox.querySelector(".placeholder").textContent = selectedItems.join(", ");
            }
        });
    });
});
