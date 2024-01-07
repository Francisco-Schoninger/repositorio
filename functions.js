let entityInfoContainer = document.querySelector(".info-container");

let combat = false;

function Stats(mobMaxHealth,mobHealth,mobResistance,mobDamage){
    this.maxHealth = mobMaxHealth;
    this.health = mobHealth;
    this.resistance = mobResistance;
    this.damage = mobDamage;
}

function User(userNickname,userGold,userMaxHealth,userHealth,userResistance,userDamage,userType){
    this.nickname = userNickname;
    this.gold = userGold;
    this.maxHealth = userMaxHealth;
    this.health = userHealth;
    this.resistance = userResistance;
    this.damage = userDamage;
    this.type = userType
};

let user1Items = [trainingGloves,trainingChestplate,trainingPants,trainingBoots]

let user1Stats = new Stats(100, 100, 0, 26)
let user1 = new User("Ashley",60,user1Stats.maxHealth,user1Stats.health,user1Stats.resistance,user1Stats.damage,"PLAYER");

let mob1Items = [basicMetalDagger, ageWornChestplate, ageWornPants, kerchief, marketBoots]

let mob1Stats = new Stats(100, 100, 0, 20)
let mob1 = new User("Bandido Springs",96,mob1Stats.maxHealth,mob1Stats.health,mob1Stats.resistance,mob1Stats.damage,"BANDIT");

let defeatedMobStats = new Stats(0,0,0,0);
let defeatedMob = new User("NO ENEMY", 0, defeatedMobStats.maxHealth,defeatedMobStats.health,defeatedMobStats.resistance, defeatedMobStats.damage,"NONE");

let dummyStats = new Stats(user1Stats.damage * 5, user1Stats.damage * 5, 0, 0);
let dummy = new User("Objetivo de Práctica", 0, dummyStats.maxHealth,dummyStats.health,dummyStats.resistance,dummyStats.damage, "DUMMY");



function updateStats(entityToUpdate){
    if(entityToUpdate == user1){
        let user1AdditionalStats = user1Items.reduce((accumulator, currentItem) => {
            return {
                health: accumulator.health + currentItem.health,
                resistance: accumulator.resistance + currentItem.resistance,
                damage: accumulator.damage + currentItem.damage,
            };
        });
        console.log(user1AdditionalStats);
        user1.maxHealth = user1AdditionalStats.health + user1Stats.maxHealth;
        user1.resistance = user1AdditionalStats.resistance + user1Stats.resistance;
        user1.damage = user1AdditionalStats.damage + user1Stats.damage;
        if(combat == false){
            user1.health = user1.maxHealth
        }
    }else if(entityToUpdate == mob1){
        let mob1AdditionalStats = mob1Items.reduce((accumulator, currentItem) => {
            return {
                health: accumulator.health + currentItem.health,
                resistance: accumulator.resistance + currentItem.resistance,
                damage: accumulator.damage + currentItem.damage,
            };
        });
        mob1.maxHealth = mob1AdditionalStats.health + mob1Stats.maxHealth;
        mob1.resistance = mob1AdditionalStats.resistance + mob1Stats.resistance;
        mob1.damage = mob1AdditionalStats.damage + mob1Stats.damage;
        if(mob1.health === mob1.maxHealth - mob1AdditionalStats.health){
            mob1.health = mob1.maxHealth
        }
    }
}

updateStats(user1);
updateStats(mob1);

let enemy = defeatedMob;
let user = user1;


const interval = setInterval(1000);


let actionsContainer = document.querySelector("#actions-container");


let enemyInfoContainer = document.getElementById("enemy-info-container");

function enemyAttack(player, enemy, enemyDamageInput) {
    console.log("MIRAR LA CONSOLA MIENTRAS JUGÁS ES DE MALA EDUCACIÓN (No lo hice responsive, capaz se te rompa)");
    let enemyAttackIndicatorBorder = document.createElement("div");
    enemyAttackIndicatorBorder.className = "enemy-attack-border";
    gameContainer.appendChild(enemyAttackIndicatorBorder);
    let enemyAttackIndicatorFill = document.createElement("div");
    enemyAttackIndicatorFill.className = "enemy-attack-border__fill";
    enemyAttackIndicatorBorder.appendChild(enemyAttackIndicatorFill);
    let randomPositionX = Math.floor(Math.random() * 84);
    let randomPositionY = Math.floor(Math.random() * 32);
    let indicatorFill = 0;

    enemyAttackIndicatorBorder.style.marginLeft = `${randomPositionX}%`;
    console.log(randomPositionX);
    enemyAttackIndicatorBorder.style.marginTop = `${randomPositionY}%`;
    console.log(randomPositionY);

    function clickHandler() {
        enemyAttackIndicatorBorder.removeEventListener('click', clickHandler);
        enemyAttackIndicatorFill.style.backgroundColor = "blue";
        enemyDamageInput = Math.round(enemyDamageInput);
        let enemyDamageRealInput = enemyDamageInput / 4;
        enemyDamageRealInput = Math.round(enemyDamageRealInput);
        logEvent(`¡Bloqueaste ${Math.round(enemyDamageInput / 4 * 3)} de daño de ${enemy.nickname}! Recibes ${enemyDamageRealInput} de daño.`);
        player.health = player.health - enemyDamageRealInput;
        setTimeout(function(){
            logEvent(`Vida actual de ${player.nickname}: ${player.health}`);
            if(player.health <= 0){
                turnAttackButton(false);
            }else{
                turnAttackButton(true);
            }
        }, 250);
        clearInterval(fillAnimation);
        setTimeout(function(){
            enemyAttackIndicatorBorder.remove();
        }, 200);
        if(player.health <= 0){
            turnAttackButton(false);
            player.health = 0;
            let playerBounty = player.gold * 34 / 100;
            player.gold = player.gold - playerBounty;
            logEvent(`Recibes ${enemyDamageInput} puntos de daño. Vida actual: 0`);
            setTimeout(function(){
                logEvent(`Has sido derrotado y perdiste ${playerBounty} de Oro (Oro actual: ${player.gold})`);
                setTimeout(function(){
                    logEvent(`${enemy.nickname}: Y ahora... ¡El golpe final...! *Se posiciona glorioso para dar el último golpe y acabar contigo`);
                    setTimeout(function(){
                        logEvent(`Ves una figura gritando "¡Alto ahí!" que va corriendo a saltos hacia la ubicación del combate.`);
                        setTimeout(function(){
                            logEvent(`${enemy.nickname} se va corriendo a toda marcha. En el arranque, se le cae la bolsa de lana rosa en la que puso tu Oro.`);
                            combatOff();
                            player.health = player.maxHealth;
                            setTimeout(function(){
                                player.gold += playerBounty;
                                player.gold += 21.12;
                                logEvent(`Recuperas tu Oro, y resulta que la bolsa tenía aún más. Oro actual de ${player.nickname}: ${player.gold}`);
                                enemy = defeatedMob;
                                combatOff();
                            },2500)
                        },4500)
                    },4500)
                },400)
            }, 200)
        }else{}
    }

    enemyAttackIndicatorBorder.addEventListener('click', clickHandler);

    let fillAnimation = setInterval(function(){
        if (indicatorFill < 100) {
            indicatorFill++;
            enemyAttackIndicatorFill.style.width = `${indicatorFill}%`;
            if(enemy.health <= 0){
                clearInterval(fillAnimation);
                turnAttackButton(false);
                enemyAttackIndicatorBorder.remove();
            }
        } else if (indicatorFill === 100) {
            clearInterval(fillAnimation);
            enemyAttackIndicatorBorder.removeEventListener('click', clickHandler);
            logEvent(`Recibes ${enemyDamageInput} de daño de parte de ${enemy.nickname}.`);

            enemyAttackIndicatorFill.style.backgroundColor = "black";
            player.health = player.health - enemyDamageInput;
            setTimeout(function(){
                logEvent(`Vida actual de ${player.nickname}: ${player.health}`)
            }, 250);
            turnAttackButton(true);
            setTimeout(function(){
                enemyAttackIndicatorBorder.remove();
            }, 250);
            if(player.health <= 0){
                turnAttackButton(false);
                player.health = 0;
                let playerBounty = player.gold * 34 / 100;
                player.gold = player.gold - playerBounty;
                logEvent(`Recibes ${enemyDamageInput} puntos de daño. Vida actual: 0`);
                setTimeout(function(){
                    logEvent(`Has sido derrotado y perdiste ${playerBounty} de Oro (Oro actual: ${player.gold})`);
                    setTimeout(function(){
                        logEvent(`${enemy.nickname}: Y ahora... ¡El golpe final...! *Se posiciona glorioso para dar el último golpe y acabar contigo`);
                        setTimeout(function(){
                            logEvent(`Ves una figura gritando "¡Alto ahí!" que va corriendo a saltos hacia la ubicación del combate.`);
                            setTimeout(function(){
                                logEvent(`${enemy.nickname} se va corriendo a toda marcha. En el arranque, se le cae la bolsa de lana rosa en la que puso tu Oro.`);
                                combatOff();
                                player.health = player.maxHealth;
                                setTimeout(function(){
                                    player.gold += playerBounty;
                                    player.gold += 21.12;
                                    logEvent(`Recuperas tu Oro, y resulta que la bolsa tenía aún más. Oro actual de ${player.nickname}: ${player.gold}`);
                                    enemy = defeatedMob;
                                    combatOff();
                                },2500)
                            },4500)
                        },4500)
                    },400)
                }, 200)
            }else{}
        }
    }, 20);
}


function turnAttackButton(value){
    if(value == true){
        let html = `<button class="attack-button"><b>ATACAR</b></button>`
        actionsContainer.innerHTML = actionsContainer.innerHTML + html;
        let attackButton = document.querySelector('.attack-button');
        attackButton.addEventListener('click', function() {
            attack(user, enemy);
        });
    }else if(value == false){
        let html = ``;
        actionsContainer.innerHTML = html;
    }
};

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function combatOn(rival){
    turnAttackButton(true);
    displayStats(rival);
    turnBattleImageContainer(true,rival.type);
    disableCombatButton();
    combat = true;
    console.log("combat on");
}


let scenes = [0]

function combatOff(){
    turnBattleImageContainer(false,defeatedMob);
    turnAttackButton(false);
    hideStats(enemy);
    disableCombatButton();
    user.health = user.maxHealth;
    combat = false;
    enemy = defeatedMob;
    console.log("combat off")
    if(scenes[0] == "tutorial"){
        setTimeout(function(){
            clearInterval(interval);
            loadTutorialPart2();
            scenes.shift();
            scenes.push(0);
            console.log("tutorial 2");
        }, 2000);
    }else if(scenes[0] == "tutorial3"){
        setTimeout(function(){
            clearInterval(interval);
            loadTutorialPart4();
            scenes.shift();
            scenes.push(0);
            console.log("tutorial 4");
        }, 2000);
    }
}


function enableCombatButton(text,scene){
    let actualScene = scene;
    scenes.shift();
    scenes.push(actualScene);
    console.log(scenes);
    let html = text;
    buttonStartCombat.innerHTML = html;
    buttonStartCombat.classList.remove("invisible");
}

function disableCombatButton(){
    buttonStartCombat.classList.add("invisible");
}


function displayItemDetailedInformation(value){
    console.log("displaying detailed info")
    enemyInfoContainer.innerHTML = `<div class="item-detailed-info-container"></div>`
    let itemDetailedInfoContainer = document.querySelector(".item-detailed-info-container");
    itemDetailedInfoContainer.innerHTML = ``
    itemDetailedInfoContainer.innerHTML = `
    <div class="shop__item__detailed-info item-id-${value.id}">
        <img class="shop__item__detailed-info__icon" src="${value.icon}" alt="Si la imagen no aparece correctamente no es un problema de ruta, es porque simplemente no encontré una imagen y no se dibujar.">
        <p class="shop__item__detailed-info__name">${value.name}</p>
        <p class="shop__item__detailed-info__price">PRECIO: $${value.price}</p>
        <p class="shop__item__detailed-info__health">VIDA: ${value.health}</p>
        <p class="shop__item__detailed-info__resistance">RESISTENCIA: ${value.resistance}</p>
        <p class="shop__item__detailed-info__damage">DAÑO: ${value.damage}</p>
        <p class="shop__item__detailed-info__type">TIPO: ${value.type}</p>
        <button class="shop__item__detailed-info__purchase-button">COMPRAR</button>
    </div>`;
    const buttonPurchaseItem = document.querySelector(".shop__item__detailed-info__purchase-button");
    buttonPurchaseItem.addEventListener('click', function(){
        if(user.gold - value.price >= 0){
            console.log("Buying...");
            if(user1Items.includes(value)){
                buttonPurchaseItem.innerHTML = "YA TIENES ESTE ITEM";
                buttonPurchaseItem.style.border = "2px solid red";
                buttonPurchaseItem.style.color = "red";
                setTimeout(function(){
                    buttonPurchaseItem.innerHTML = "COMPRAR";
                    buttonPurchaseItem.style.border = "2px solid black";
                    buttonPurchaseItem.style.color = "black";
                }, 1000);
            }else{
                user.gold = user1.gold - value.price;
                user1Items.push(value);
                updateStats(user1);
                buttonPurchaseItem.innerHTML = "COMPRASTE ESTE ITEM";
                buttonPurchaseItem.style.border = "2px solid green";
                buttonPurchaseItem.style.color = "green";
                updateInventoryDisplay(user)
                setTimeout(function(){
                    buttonPurchaseItem.innerHTML = "COMPRAR";
                    buttonPurchaseItem.style.border = "2px solid black";
                    buttonPurchaseItem.style.color = "black";
                }, 1000);

                if(value.health > 0){
                    user.health = user.maxHealth;
                };
                displayStats(user);
            }
        }else{
            buttonPurchaseItem.innerHTML = "NO TIENES SUFICIENTE ORO";
            buttonPurchaseItem.style.border = "2px solid red";
            buttonPurchaseItem.style.color = "red"
            setTimeout(function(){
                buttonPurchaseItem.innerHTML = "COMPRAR";
                buttonPurchaseItem.style.border = "2px solid black";
                buttonPurchaseItem.style.color = "black"
            }, 1000);
            console.log("not enough gold");
        }
    })
}

function hideStats(entity){
    let enemyInfoContainer = document.getElementById("enemy-info-container");
    let userInfoContainer = document.getElementById("user-info-container");
    let entityToDisplayInHTML = entity
        if( entityToDisplayInHTML == user1){
        userInfoContainer.innerHTML = ``
}else{
    console.log("not hiding user");
};
if(entityToDisplayInHTML == enemy){
    enemyInfoContainer.innerHTML = ``;
}else{
    console.log("not hiding enemy");
}
}


let inventoryOpen = false;
let inventoryContainer = null;

function createItem(insertItem) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "inventory__item";

    const itemInfoDiv = document.createElement("div");
    itemInfoDiv.className = `inventory__item__info item-id-${insertItem.id}`;

    itemInfoDiv.innerHTML = `
        <img class="inventory__item__icon" src="${insertItem.icon}" alt="">
        <p class="inventory__item__name">${insertItem.name}</p>
    `;
    itemDiv.appendChild(itemInfoDiv);

    return itemDiv;
}

function updateInventoryDisplay(entity) {
    if (!inventoryContainer) {
        inventoryContainer = document.createElement('div');
        inventoryContainer.className = "inventory-container";
    } else {
        inventoryContainer.innerHTML = "";
    }

    if (entity == user) {
        user1Items.forEach((Item) => {
            const itemElement = createItem(Item);
            inventoryContainer.appendChild(itemElement);
        });
    }
}

function handleInventoryButtonClick(entity) {
    let userInfoContainer = document.getElementById("user-info-container");
    let buttonOpenInventory = document.querySelector(".user-info-container__inventory-button");
    if (inventoryOpen) {
        inventoryContainer.innerHTML = "";
        userInfoContainer.removeChild(inventoryContainer);
        buttonOpenInventory.innerHTML = "ABRIR INVENTARIO";
        inventoryOpen = false;
    } else {
        updateInventoryDisplay(entity);
        userInfoContainer.appendChild(inventoryContainer);
        buttonOpenInventory.innerHTML = "CERRAR INVENTARIO";
        inventoryOpen = true;
    }
}

function displayInventoryButton(entity) {
    let buttonOpenInventory = document.createElement("button");
    buttonOpenInventory.className = "user-info-container__inventory-button";
    buttonOpenInventory.innerHTML = "ABRIR INVENTARIO";

    let userInfoContainer = document.getElementById("user-info-container");

    buttonOpenInventory.addEventListener('click', function () {
        handleInventoryButtonClick(entity);
    });
    userInfoContainer.appendChild(buttonOpenInventory);
}
let displayingInventoryButton = false;
let userInfoContainer = document.getElementById("user-info-container");
let userStatsContainer = document.createElement('div');
userStatsContainer.className = "user-stats-container";
userInfoContainer.appendChild(userStatsContainer);

function displayStats(entity){
    let entityToDisplayInHTML = entity;
    if(entity == user){
        userStatsContainer.innerHTML = ``;
        userStatsContainer.innerHTML = `<p>NOMBRE: ${entityToDisplayInHTML.nickname}</p><p>VIDA: ${entityToDisplayInHTML.health}/${entityToDisplayInHTML.maxHealth}</p><p>DAÑO: ${entityToDisplayInHTML.damage}</p><p>RESISTENCIA: ${entityToDisplayInHTML.resistance}</p><p>ORO: ${entityToDisplayInHTML.gold}</p>`;
        console.log("displaying user");
    }else{
        console.log("not display user");
    };
    if(entityToDisplayInHTML == enemy){
        enemyInfoContainer.innerHTML = `<p>NOMBRE: ${entityToDisplayInHTML.nickname}</p><p>VIDA: ${entityToDisplayInHTML.health}/${entityToDisplayInHTML.maxHealth}</p><p>DAÑO: ${entityToDisplayInHTML.damage}</p><p>RESISTENCIA: ${entityToDisplayInHTML.resistance}</p><p>ORO: ${entityToDisplayInHTML.gold}</p>`
        console.log("displaying enemy");
    }else{
        console.log("not display enemy");
    };
};

displayStats(user);
displayInventoryButton(user);
hideStats(enemy);

function attack(dealer, enemyToAttack){
    turnAttackButton(false);
    setTimeout(function() {
        clearInterval(interval);
        turnAttackButton(false);
        logEvent(`Atacas a ${enemy.nickname}!`);
    }, 500);
    let damageInput = dealer.damage - enemyToAttack.resistance;
    damageInput = damageInput + getRandomInt(damageInput/2);
    enemyToAttack.health = enemyToAttack.health - damageInput;
    if (enemyToAttack != dummy){
        if(enemyToAttack.health <= 0){
            setTimeout(function() {
                turnAttackButton(false);
                clearInterval(interval);
                logEvent(`Infliges ${damageInput} puntos de daño. Vida actual de ${enemyToAttack.nickname}: 0`);
                setTimeout(function() {
                    clearInterval(interval);
                    logEvent(enemyToAttack.nickname + " ha sido derrotado.");
                    logEvent(enemyToAttack.nickname + ": Esto no terminará aquí! *Escapa malherido*");
                    enemy = defeatedMob;
                    setTimeout(function() {
                        clearInterval(interval);
                        let enemyToAttackBounty = enemyToAttack.gold * 22;
                        enemyToAttackBounty = enemyToAttackBounty / 100;
                        dealer.gold = dealer.gold + enemyToAttackBounty;
                        enemyToAttack.gold = enemyToAttack.gold - enemyToAttackBounty;
                        logEvent(`Has ganado ${enemyToAttackBounty} de Oro (Oro actual de ${dealer.nickname}: ${dealer.gold}).`);
                        hideStats(enemy);
                        combatOff();
                    }, 750);
                }, 750);
            }, 750);
        }else{
            setTimeout(function() {
                clearInterval(interval);
                logEvent(`Infliges ${damageInput} puntos de daño. Vida actual de ${enemyToAttack.nickname}: ${enemyToAttack.health}`);
            }, 750);
        }
    }else{
        if(enemyToAttack.health <= 0){
        setTimeout(function(){
            logEvent(`El ${enemyToAttack.nickname} se cae épicamente. Sí que le diste su merecido a ese muñeco de tela y cuero.`)
            setTimeout(function(){
                combatOff()
            },300);
        },750);
        }else{
            setTimeout(function() {
                clearInterval(interval);
                turnAttackButton(false);
                logEvent(`Infliges ${damageInput} puntos de daño. Vida actual de ${enemyToAttack.nickname}: ${enemyToAttack.health}`);
            }, 750);
        }
    }

    if(enemyToAttack != dummy){
        let enemyDamageInput = enemyToAttack.damage - dealer.resistance;
        enemyDamageInput = enemyDamageInput + getRandomInt(enemyDamageInput/2);
        console.log("enemydamageinput" + enemyDamageInput);
        enemyAttack(dealer, enemyToAttack, enemyDamageInput);
    } else{
        if(enemyToAttack.health > 0){
            setTimeout(function(){
                logEvent(`${enemy.nickname} te observa con sus ojos de tela.`)
                    turnAttackButton(true);
            }, 1000)
        };
    };
};

