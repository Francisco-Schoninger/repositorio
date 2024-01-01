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

let user1Stats = new Stats(312, 312, 17, 53)
let user1 = new User("Ashley",60,user1Stats.maxHealth,user1Stats.health,user1Stats.resistance,user1Stats.damage,"PLAYER");

let mob1Stats = new Stats(320, 320, 4, 62)
let mob1 = new User("Bandido Springs",96,mob1Stats.maxHealth,mob1Stats.health,mob1Stats.resistance,mob1Stats.damage,"BANDIT");

let defeatedMobStats = new Stats(0,0,0,0);
let defeatedMob = new User("NO ENEMY", 0, defeatedMobStats.maxHealth,defeatedMobStats.health,defeatedMobStats.resistance, defeatedMobStats.damage,"NONE");

let dummyStats = new Stats(user1Stats.damage * 5, user1Stats.damage * 5, null, null);
let dummy = new User("Objetivo de Práctica", 0, dummyStats.maxHealth,dummyStats.health,dummyStats.resistance,dummyStats.damage, "DUMMY");


let enemy = defeatedMob;
let user = user1;


const interval = setInterval(1000);


let actionsContainer = document.querySelector("#actions-container");


let enemyInfoContainer = document.getElementById("enemy-info-container");

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function combatOn(){
    turnAttackButton(true);
    displayStats(enemy);
    disableCombatButton();
    combat = true;
    console.log("combat on");
}


let scenes = [0]

function combatOff(){
    turnAttackButton(false);
    hideStats(enemy);
    disableCombatButton();
    combat = false;
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
        <img class="shop__item__detailed-info__icon" src="https://placeholder.co/400" alt="">
        <p class="shop__item__detailed-info__name">${value.name}</p>
        <p class="shop__item__detailed-info__price">PRECIO: $${value.price}</p>
        <p class="shop__item__detailed-info__health">VIDA: ${value.health}</p>
        <p class="shop__item__detailed-info__resistance">RESISTENCIA: ${value.resistance}</p>
        <p class="shop__item__detailed-info__damage">DAÑO: ${value.damage}</p>
        <p class="shop__item__detailed-info__type">TIPO: ${value.type}</p>
    </div>`;
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

function displayStats(entity){
    let enemyInfoContainer = document.getElementById("enemy-info-container");
    let userInfoContainer = document.getElementById("user-info-container");
    let entityToDisplayInHTML = entity;
    if(entity == user){
        userInfoContainer.innerHTML = `<p>NOMBRE: ${entityToDisplayInHTML.nickname}</p><p>VIDA: ${entityToDisplayInHTML.health}/${entityToDisplayInHTML.maxHealth}</p><p>DAÑO: ${entityToDisplayInHTML.damage}</p><p>RESISTENCIA: ${entityToDisplayInHTML.resistance}</p><p>ORO: ${entityToDisplayInHTML.gold}</p>`;
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

    if (enemyToAttack != dummy){
        let enemyAttackProbability = getRandomInt(100);
        if(enemyAttackProbability >= 20 && enemyToAttack.health > 0){
            let enemyDamageInput = enemyToAttack.damage - dealer.resistance;
            enemyDamageInput = enemyDamageInput + getRandomInt(enemyDamageInput/2);
            console.log("enemydamageinput" + enemyDamageInput);
            setTimeout(function() {
                clearInterval(interval);
                logEvent(`${enemyToAttack.nickname} te ataca!`);
                setTimeout(function() {
                    if(dealer.health <= 0){
                        let dealerBounty = dealer.gold * 34 / 100;
                        dealer.gold = dealer.gold - dealerBounty;
                        logEvent(`Recibes ${enemyDamageInput} puntos de daño. Vida actual: 0`);
                        logEvent(`Has sido derrotado y perdiste ${dealerBounty} de Oro (Oro actual: ${dealer.gold})`);
    
                        combatOff();
                        dealer.health = dealer.maxHealth;
                    }else{
                        logEvent(`Recibes ${enemyDamageInput} puntos de daño. Vida actual: ${dealer.health}`);
                        turnAttackButton(true)
                    }
                }, 750);
            }, 750);
            dealer.health = dealer.health - enemyDamageInput;
        }else if(enemyToAttack.health <= 0){
            combatOff()
            enemyToAttack.health = enemyToAttack.maxHealth;
            dealer.health = dealer.maxHealth;
        }else{
            setTimeout(function(){
                logEvent(`${enemyToAttack.nickname} te ataca! Pero falla el ataque.`);
                turnAttackButton(true);
            },750)
        };
    }else if(enemyToAttack.health <= 0){
        enemyToAttack.health = enemyToAttack.maxHealth;
        dealer.health = dealer.maxHealth;
    }
    else{
        if(enemyToAttack.health > 0){
            setTimeout(function(){
                logEvent(`${enemy.nickname} te observa con sus ojos de tela.`)
                turnAttackButton(true);
            }, 1000)
        };
    };
};

