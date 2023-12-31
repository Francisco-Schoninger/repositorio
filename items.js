function ItemStats(itemHealth,itemResistance,itemDamage){
    this.health = itemHealth;
    this.resistance = itemResistance;
    this.damage = itemDamage;
}

function Item(itemId,itemName,itemPrice,itemHealth,itemResistance,itemDamage,itemType){
    this.id = itemId;
    this.name = itemName;
    this.price = itemPrice;
    this.health = itemHealth;
    this.resistance = itemResistance;
    this.damage = itemDamage;
    this.type = itemType;
}



let trainingGlovesStats = new ItemStats(0, 2, 6);
let trainingGloves = new Item(1,"Guantes de Entrenamiento", 3.5, trainingGlovesStats.health, trainingGlovesStats.resistance, trainingGlovesStats.damage,"GUANTES");

let trainingChestplateStats = new ItemStats(24, 16, 0);
let trainingChestplate = new Item(2,"Pechera de Entrenamiento", 16, trainingChestplateStats.health, trainingChestplateStats.resistance, trainingGlovesStats.damage,"TORSO");

let trainingPantsStats = new ItemStats(16, 9, 0);
let trainingPants = new Item(3, "Pantalones de Entrenamiento", 10, trainingPantsStats.health, trainingPantsStats.resistance, trainingPantsStats.damage, "PANTALONES");

let trainingBootsStats = new ItemStats(5, 6, 0);
let trainingBoots = new Item(4, "Botas de Entrenamiento", 7, trainingBootsStats.health, trainingBootsStats.resistance, trainingBootsStats.damage, "PIES");

let trainingHelmetStats = new ItemStats(6, 14, 0);
let trainingHelmet = new Item(5, "Casco de Entrenamiento", 9, trainingHelmetStats.health, trainingHelmetStats.resistance, trainingHelmetStats.damage, "CABEZA");

let trainingSwordStats = new ItemStats(0, 0, 18);
let trainingSword = new Item(6, "Espada de Entrenamiento", 14, trainingSwordStats.health, trainingSwordStats.resistance, trainingSwordStats.damage, "UNA MANO");
