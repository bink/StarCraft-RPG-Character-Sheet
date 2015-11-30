var $ = function(sel)
{
	return document.querySelectorAll(sel);
}


function validateAll()
{
	console.log("Validating");
	var raceSelect = $("#origin")[0];
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

function setupEvents()
{
	var inputs = $("input,select");
	console.log(inputs);
	for(var i = 0; i < inputs.length; i++)
	{
		inputs[i].addEventListener("change",validateAll);
	}
}


window.addEventListener("load",function() {
	setupEvents();
});
