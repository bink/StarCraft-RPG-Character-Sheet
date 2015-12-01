window.addEventListener("load",function() {
	var cols = document.getElementsByClassName("col");
	var parent = null;
	var height = 0;
	for(var i = 0; i < cols.length; i++)
	{
		var col = cols[i];
		if (parent == null || parent != col.parentElement)
		{
			parent = col.parentElement;
			height = parent.offsetHeight;
		}
		col.style.height = height; //subtract padding
	}
});