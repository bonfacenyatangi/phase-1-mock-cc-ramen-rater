// write your code here
// Assign the resources URL to a variable
const baseURL = "http://localhost:3000";

// Grap ids of elements from index.html
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const newRamenForm = document.querySelector("#new-ramen");

// Show ramen images in #ramen-menu div
function displayRamenMenu() {
    fetch(`${baseURL}/ramens`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((ramen) => {
                const img = document.createElement("img");
                img.src = ramen.image;
                img.alt = ramen.name;
                img.dataset.id = ramen.id;
                ramenMenu.append(img);
            });
        });
}

// Show messages/info from clicked ramen in #ramen-detail div
function displayRamenDetail(id) {
    fetch(`${baseURL}/ramens/${id}`)
        .then((response) => response.json())
        .then((ramen) => {
            ramenDetail.innerHTML = `
        <img src="${ramen.image}" alt="${ramen.name}">
        <h2>${ramen.name}</h2>
        <h3>${ramen.restaurant}</h3>
        <p class="rating">Rating: ${ramen.rating}</p>
        <p class="comment">${ramen.comment}</p>
      `;
        });
}

// Adding event listener to #ramen-menu div to display ramen detail
ramenMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
        const id = event.target.dataset.id;
        displayRamenDetail(id);
    }
});

// add event listener to new-ramen form to create new ramen
newRamenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const restaurant = event.target.restaurant.value;
    const image = event.target.image.value;
    const rating = event.target.rating.value;
    const comment = event.target["new-comment"].value;
    const ramen = { name, restaurant, image, rating, comment };
    const img = document.createElement("img");
    img.src = image;
    img.alt = name;
    ramenMenu.append(img);
    event.target.reset();
});

// call displayRamenMenu function to load all ramen images on page load
displayRamenMenu();

// Creating a POST method
let data = {
    name: ramen.name,
    image: ramen.image,
    comment: ramen.comment,
    rating: ramen.rating,
    restaurant: ramen.restaurant
}

data = JSON.stringify(data);

fetch(`${baseURL}/ramens`, {
    method: 'POST',
    body: data,
    headers: { "Content-Type": "application/json" }

}).then(response => response.JSON())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));