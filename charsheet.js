var $ = function(sel)
{
	return document.querySelectorAll(sel);
}

function getStatField(id)
{
	return $("#"+id)[0];
}

function getStatValue(id)
{
	if (!getStatField(id)) return 0;
	var val = $("#"+id)[0].value;
	if (parseInt(val) == (typeof NaN))
	{
		return val;
	}
	else
	{
		return parseInt(val);
	}
}

function validateRaceAndSpecs()
{
	var raceSelect = getStatField("origin");
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
	//var hitpointField = $;
	//var currentHitpointField = $("#currenthitpoints")[0];
	var strength = getStatValue("strength");
	var level = getStatValue("level");

	var hp = 40 + 3.0 * strength + (level - 1) * strength;
	getStatField("hitpoints").value = hp;

	//healing threshold
	var ht = Math.floor(0.5 * strength) + 5;
	getStatField("healingthreshold").value = ht;

	//damage threshold
	var dt = strength + 12;
	getStatField("damagethreshold").value = dt;
}

function validateAll()
{
	validateRaceAndSpecs();
	calculateHealth();
}

function setupEvents()
{
	var inputs = $("input,select");
	for(var i = 0; i < inputs.length; i++)
	{
		inputs[i].addEventListener("change",validateAll);
	}
}


window.addEventListener("load",function() {
	setupEvents();
});
