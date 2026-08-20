const products = [

    "Signature Loaf",

    "Fresh Bread",

    "Homemade Pastries"

];

let favorites = JSON.parse(localStorage.getItem("northStarFavorites")) || [];

function saveFavorites() {

    localStorage.setItem("northStarFavorites", JSON.stringify(favorites));

}

function toggleFavorite(productName, button) {

    if (favorites.includes(productName)) {

        favorites = favorites.filter(function (item) {

            return item !== productName;

        });

        button.textContent = "♡ Add to Favorites";

    } else {

        favorites.push(productName);

        button.textContent = "♥ Saved to Favorites";

    }

    saveFavorites();

}

function addFavoriteButtons() {

    const headings = document.querySelectorAll("main h3");

    headings.forEach(function (heading, index) {

        if (index >= products.length) {

            return;

        }

        const button = document.createElement("button");

        const productName = products[index];

        button.type = "button";

        button.textContent = favorites.includes(productName)

            ? "♥ Saved to Favorites"

            : "♡ Add to Favorites";

        button.addEventListener("click", function () {

            toggleFavorite(productName, button);

        });

        heading.insertAdjacentElement("afterend", button);

    });

}

function validateForm() {

    const form = document.querySelector("form");

    if (!form) {

        return;

    }

    const name = document.querySelector("#name");

    const email = document.querySelector("#email");

    const message = document.querySelector("#message");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let isValid = true;

        document.querySelectorAll(".error-message").forEach(function (error) {

            error.remove();

        });

        if (name.value.trim() === "") {

            showError(name, "Please enter your name.");

            isValid = false;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            showError(email, "Please enter a valid email address.");

            isValid = false;

        }

        if (message.value.trim() === "") {

            showError(message, "Please enter a message.");

            isValid = false;

        }

        if (isValid) {

            alert("Thank you! Your message has been received.");

            form.reset();

        }

    });

}

function showError(field, message) {

    const error = document.createElement("span");

    error.className = "error-message";

    error.textContent = message;

    error.style.display = "block";

    error.style.marginTop = "5px";

    field.insertAdjacentElement("afterend", error);

}

document.addEventListener("DOMContentLoaded", function () {

    addFavoriteButtons();

    validateForm();

});
