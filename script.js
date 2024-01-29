
enemy = defeatedMob;
combat = false;
combatOff()



checkStoragedItems(user1Items, "user1Items");
updateStats(user1);
displayStats(user1);

function checkScene(){
    if(localStorage.getItem('lastScene') !== undefined){
        console.log(localStorage.getItem('lastScene'))
        if(localStorage.getItem('lastScene') == '1'){
            loadTutorial();
            checkStoragedItems(user1Items, "user1Items");
            updateStats(user1);
            displayStats(user1);
            updateInventoryDisplay(user1);
        }else if(localStorage.getItem('lastScene') == '2'){
            loadTutorialPart2();
            checkStoragedItems(user1Items, "user1Items");
            updateStats(user1);
            displayStats(user1);
            updateInventoryDisplay(user1);
        }else if(localStorage.getItem('lastScene') == '3'){
            loadTutorialPart3();
            checkStoragedItems(user1Items, "user1Items");
            updateStats(user1);
            displayStats(user1);
            updateInventoryDisplay(user1);
        }else if(localStorage.getItem('lastScene') == '4'){
            loadTutorialPart4();
            checkStoragedItems(user1Items, "user1Items");
            updateStats(user1);
            displayStats(user1);
            updateInventoryDisplay(user1);
        }else if(localStorage.getItem('lastScene') == '5'){
            loadShop(armory);
            checkStoragedItems(user1Items, "user1Items");
            updateStats(user1);
            displayStats(user1);
            updateInventoryDisplay(user1);
        }else{
            logEvent(`¡Bienvenido, jugador! Estás en el cuerpo de Ashley, un aprendiz de guerrero del reino de Viellum.`)
            setTimeout(function(){
            clearInterval(interval);
            logEvent(`Haz click en el botón para empezar el tutorial.`);
            buttonStartTutorial.classList.remove('invisible');
        }, 2000);
        }
    }
};

checkScene()


console.log(`Nombre: ${user1.nickname}\nOro: ${user1.gold}\nVida Máxima: ${user1.maxHealth}\nResistencia: ${user1.resistance}\nDaño: ${user1.damage}`);

function loadTutorial(){
    localStorage.setItem("lastScene", '1')
    logEvent(`Estás en el centro de entrenamiento de guerreros. Es la última hora, pero no te sientes cansado.`);
    setTimeout(function(){
        enemy = dummy;
        logEvent(`Maestro Thomas: Escúchenme, alumnos. Vamos a hacer una última simulación de combate con un objetivo de práctica y después podrán largarse.`);
        setTimeout(function(){
            enableCombatButton(`EL OBJETIVO DE PRÁCTICA NO TE HARÁ DAÑO<br>LA RESISTENCIA ES LA CANTIDAD DE PUNTOS DE DAÑO QUE REDUCIRÁS CUANDO TE ATAQUEN<br>HAZ CLICK EN ESTE BOTÓN PARA INICIAR EL COMBATE`,"tutorial");
        },762);
    }, 4500);
}

function loadTutorialPart2(){
    localStorage.setItem("lastScene", '2')
    enemy = defeatedMob;
    logEvent(`Maestro Thomas: Vaya... Tendré que reparar eso, ${user.nickname}.`);
    setTimeout(function(){
        user1Items.splice(trainingGloves, 1);
        updateStats(user);
        displayStats(user);
        logEvent(`Notas que tus guantes se rompieron. Te los quitas y los tiras a la basura.`);
        setTimeout(function(){
            let html = `<button class="next-button">IR A LA TIENDA</button>`;
            actionsContainer.innerHTML = actionsContainer.innerHTML + html;
            let nextSceneButton = document.querySelector(".next-button");
            nextSceneButton.addEventListener('click',function(){
                loadTutorialPart3();
                nextSceneButton.classList.add("invisible");
            })
        },1000)
    },1000);
}

function loadTutorialPart3(){
    localStorage.setItem("lastScene", '3')
    setTimeout(function() {
        clearInterval(interval);
        logEvent(`Terminas el día de entrenamiento con tus compañeros.`)
        setTimeout(function() {
            clearInterval(interval);
            logEvent(`Estás saliendo del centro de entrenamiento de guerreros, te vas por una calle poco transitada rumbo a la armería local de Kethis, la ciudad en la que estás.`);
            setTimeout(function() {
                clearInterval(interval);
                enemy = mob1;
                logEvent(`Te sorprende ${mob1.nickname}, un hombre delgado vestido de ropa desgastada, unas botas de moda caras y un pañuelo naranja que le tapa la boca. Tiene una daga relativamente bien cuidada en su mano derecha.`);turnBattleImageContainer(true, "BANDIT");
                setTimeout(function() {
                    clearInterval(interval);
                    logEvent(`Bandido Springs: Hey, tú! Dame lo que tengas, debilucho. Un simple novato del arte de las peleas no podrá contra mí, el grandioso Springs`);
                    setTimeout(function() {
                    clearInterval(interval);
                    enableCombatButton('BANDIDO SPRINGS TE ATACARÁ Y TE INFLIGIRÁ DAÑO<br>PARA BLOQUEAR UNA PARTE DEL DAÑO, CLICKEA EN LOS CUADRADOS QUE APARECERÁN<br>SI EL CUADRADO SE LLENA, RECIBIRÁS MUCHO DAÑO', "tutorial3");
                    }, 893);
                }, 5000);
            }, 4000);
        }, 3000);
    }, 500);
}

function loadTutorialPart4(){
    localStorage.setItem("lastScene", '4')
    setTimeout(function(){
        logEvent(`*Llega corriendo el Guardia Grewis, un hombre de estatura baja, cuerpo obeso y una papada que le recorre de oreja a oreja. Lleva puesta una armadura propia de los guardias de Kethis*`)
        setTimeout(function(){
            logEvent(`Guardia Grewis: Maldita sea, se me escapó ese estúpido de Bandido Springs... Ya es la tercera vez que lo hace`);
            setTimeout(function(){
                logEvent(`Guardia Grewis: Bien hecho, honorable ciudadano. Te defendiste heróicamente de ese Bandido`);
                setTimeout(function(){
                    logEvent(`Guardia Grewis: Ah, ¿qué quién es? Ese sujeto se llama Benson Springs, pero se hace llamar "Grandioso Springs", "Lord Springs", entre otros apodos ficticios.`);
                    setTimeout(function(){
                        logEvent(`Guardia Grewis: Es miembro del clan de los Bandidos de Merlog, un clan criminal que usurpa terrenos de Viellum y otros reinos.`);
                        setTimeout(function(){
                            logEvent(`Guardia Grewis: A pesar de hacerse llamar "grandioso" o "lord", no es más que uno de los miembros más abajo en el estatus del clan. Sería el primero en ser abandonado por su propia gente.`);
                            setTimeout(function(){
                                logEvent(`Guardia Grewis: En fin, debo retirarme. ¡Adiós!`)
                                setTimeout(function(){
                                    let html = `<button class="next-button">ENTRAR A LA ARMERÍA DE KETHIS</button>`;
                                    actionsContainer.innerHTML = actionsContainer.innerHTML + html;
                                    let nextSceneButton = document.querySelector(".next-button");
                                    nextSceneButton.addEventListener('click',function(){
                                        loadShop(armory);
                                        nextSceneButton.classList.add("invisible");
                                        localStorage.setItem("lastScene", '5')
                                    })
                                }, 600)
                            }, 8000)
                        }, 8000)
                    }, 8000)
                }, 5000)
            }, 5000);
        }, 6000);
    }, 4500);
}