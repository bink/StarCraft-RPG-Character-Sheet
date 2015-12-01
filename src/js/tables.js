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
    }
};
