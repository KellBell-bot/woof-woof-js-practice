//get all pups info with <span>

const URL = "http://localhost:3000/pups";
document.addEventListener("DOMContentLoaded", () => {
  getPups();
  let filterButton = document.getElementById("good-dog-filter");
  filterButton.addEventListener("click", () => toogleFilterDog());
});

function toogleFilterDog() {
  let filterButton = document.getElementById("good-dog-filter");
  filterButton.innerText = `Filter good dogs: ${
    filterButton.innerText.split(" ")[3] === "ON" ? "OFF" : "ON"
  }`;
  getPups();
}

function getPups() {
  fetch(URL)
    .then((response) => response.json())
    .then((pupData) => {
      let filterButton = document.getElementById("good-dog-filter");
      const filter =
        filterButton.innerText.split(" ")[3] === "ON" ? true : false;
      if (filter) {
        pupData = pupData.filter((pup) => pup.isGoodDog);
      }
      let div = document.getElementById("dog-bar");
      div.innerHTML = "";
      pupData.forEach((pup) => renderPup(pup));
    });
}

function renderPup(pup) {
  let pupName = document.createElement("span");
  pupName.innerText = pup.name;
  pupName.addEventListener("click", (event) => renderInfo(pup));

  let div = document.getElementById("dog-bar");
  div.appendChild(pupName);
}

function renderInfo(pup) {
  //args = pup's data

  let pupImage = document.createElement("img");
  pupImage.src = pup.image;

  let pupH2 = document.createElement("h2");
  pupH2.innerText = pup.name;

  let pupButton = document.createElement("button");
  if (pup.isGoodDog) {
    pupButton.innerText = "Good Dog!";
  } else {
    pupButton.innerText = "Bad Dog!";
  }
  pupButton.addEventListener("click", () => toogleDog(pup));
  // pupButton.innerText= pup.isGoodDog ? "Good Dog!" : "Bad Dog!";

  // console.log(pupImage)
  // console.log(pupH2)
  // console.log(pupButton)
  let div = document.getElementById("dog-info");
  div.innerHTML = "";
  div.append(pupImage, pupH2, pupButton);
}

function toogleDog(pup) {
  // const URL = "http://localhost:3000/pups/:id";
  const patchURL = URL + "/" + pup.id;

  const data = {
    isGoodDog: !pup.isGoodDog,
  };

  const obj = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch(patchURL, obj)
    .then((res) => res.json())
    .then((json) => {
      renderInfo(json);
      getPups();
    });
}
