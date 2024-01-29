function ItemStats(itemHealth,itemResistance,itemDamage){
    this.health = itemHealth;
    this.resistance = itemResistance;
    this.damage = itemDamage;
}

function Item(itemId,itemStorageName,itemName,itemPrice,itemHealth,itemResistance,itemDamage,itemIcon,itemType){
    this.id = itemId;
    this.storageName = itemStorageName
    this.name = itemName;
    this.price = itemPrice;
    this.health = itemHealth;
    this.resistance = itemResistance;
    this.damage = itemDamage;
    this.icon = itemIcon;
    this.type = itemType;
}

function storageAllItems() {
    for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i];
        localStorage.setItem(item.storageName, JSON.stringify(item));
        console.log(`Succesfully storaged ${item.name} in localStorage!`);
        const storedItem = JSON.parse(localStorage.getItem(item.storageName));
        allItems[i] = storedItem;
    }
}

let trainingChestplateStats = new ItemStats(24, 14, 0);
let trainingChestplate = new Item(1, "trainingChestplate", "Chaleco de Entrenamiento", 16, trainingChestplateStats.health, trainingChestplateStats.resistance, trainingChestplateStats.damage,"https://placeholder.co/500","TORSO");

let trainingPantsStats = new ItemStats(16, 10, 0);
let trainingPants = new Item(2,"trainingPants", "Pantalones de Entrenamiento", 10, trainingPantsStats.health, trainingPantsStats.resistance, trainingPantsStats.damage,"https://placeholder.co/500", "PIERNAS");

let trainingGlovesStats = new ItemStats(2, 2, 6);
let trainingGloves = new Item(3,"trainingGloves", "Guantes de Entrenamiento", 3.5, trainingGlovesStats.health, trainingGlovesStats.resistance, trainingGlovesStats.damage,"./img/items/3.png","GUANTES");

let trainingBootsStats = new ItemStats(5, 6, 0);
let trainingBoots = new Item(4,"trainingBoots", "Botas de Entrenamiento", 6, trainingBootsStats.health, trainingBootsStats.resistance, trainingBootsStats.damage,"https://placeholder.co/500", "PIES");

let trainingHelmetStats = new ItemStats(6, 9, 0);
let trainingHelmet = new Item(5,"trainingHelmet", "Casco de Entrenamiento", 9, trainingHelmetStats.health, trainingHelmetStats.resistance, trainingHelmetStats.damage,"https://placeholder.co/500", "CABEZA");

let trainingSwordStats = new ItemStats(0, 0, 18);
let trainingSword = new Item(6,"trainingSword", "Espada de Entrenamiento", 14, trainingSwordStats.health, trainingSwordStats.resistance, trainingSwordStats.damage,"https://placeholder.co/500", "MANO DERECHA");

let basicMetalDaggerStats = new ItemStats(0, 0, 27);
let basicMetalDagger = new Item(7,"basicMetalDagger", "Daga de Metal Básica", 23.5, basicMetalDaggerStats.health, basicMetalDaggerStats.resistance, basicMetalDaggerStats.damage,"https://placeholder.co/500", "MANO DERECHA");

let ageWornChestplateStats = new ItemStats(14, 9, 0);
let ageWornChestplate = new Item(8,"ageWornChestplate", "Chaleco Viejo y Desgastado", 9, ageWornChestplateStats.health, ageWornChestplateStats.resistance, ageWornChestplateStats.damage,"https://placeholder.co/500","TORSO");

let ageWornPantsStats = new ItemStats(8, 3, 0);
let ageWornPants = new Item(9,"ageWornPants", "Pantalones Viejos y Desgastados", 5, ageWornPantsStats.health, ageWornPantsStats.resistance, ageWornPantsStats.damage, "https://placeholder.co/500", "PIERNAS");

let marketBootsStats = new ItemStats(2, 2, 0);
let marketBoots = new Item(10,"marketBoots", "Botas de Moda", 39, marketBootsStats.health, marketBootsStats.resistance, marketBootsStats.damage, "https://placeholder.co/500", "PIES");

let kerchiefStats = new ItemStats(0, 1, 0);
let kerchief = new Item(11,"kerchief", "Pañuelo", 1, kerchiefStats.health, kerchiefStats.resistance, kerchiefStats.damage,"https://placeholder.co/500", "CARA");

let leatherGlovesStats = new ItemStats(2, 4, 9);
let leatherGloves = new Item(12,"leatherGloves", "Guantes de Cuero Duro", 5.5, leatherGlovesStats.health, leatherGlovesStats.resistance, leatherGlovesStats.damage,"https://placeholder.co/500", "GUANTES");


let allItems = [trainingChestplate, trainingPants, trainingGloves, trainingBoots, trainingHelmet, trainingSword, basicMetalDagger, ageWornChestplate, ageWornPants, marketBoots, kerchief, leatherGloves];

storageAllItems();