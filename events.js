let eventLog = []

const buttonStartTutorial = document.querySelector('.button-start-tutorial');

buttonStartTutorial.addEventListener('click',function(){
    loadTutorial();
    buttonStartTutorial.classList.add('invisible')
})

function Event(event){
    this.event = event
}

const gameContainer = document.querySelector("#game-container");

let battleImageContainer = document.createElement('div');
battleImageContainer.className = "game-container__battle-image-container";
gameContainer.appendChild(battleImageContainer);

function turnBattleImageContainer(value, type) {
    if (value === true) {
        if (type === "BANDIT") {
            console.log("displaying bandit silhouette");
            html = `<img class="bandit-bi battle-image" class="invisible" src="./img/bandit.png" alt="A bandit's silhouette">`;
        } else if (type === "DUMMY") {
            console.log("displaying dummy silhouette");
            html = `<img class="dummy-bi battle-image" class="invisible" src="./img/dummy.png" alt="A dummy's silhouette">`;
        }
        battleImageContainer.style.display = "inline";
        battleImageContainer.innerHTML = html;
    } else {
        battleImageContainer.style.display = "none";
    }
}

function logEvent(event){
    let eventLogged = event;
    eventLog.push(new Event(eventLogged));
    if(eventLog.length >5){
        eventLog.shift();
    }
    console.log(eventLog);
    displayEvent();
    if(enemy == defeatedMob){
        updateStats(user1);
        displayStats(user1);
        console.log("displaying user stats (events.js)");
    }else{
        displayStats(user);
        displayStats(enemy);
    }
    const eventContainer = document.getElementById("event-container");
    eventContainer.scrollTop = eventContainer.scrollHeight;
}

function displayEvent(){
    const eventContainer = document.getElementById("event-container");
    let html = "";
    eventLog.forEach((Event) => {
        html = html+`<p>${Event.event}</p><br>`;
    });
    eventContainer.innerHTML = html;
}

const buttonStartCombat = document.querySelector(".button-start-combat")

buttonStartCombat.addEventListener('click', function() {
    combatOn(enemy);
});

let armory = [trainingBoots, trainingHelmet, trainingChestplate, trainingGloves, trainingPants, trainingSword]

function loadShop(insert) {
    const shopContainer = document.createElement("div");
    shopContainer.className = "game-container__shop-container";
    gameContainer.appendChild(shopContainer);

    if(shopContainer == true){
        shopContainer.remove()
        const shopContainer = document.createElement("div");
        shopContainer.className = "game-container__shop-container";
        gameContainer.appendChild(shopContainer);
    }

    let typeOfShop = insert;
    if (typeOfShop == armory) {
        const armoryShopContainer = document.createElement("div");
        armoryShopContainer.className = "armory-shop shop";
        shopContainer.appendChild(armoryShopContainer);
        const buttonCloseShop = document.createElement("button");
        buttonCloseShop.className = "button-close-shop";
        actionsContainer.appendChild(buttonCloseShop);
        buttonCloseShop.innerHTML = "SALIR DE LA TIENDA";
        const armoryShopTitle = document.createElement("h2");
        armoryShopTitle.className = "shop__title";
        armoryShopTitle.innerHTML = "Armería de Kethis";
        armoryShopContainer.appendChild(armoryShopTitle);
        buttonCloseShop.addEventListener('click', function(){
            closeShop();
            buttonCloseShop.remove()
            gameContainer.innerHTML = "<p>Hasta acá llegué con el proyecto. ;)</p>"
            const clickableResetLocalStorage = document.createElement("p");
            clickableResetLocalStorage.classList.add('clickable-reset-local-storage')
            clickableResetLocalStorage.classList.add('background-red')
            clickableResetLocalStorage.style.fontSize = '1.6vw'
            clickableResetLocalStorage.innerHTML = "Clickea aquí para reiniciar el juego (¡Perderás todos los datos!)"
            gameContainer.appendChild(clickableResetLocalStorage);
            clickableResetLocalStorage.addEventListener('click', function(){
                localStorage.clear();
                window.location.reload();
            })
        });
        armory.forEach((Item) => {
            function createItem(insertItem) {
                const armoryShop = document.querySelector(".armory-shop");
            
                const itemDiv = document.createElement("div");
                itemDiv.className = "shop__item";
            
                const itemInfoDiv = document.createElement("div");
                itemInfoDiv.className = `shop__item-info item-id-${insertItem.id}`;
            
                itemInfoDiv.innerHTML = `
                    <img class="shop__item__icon" src="${insertItem.icon}" alt="">
                    <p class="shop__item__name">${insertItem.name}</p>
                    <p class="shop__item__price">$${insertItem.price}</p>
                `;
            
                itemDiv.appendChild(itemInfoDiv);
                armoryShop.appendChild(itemDiv);
            
                const itemButton = armoryShop.querySelector(`.item-id-${insertItem.id}`);
            
                itemButton.addEventListener('click', function () {
                    displayItemDetailedInformation(insertItem);
                });
            }
            
            
            createItem(Item);
        });
    } else {
        console.log("ERROR: none type of shop was requested");
    }
}

function closeShop(){
    const shopContainer = document.querySelector(".game-container__shop-container")
    shopContainer.remove();
};




