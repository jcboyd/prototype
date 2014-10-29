var userID;
var wordID;
var definition_ids=["def1","def2","def3"];

function get_random() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            obj = JSON.parse(xmlhttp.responseText);
            document.getElementById("word").innerHTML = obj.Word;
            document.getElementById("definition").innerHTML = obj.Definition;
        }
    }
    xmlhttp.open("GET","get_random.php", true);
    xmlhttp.send();
}

function get_ranked() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {

            for(var i = 0; i < definition_ids.length; i++) {
                document.getElementById(definition_ids[i]).innerHTML = "-";
            }
            var results_array = JSON.parse(xmlhttp.responseText);
            wordID = results_array[0].ID;
            document.getElementById("word").innerHTML = results_array[0].Word;
            document.getElementById("part_of_speech").innerHTML = results_array[0].PartOfSpeech;

            for(var i = 0; i < results_array.length; i++) {
                if(results_array[i].Definition != undefined) {
                    document.getElementById(definition_ids[i]).innerHTML = results_array[i].Definition;
                }
            }
        }
    }
    document.getElementById("definition").value = "";
    xmlhttp.open("GET","get_ranked.php", true);
    xmlhttp.send();
}

function submit_definition() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var definition = document.getElementById("definition").value;
    xmlhttp.open("GET","submit_definition.php?wordID=" + wordID + "&definition=" + definition + "&userID=" + userID, true);
    xmlhttp.send();
}

function check_user(response) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            obj = JSON.parse(xmlhttp.responseText);
            if(obj.CheckResult == 1) {
                document.getElementById('greeting').innerHTML = 'Welcome back, ' + response.name + '!';
            }
            else {
                document.getElementById('greeting').innerHTML = 'Welcome, ' + response.name + '!';
            }
        }
        userID = response.id;
    }
    var noCache = new Date().getTime();
    xmlhttp.open("GET","check_user.php?userID=" + response.id + "&noCache=" + "noCache", true);
    xmlhttp.send();
}