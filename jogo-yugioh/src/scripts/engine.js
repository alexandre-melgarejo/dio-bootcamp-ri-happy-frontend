
const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points'),
    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    playerSides: {
        player: "player-cards",
        playerBox: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards"),
    },
    slots: {
        cardImage: document.getElementById("card-image"),
        cardDetails: document.querySelector(".card_details"),
    },
    setup: {
        music: document.getElementById("playMusic"),
        sounds: document.getElementById("playSounds"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const assetPath = {
    image: "./src/assets/icons/",
    audio: "./src/assets/audios/",
    cursor: "./src/assets/cursor/",
}

const cardBackImg = `${assetPath.image}card-back.png`

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `dragon.png`,
        winOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `magician.png`,
        winOf: [2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `exodia.png`,
        winOf: [0],
        loseOf: [1],
    },
]

const players = {
    player: "player-cards",
}

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function removeAllCardsImages() {
    let {computerBox, playerBox} = state.playerSides;

    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = playerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.winOf.includes(computerCardId)){
        duelResults = "win";
        state.score.playerScore++;
    }

    if (playerCard.loseOf.includes(computerCardId)) {
        duelResults = "lose";
        state.score.computerScore++
    }

    playAudio(duelResults);

    return duelResults;
}

async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

async function updateScore() {
    state.score.scoreBox.innerText = `Wins: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

async function hideCardDetails() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";

    state.slots.cardDetails.style.display = "none";
}

async function setCardsField(cardId) {

    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    await hideCardDetails();

    state.fieldCards.player.src = assetPath.image + cardData[cardId].img;
    state.fieldCards.computer.src = assetPath.image + cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);

}

async function showCardSlots(value) {

    if (value === false) {
        // state.slots.cardImage.style.display = "none";
        state.slots.cardDetails.style.display = "none";
    } else {
        // state.slots.cardImage.style.display = "block";
        state.slots.cardDetails.style.display = "flex";
    }
    
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = assetPath.image + cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;

    state.slots.cardDetails.style.display = "flex";
}

async function createCardImage(idCard, playerSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", `${cardBackImg}`);
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    // Deve permitir click e visualizar somente as cartas do player
    if(playerSide === state.playerSides.player) {

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        })

        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(idCard);
        })

        cardImage.addEventListener("mouseleave", () => {
            hideCardDetails();
        })

    }
    return cardImage;
}

async function drawCards(cardCount, playerSide) {
    for (let i = 0; i < cardCount; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, playerSide);

        document.getElementById(playerSide).appendChild(cardImage);
    }
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    main();
}

async function playAudio(status) {
    if (state.setup.sounds.checked) {
        const audio = new Audio(`${assetPath.audio}${status}.wav`)
        audio.play();
    }
}

async function setupMusic() {
    const bgm = document.getElementById("bgm");

    if (state.setup.music.checked) {
        bgm.play();
    } else {
        bgm.pause();
    }
}

function main(){

    // showHiddenCardFieldsImages(false);

    drawCards(5, state.playerSides.player);
    drawCards(5, state.playerSides.computer);

    setupMusic();

}

main();
