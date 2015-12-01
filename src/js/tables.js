/**
 * A list of data tables that all data is taken from to avoid cluttering the HTML
 */
var DATA_races = {
    "t":"Terran",
    "z":"Zerg",
    "p":"Protoss"
}

var DATA_origins = {
    "core":{
	"name":"Core Citizen",
	"race":"t",
	"point_cost":9,
	"ability_bonuses":[{"intelligence":1,"agility":1,"willpower":1},{"insinct":1}],
	"prowess_bonuses":{"melee":1,"pistol":1,"land":1,"mental":1},
	"adventuring_bonuses":{"lore":1,"influence":1},
	"other_bonuses":{"credits":250}
    },
    "umojan":{
	"name":"Umojan Protectorate",
	"race":"t",
	"point_cost":9,
	"ability_bonuses":[{"willpower":1,"intelligence":2},{"intelligence":1,"instinct":1}],
	"prowess_bonuses":{"pistol":1,"land":1,"mental":2},
	"adventuring_bonuses":{"lore":1,"science":1},
	"other_bonuses":{}
    },
    "kelmorian":{
	"name":"Kel-Morian Combine",
	"race":"t",
	"point_cost":8,
	"ability_bonuses":[{"strength":2,"agility":1},{"intelligence":1}],
	"prowess_bonuses":{"melee":1,"durability":1,"land":1},
	"adventuring_bonuses":{"athletics":1,"endurance":1},
	"other_bonuses":{}
    },
    "colonist":{
	"name":"Fringe Colonist",
	"race":"t",
	"point_cost":12,
	"ability_bonuses":[{"willpower":1},{"intelligence":1}],
	"prowess_bonuses":{"melee":1,"pistol":1,"rifle":1,"explosives":1,"durability":1},
	"adventuring_bonuses":{"acrobatics":1,"endurance":1,"sneak":1},
	"other_bonuses":{"credits":-250}
    },
    "ued":{
	"name":"United Earth Directorate Expedition",
	"race":"t",
	"point_cost":12,
	"ability_bonuses":[{"instinct":2,"strength":2},{"intelligence":2}],
	"prowess_bonuses":{"pistol":1,"rifle":1,"land":1,"aerial":1,"defense":1,"mental":1},
	"adventuring_bonuses":{"tactics":2},
	"other_bonuses":{}
    }

};
