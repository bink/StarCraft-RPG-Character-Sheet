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
	var race = $("#origin option:selected").attr("data-race");

	/**
	 * Deactivate unavailable specializations
	 */
	var specs = $("#specialization > option").removeAttr("disabled");
	specs.not("[data-race="+race+"]").attr("disabled","");
	
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

function validateAll()
{
	validateRaceAndSpecs();
	calculateHealth();
	calculateDefense();
	calculateMovement();
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
}

function setupEvents()
{
	$("input,select").on("change",validateAll);
	
	$("#button_save").on("click",saveAll);
	$("#button_load").on("click",loadAll);
}


$(window).on("load",function() {
	setupData();
	setupEvents();
	validateAll();
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
	alert("Your character:\n\n"+getSaveJson());
}

function loadAll()
{
	var code = prompt("Paste your character:\n\n");

	var saveData = JSON.parse(atob(code));
	for (var key in saveData)
	{
		document.getElementById(key).value = saveData[key];
	}
	validateAll();
}
