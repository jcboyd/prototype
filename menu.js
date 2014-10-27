function change_view() {
	if(document.getElementById("right_page").style.display == "none") {
		document.getElementById("about_page").style.display = "none";
		document.getElementById("right_page").style.display = "inline-table";
	}
	else {
		document.getElementById("right_page").style.display = "none";
		document.getElementById("about_page").style.display = "inline-table";
	}
}