// Landing Section
const startButton = document.getElementById("start-button");
const packingSection = document.getElementById("packing");

startButton.addEventListener("click", () => {
  packingSection.scrollIntoView({ behavior: "smooth" });
});


const items = [
  {
    name: "Gloves",
    image: "images/gloves.png",
    correct: false,
    tip: "Ni se te ocurra llevarte unos guantes!",
  },
  {
    name: "Passport",
    image: "images/passport.png",
    correct: true,
    tip: "Que no se te olvide el pasaporte!",
  },
  {
    name: "Skis",
    image: "images/skis.png",
    correct: false,
    tip: "Nah, dejate los skis para otro momento!",
  },
  {
    name: "Sunscreen",
    image: "images/sunscreen.png",
    correct: true,
    tip: "La crema va a ser importante",
  },
  {
    name: "Swimsuit",
    image: "images/swimsuit.png",
    correct: true,
    tip: "Habrá que coger un bañador",
  },
];


// Packing Section
const suitcase = document.querySelector('.suitcase .items');
const packingItems = document.querySelector('.packing-items');
const packingMessage = document.getElementById('packing-message');

let correctItemsPacked = 0;
let totalCorrectItems = items.filter(item => item.correct).length; // Calculate total correct items

// Function to create packing item icons
function createPackingItems() {
    items.forEach((item, index) => {
        const itemElement = document.createElement('img');
        itemElement.src = item.image;
        itemElement.alt = item.name;
        itemElement.classList.add('packing-item');
        itemElement.dataset.index = index;
        packingItems.appendChild(itemElement);
    });
}

createPackingItems();

// Function to handle packing item click
packingItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('packing-item')) {
        const index = event.target.dataset.index;
        const item = items[index];

        packingMessage.textContent = item.tip; // Display the tip

        if (item.correct) {
            if (!event.target.classList.contains('packed')) {
                correctItemsPacked++;
                event.target.classList.add('packed'); // Add 'packed' class
                const packedItem = document.createElement('img');
                packedItem.src = item.image;
                packedItem.alt = item.name;
                packedItem.classList.add('packed-item');
                suitcase.appendChild(packedItem);
                event.target.style.opacity = '0.5';
            }

            if (correctItemsPacked === totalCorrectItems) {
                packingMessage.textContent = "Maleta hecha! Ahora, de camino al aeropuerto!";
                setTimeout(() => {
                    document.getElementById('airport').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 1500); // Delay scrolling for a bit
            }

        } else {
            event.target.style.opacity = '0.5';
        }
    }
});

// Airport Section
const checkFlightButton = document.getElementById("check-flight");
const airportMessage = document.getElementById("airport-message");
const departureBoard = document.querySelector(
  ".departure-board .board-content"
);

const partialDestinations = [
  {
    display: "C  RF ",
    actual: "Corfu",
    startDate: "2nd",
    endDate: "4th",
  },
  {
    display: "T  R  N ",
    actual: "Tirana",
    startDate: "4th",
    endDate: "7th",
  },
];

checkFlightButton.addEventListener("click", () => {
  // Clear the board
  departureBoard.innerHTML = "";

  partialDestinations.forEach((dest) => {
    const boardLine = document.createElement("div");
    boardLine.classList.add("board-line");

    const destination = document.createElement("span");
    destination.classList.add("destination");
    destination.textContent = dest.display;

    // Create the dates span
    const dates = document.createElement("span");
    dates.classList.add("dates");
    dates.textContent = `${dest.startDate} - ${dest.endDate}`;

    const time = document.createElement("span");
    time.classList.add("time");
    time.textContent = " "; // Add time if needed

    const status = document.createElement("span");
    status.classList.add("status");
    status.textContent = " "; // Add status if needed

    boardLine.appendChild(destination);
    boardLine.appendChild(dates); // Append dates
    boardLine.appendChild(time);
    boardLine.appendChild(status);
    departureBoard.appendChild(boardLine);
  });

  airportMessage.textContent = "Casi casi! Es hora de embarcar...";
  setTimeout(() => {
    document.getElementById("inflight").scrollIntoView({ behavior: "smooth" });
  }, 2000);
  const airportSection = document.getElementById("airport");
    const plane = document.createElement("img");
    plane.src = "images/airplane.png";
    plane.id = "animated-plane";
    plane.classList.add("animated-plane");
    airportSection.appendChild(plane);

    plane.addEventListener("animationend", () => {
      plane.remove();
    });
});

// In-Flight Section
const windowDiv = document.querySelector("#inflight .window");
const videoContainer = document.querySelector("#inflight .video-container");
const videoPlayer = document.getElementById("video-player");
const mp4Source = document.getElementById("mp4Source");
const webmSource = document.getElementById("webmSource");
const playVideosButton = document.getElementById("play-videos");
const readLetterButton = document.getElementById("read-letter-button"); // Get the new button
const letterModal = document.getElementById("letter-modal");
const closeModal = document.querySelector(".close");

const videos = [
    {
        mp4: "videos/papis.mp4",
        webm: "videos/papis.webm",
    },
    {
        mp4: "videos/hermanos.mp4",
        webm: "videos/hermanos.webm",
    },
];

let currentVideoIndex = 0;

function playVideos() {
    windowDiv.style.display = "none";
    videoContainer.style.display = "flex";
    readLetterButton.style.display  =   "flex";

    mp4Source.src = videos[currentVideoIndex].mp4;
    webmSource.src = videos[currentVideoIndex].webm;

    videoPlayer.load();
    videoPlayer.play();

    videoPlayer.addEventListener("ended", () => {
        currentVideoIndex++;
        if (currentVideoIndex < videos.length) {
            videoPlayer.removeEventListener("ended", arguments.callee);
            playVideos();
        } else {
            videoContainer.style.display = "none";
            windowDiv.style.display = "block";
            currentVideoIndex = 0;

            // Show the Read Letter button
            readLetterButton.style.display = "block";
            playVideosButton.style.display = 'none';

            // Remove the event listener from "Play Videos" button
            playVideosButton.removeEventListener("click", playVideos);
        }
    });
}

// Initial click event to play videos
playVideosButton.addEventListener("click", playVideos);

// Event listener for the Read Letter button
readLetterButton.addEventListener("click", () => {
    letterModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    letterModal.style.display = "none";
    setTimeout(() => {
        document.getElementById("reveal").scrollIntoView({ behavior: "smooth" });
    }, 500);
});

// If the user clicks outside the modal, also close it
window.addEventListener("click", (event) => {
    if (event.target == letterModal) {
        letterModal.style.display = "none";
        setTimeout(() => {
            document.getElementById("reveal").scrollIntoView({ behavior: "smooth" });
        }, 500);
    }
});

const customCursor = document.getElementById("custom-cursor");

// Create the cursor element if it doesn't exist
if (!customCursor) {
    const cursorDiv = document.createElement("div");
    cursorDiv.id = "custom-cursor";
    const cursorImg = document.createElement("img");
    cursorImg.src = "images/airplane-cursor.png"; // Replace with your airplane image
    cursorDiv.appendChild(cursorImg);
    document.body.appendChild(cursorDiv);
}

document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    customCursor.style.left = x + "px";
    customCursor.style.top = y + "px";
});