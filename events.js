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

const battleImageContainer = document.querySelector('#game-container__battle-image-container');

function logEvent(event){
    let eventLogged = event;
    eventLog.push(new Event(eventLogged));
    if(eventLog.length >5){
        eventLog.shift();
    }
    console.log(eventLog);
    displayEvent();
    if(enemy == defeatedMob){
        displayStats(user);
        console.log("displaying user stats (events.js)");
        let html = "";
        battleImageContainer.innerHTML = html;
    }else{
        displayStats(user);
        displayStats(enemy);
        let html = "";
        if(enemy.type == "BANDIT"){
            console.log("displaying bandit silhouette");
            html = `<img class="bandit-bi battle-image" class="invisible" src="./img/bandit.png" alt="A bandit's silhouette">`
            battleImageContainer.innerHTML = html;
        }else if(enemy.type == "DUMMY"){
            console.log("displaying dummy silhouette");
            html = `<img class="dummy-bi battle-image" class="invisible" src="./img/dummy.png" alt="A dummy's silhouette">`
            battleImageContainer.innerHTML = html;
        };
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
    combatOn();
});

let armory = [trainingBoots, trainingHelmet, trainingChestplate, trainingGloves, trainingPants, trainingSword]

function loadShop(insert){
    const shopContainer = document.querySelector(".game-container__shop-container");
    let typeOfShop = insert;
    if(typeOfShop == armory){
        shopContainer.innerHTML = `<div class="armory-shop shop"></div>`
        armory.forEach((Item) => {
            const armoryShop = document.querySelector(".armory-shop");
            let itemButtonsArray = [];
            function createItem(insertItem){
                itemButtonsArray.push(
                `<div class="shop__item">
                    <div class="shop__item-info  item-id-${insertItem.id}">
                        <img class="shop__item__icon" src="https://placeholder.co/400" alt="">
                        <p class="shop__item__name">${insertItem.name}</p>
                        <p class="shop__item__price">$${insertItem.price}</p>
                    </div>
                </div>`);
                armoryShop.innerHTML = armoryShop.innerHTML + itemButtonsArray[itemButtonsArray.length - 1]
                let itemButton = document.querySelector(`.item-id-${lastButtonArrayItem}`);
                itemButton.addEventListener('click',function(){
                    displayItemDetailedInformation(insertItem);
                })
            }
            createItem(Item);
        });
    }else{
        console.log("ERROR: none type of shop was requested");
    }
}




// function createNewItem(itemToCreate){
//     let item = itemToCreate
//     armoryShop.innerHTML = armoryShop.innerHTML + `
//     <div class="shop__item">
//         <button class="shop__item-info  item-id-${item.id}">
//             <img class="shop__item__icon" src="https://placeholder.co/400" alt="">
//             <p class="shop__item__name">${item.name}</p>
//             <p class="shop__item__price">$${item.price}</p>
//         </button>
//     </div>`;
//     function createButtonItem(buttonItemId){
//         let buttonItem = buttonItemId;
//         console.log(buttonItem);
//         console.log("created button item for " + buttonItem.name)
//         buttonItem.addEventListener('click',function(){
//             console.log("clicked!")
//             displayItemDetailedInformation(buttonItem);
//         })
//     }
//     createButtonItem(itemToCreateButton);
// }
// createNewItem(Item);