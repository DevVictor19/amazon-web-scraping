const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const cardSection = document.querySelector("#card-section");

searchBtn.addEventListener("click", makeSearch);

function createCard({ title, stars, reviews, imgUrl }) {
  return `
     <div class="card">
        <div class="card__img-container">
          <img
            class="card__img"
            src="${imgUrl}"
            alt="${title}"
          />
        </div>
        <h1 class="card__title">${title}</h1>
        <p class="card__rating">Rating: <span>${stars}</span></p>
        <p class="card__reviews">Reviews: <span>${reviews}</span></p>
      </div>
  `;
}

async function getProducts(search) {
  try {
    const apiUrl = `http://localhost:3000/api/scrape?keyword=${search}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const products = await response.json();
      return products;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

function getSearch() {
  const search = searchInput.value.trim();

  if (!search) {
    return null;
  }

  return search.split(" ").join("+");
}

function generateCards(products) {
  cardSection.innerHTML = " ";

  products.forEach((product) => {
    cardSection.innerHTML += createCard(product);
  });
}

async function makeSearch() {
  const search = getSearch();

  if (!search) {
    alert("Search input cannot be empty");
    return;
  }

  const products = await getProducts(search);

  if (!products) {
    alert("Something went wrong, please try again later...");
    return;
  }

  generateCards(products);
}
