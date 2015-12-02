/**
 * Sets the value of stat field.
 * Basically just an alias for setting the field value,
 * perhaps more functionality will be added later.
 * This should only be used for numerical fields.
 *
 * @param {string} id - The id of the stat.
 * @param {number} val - The new value for the stat.
 */
function setStat(id, val)
{
	$("#"+id).val(val);
}

/**
 * Returns the current value of a stat field.
 * Includes base stats if they exist.
 * This should only be used for numerical fields.
 *
 * @param {string} id - The id of the stat.
 * @returns {number} - The value of the stat. Possibly 0 if not found. 
 */
function getStat(id)
{
	var statField = $("#"+id);
	var statBaseField = $("#"+id+"_base");

	var val = +(statField.val());
	var base = +(statBaseField.val());

	var result = val;
	if (!isNaN(base)) result += base;

	if (isNaN(result)) result = 0;

	return result;
}

function validateRaceAndSpecs()
{
	var race = DATA_origins[$("#origin").val()].race;

	/**
	 * Deactivate unavailable specializations
	 */
	var specs = $("#specialization > option").removeAttr("disabled");
	specs.not("[data-race="+race+"]").attr("disabled","");

	/**
	 * Validate ability bonus
	 */	
	var origin = $("#origin").val();

	$("#origin_ability_bonus option").remove();
	var bonuses = DATA_origins[origin].ability_bonuses;
	for(var id in bonuses)
	{
		var text = "";
		for(var desc in bonuses[id])
		{
			var sign = (bonuses[id][desc] >= 0) ? "+" : "";
			text += sign+bonuses[id][desc]+" "+desc.substring(0,1).toUpperCase() + desc.substring(1) + ", ";
		}
		text = text.substring(0,text.length - 2);
		var opt = $("<option>").attr("value",id).html(text);
		opt.appendTo($("#origin_ability_bonus"));
	}

}

function calculateBaseStats()
{
	var ability_bonuses = {"strength":2,"instinct":2,"agility":2,"intelligence":2,"willpower":2}; //Default values for Terran
	var adventuring_bonuses = {}

	var origin = DATA_origins[$("#origin").val()];
	var chosen_ability_bonus = origin.ability_bonuses[$("#origin_ability_bonus").val()];
	var spec = DATA_specializations[$("#specialization").val()];

	// Abilities
	ability_bonuses = merge_stats(ability_bonuses,chosen_ability_bonus,spec.ability_bonuses);

	// Adventuring Skills
	adventuring_bonuses = merge_stats(adventuring_bonuses,origin.adventuring_bonuses,spec.adventuring_bonuses);

	// Set fields
	for (var ability_stat in ability_bonuses)
	{
		$("#ability_"+ability_stat+"_base").val(ability_bonuses[ability_stat]);
	}

	$("input[id^=adventuring_]").filter("[id$=_base]").val(0); // Reset all to default!
	for (var adventuring_stat in adventuring_bonuses)
	{
		$("#adventuring_"+adventuring_stat+"_base").val(adventuring_bonuses[adventuring_stat]);
	}
}


function calculateHealth()
{
	var strength = getStat("ability_strength");
	var level = getStat("level");

	var hp = 40 + (3.0 * strength) + (level - 1) * strength;
	setStat("health_hitpoints",hp);

	//healing threshold
	var ht = Math.floor(0.5 * strength) + 5;
	setStat("health_healingthreshold",ht);

	//damage threshold
	var dt = strength + getStat("prowess_durability") + 12; 
	setStat("health_damagethreshold",dt);
}

function calculateDefense()
{
	var def = 8 + getStat("prowess_defensive") + getStat("ability_agility") + 0; // +0 for medium sized characters
	setStat("defense_defense",def);

	var tou = 8 + getStat("prowess_defensive") + getStat("ability_strength") + 0;
	setStat("defense_toughness",tou);

	var res = 8 + getStat("prowess_mental") + getStat("ability_willpower"); // Talents missing
	setStat("defense_resolve",res);
}

function calculateMovement()
{
	var mov = 4 + Math.floor(0.5 * getStat("ability_agility"));
	setStat("movement_movespeed",mov);

	var shi = 1 + Math.floor(0.2 * getStat("ability_agility"));
	setStat("movement_shiftspeed",shi);

	var ini = getStat("ability_instinct");
	setStat("movement_initiative",ini);
}

function calculateAll()
{
	console.groupCollapsed("Validation");

	calculateBaseStats();
	calculateHealth();
	calculateDefense();
	calculateMovement();

	console.groupEnd();
}

function setupData()
{
	for(var rkey in DATA_races)
	{
		var raceGroup = $("<optgroup>").attr("label",DATA_races[rkey]);

		for(var okey in DATA_origins)
		{
			if (DATA_origins[okey].race != rkey) continue;
			var opt = $("<option>").attr("value",okey).html(DATA_origins[okey].name);
			opt.appendTo(raceGroup);
		}

		raceGroup.appendTo($("#origin"));
	}

	for (var skey in DATA_specializations)
	{
		var specOpt = $("<option>").attr("value",skey).html(DATA_specializations[skey].name);
		specOpt.attr("data-race",DATA_specializations[skey].race);
		specOpt.appendTo($("#specialization")); 
	}
}

function setupEvents()
{
	$("input,select").on("change",calculateAll);

	$("#origin").on("change",validateRaceAndSpecs);

	$("#button_save").on("click",saveAll);
	$("#button_load").on("click",loadAll);
}


$(window).on("load",function() {
		setupData();
		setupEvents();
		validateRaceAndSpecs();
		calculateAll();
});

/**
 * Saving
 */

function getSaveJson()
{
	var fields = document.getElementsByClassName("save");
	var saveData = {};
	for(var i = 0; i < fields.length; i++)
	{
		saveData[fields[i].id] = fields[i].value;
	}
	return btoa(JSON.stringify(saveData));
}

function saveAll()
{
	prompt("Your character: (copy to save)",getSaveJson());
}

function loadAll()
{
	var code = prompt("Paste your character:\n\n");

	var saveData = JSON.parse(atob(code));
	for (var key in saveData)
	{
		document.getElementById(key).value = saveData[key];
	}
	calculateAll();
}

/**
 * Utility stuff
 */

 /**
  * Merges two objects and adds existing values
  *
  * @param object obj1 - First object
  * @param object obj2..objn - More objects
  * @returns object - Resulting object
  */
function merge_stats(obj1)
{
	var new_obj = obj1;
	for (var i = 1; i < arguments.length; i++)
	{
		for (var key in arguments[i])
		{
			value = arguments[i][key];
			if (new_obj.hasOwnProperty(key) && !isNaN(+(value)))
			{
				new_obj[key] += value;
			}
			else
			{
				new_obj[key] = value;
			}
		}
	}
	return new_obj;
}
