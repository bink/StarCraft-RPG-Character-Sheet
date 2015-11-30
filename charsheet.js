var $ = function(sel)
{
	var elements = document.querySelectorAll(sel);
	if (elements.length == 1)
	{
		return elements[0];
	}
	else if (elements.length < 1)
	{
		return false;
	}
	else
	{
		return elements;
	}
}


function setStatValue(id, val)
{
	$("#"+id).value = val;
}

function getStatValue(id)
{
	var statField = $("#"+id);
	var statBaseField = $("#"+id+"_base");

	var val = 0;
	var base = 0;

	if (statBaseField)
	{
		base = parseInt(statBaseField.value);
	}

	if (statField)
	{
		val = parseInt(statField.value);
	}
	if (!val) val = 0;
	if (!base) base = 0;

	return val + base;
}

function validateRaceAndSpecs()
{
	var raceSelect = $("#origin");
	var race = raceSelect.options[raceSelect.selectedIndex].getAttribute("data-race");
	/**
	 * Deactivate unavailable specializations
	 */
	var specs = $("#specialization > option");
	for(var i = 0; i < specs.length; i++)
	{
		if (specs[i].getAttribute("data-race") != race)
		{
			specs[i].setAttribute("disabled","");
		}
		else
		{
			specs[i].removeAttribute("disabled");
		}
	}
}

function calculateHealth()
{
	var strength = getStatValue("ability_strength");
	var level = getStatValue("level");

	var hp = 40 + (3.0 * strength) + (level - 1) * strength;
	setStatValue("health_hitpoints",hp);

	//healing threshold
	var ht = Math.floor(0.5 * strength) + 5;
	setStatValue("health_healingthreshold",ht);

	//damage threshold
	var dt = strength + 12; //TODO add correct calculation
	setStatValue("health_damagethreshold",dt);
}

function calculateDefense()
{
	var def = 8 + getStatValue("prowess_defensive") + getStatValue("ability_agility") + 0; // +0 for medium sized characters
	setStatValue("defense_defense",def);

	var tou = 8 + getStatValue("prowess_defensive") + getStatValue("ability_strength") + 0;
	setStatValue("defense_toughness",tou);

	var res = 8 + getStatValue("prowess_mental") + getStatValue("ability_willpower"); // Talents missing
	setStatValue("defense_resolve",res);
}

function calculateMovement()
{
	var mov = 4 + Math.floor(0.5 * getStatValue("ability_agility"));
	setStatValue("movement_movespeed",mov);

	var shi = 1 + Math.floor(0.2 * getStatValue("ability_agility"));
	setStatValue("movement_shiftspeed",shi);

	var ini = getStatValue("ability_instinct");
	setStatValue("movement_initiative",ini);
}

function validateAll()
{
	validateRaceAndSpecs();
	calculateHealth();
	calculateDefense();
	calculateMovement();
}

function setupEvents()
{
	var inputs = $("input,select");
	for(var i = 0; i < inputs.length; i++)
	{
		inputs[i].addEventListener("change",validateAll);
	}

	document.getElementById("button_save").addEventListener("click",saveAll);
	document.getElementById("button_load").addEventListener("click",loadAll);
}


window.addEventListener("load",function() {
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