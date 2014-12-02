var userID;
var wordID;
var definitionID;

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
            var results_array = JSON.parse(xmlhttp.responseText);

            clear_definitions();
            wordID = results_array[0].ID;
            set_word(results_array[0].Word, results_array[0].Full, results_array[0].UserID);

            for(var i = 0; i < results_array.length; i++) {
                if(results_array[i].Definition != undefined) {
                    add_definition(results_array[i].DefinitionID, results_array[i].Definition);
                }
            }
            definitionID = -1;
        }
    }
    xmlhttp.open("GET","get_ranked.php?userID=" + userID, true);
    xmlhttp.send();
}

function submit_definition(definition) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
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
        set_avatar(userID);
    }
    var noCache = new Date().getTime();
    xmlhttp.open("GET","check_user.php?userID=" + response.id + "&noCache=" + "noCache", true);
    xmlhttp.send();
}

function get_user_stats() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var obj = JSON.parse(xmlhttp.responseText);
            set_profile_data(obj.UserID, obj.Points);
        }
    }
    xmlhttp.open("GET","get_profile.php?userID=" + userID, true);
    xmlhttp.send();
}

function get_user_trophies() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var results_array = JSON.parse(xmlhttp.responseText);
            document.getElementById("profile_trophies").innerHTML = xmlhttp.responseText;

            // for(var i = 0; i < results_array.length; i++) {
            //     if(results_array[i].Definition != undefined) {
            //         add_definition(results_array[i].DefinitionID, results_array[i].Definition);
            //     }
            // }
        }
    }
    xmlhttp.open("GET","get_trophies.php?userID=" + userID, true);
    xmlhttp.send();
}

function submit_vote(definition_id, vote) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","submit_vote.php?wordID=" + wordID + "&definitionID=" + definition_id + "&vote=" + vote, true);
    xmlhttp.send();
}