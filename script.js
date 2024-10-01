document
  .querySelector(".form-select")
  .addEventListener("change", async function () {
    const selectedPlanet = this.value;
    console.log("Selected option value:", selectedPlanet);

    if (selectedPlanet == "all") {
      returnToNormal();
    } else {
      maximizePlanet(selectedPlanet);
      const planetInfo = await fetchPlanetData(selectedPlanet);

      const myModal = new bootstrap.Modal(
        document.getElementById("exampleModal"),
        {}
      );
      myModal.show();

      const modalHead = document.querySelector(".modal-body h2");
      modalHead.innerHTML = selectedPlanet;

      const modalText = document.querySelector(".modal-text");
      console.log(planetInfo);
      modalText.innerHTML = planetInfo;
      // console.log(modalText.querySelectorAll("p")[1].textContent);
      // modalText.innerHTML =
      //   modalText.querySelectorAll("p")[1].textContent.length > 400
      //     ? modalText.querySelectorAll("p")[1].textContent.substring(0, 400) +
      //       "..."
      //     : modalText.querySelectorAll("p")[1].textContent;

      const modalImg = document.querySelector(".img-pop");
      modalImg.setAttribute("src", `img/${selectedPlanet}.png`);
    }
  });

async function fetchPlanetData(planet) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${planet}&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const planetInfo = document.querySelector(".planet-info");
    const page = Object.values(data.query.pages)[0];

    return page.extract;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function maximizePlanet(planetName) {
  const planet = document.getElementById(`${planetName}Popup`);

  const allPlanets = document.querySelectorAll(".item");
  allPlanets.forEach((item) => {
    if (item.classList.contains("big-size")) {
      item.classList.remove("big-size");
      item.removeAttribute("class");
      item.setAttribute("class", `${planetName}-img item`);
    }

    if (item == "moon") {
      item.parentElement.parentElement.style.display = "none";
      item.parentElement.parentElement.style.color = "#fff";
    } else {
      item.parentElement.style.display = "none";
      item.parentElement.style.color = "#fff";
    }
  });

  if (planetName == "moon") {
    planet.parentElement.parentElement.style.display = "block";
    planet.parentElement.style.display = "block";
    planet.parentElement.parentElement.style.color = "transparent";
  } else {
    planet.parentElement.style.display = "block";
    planet.parentElement.style.color = "transparent";
  }

  planet.classList.add("big-size");
}

function returnToNormal() {
  const solarSystem = document.querySelector(".solar-system");
  solarSystem.innerHTML = `
  <div class="sun">
                        <div class="sun-img item" id="sunPopup">
                            <img src="img/sun.png" alt="sun">
                        </div>
                    </div>
                    <div class="mercury">
                        <div class="mercury-img item" id="mercuryPopup">Mercury</div>
                    </div>

                    <div class="venus">
                        <div class="venus-img item" id="venusPopup">Venus</div>
                    </div>
                    <div class="earth">
                        <div class="earth-img item" id="earthPopup">Earth</div>
                        <div class="moon">
                            <div class="moon-img item" id="moonPopup"></div>
                        </div>
                    </div>
                    <div class="mars">
                        <div class="mars-img item" id="marsPopup">Mars</div>
                    </div>
                    <div class="jupiter">
                        <div class="jupiter-img item" id="jupiterPopup">Jupiter</div>
                    </div>
                    <div class="saturn">
                        <div class="saturn-img item" id="saturnPopup">Saturn</div>
                    </div>
                    <div class="uranus">
                        <div class="uranus-img item" id="uranusPopup">Uranus</div>
                    </div>
                    <div class="neptune">
                        <div class="neptune-img item" id="neptunePopup">Neptune</div>
                    </div>
                    <div class="pluto">
                        <div class="pluto-img item" id="plutoPopup">Pluto</div>
                    </div>`;
}
