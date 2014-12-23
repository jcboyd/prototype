var userID;
var wordID;
var definitionID;
// var token = '<?php echo $newToken; ?>';

//TODO: GENERALISE SERVER REQUESTS

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
    xmlhttp.open("GET","php/get_random.php", true);
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
        document.getElementById("word").innerHTML = xmlhttp.responseText;
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
    xmlhttp.open("GET","php/get_ranked.php?userID=" + userID, true);
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
    xmlhttp.open("GET","php/submit_definition.php?wordID=" + wordID + "&definition=" + definition + "&userID=" + userID, true);
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
                document.getElementById('profile_name').innerHTML = response.name;
            }
            else {
                document.getElementById('greeting').innerHTML = 'Welcome, ' + response.name + '!';
                document.getElementById('profile_name').innerHTML = response.name;
            }
            userID = response.id;
            initialise(userID);
        }
    }
    var noCache = new Date().getTime();
    xmlhttp.open("GET","php/check_user.php?userID=" + response.id + "&noCache=" + "noCache", true);
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
            set_profile_data(obj.UserID, obj.Points, obj.Position, obj.Notify);
        }
    }
    var token = document.getElementById("token").innerHTML;
    xmlhttp.open("GET","php/get_profile.php?userID=" + userID + "&token=" + token, true);
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
            if(results_array != undefined) {
                for(var i = 0; i < results_array.length; i++) {
                    if(results_array[i].Definition != undefined) {
                        add_trophy(results_array[i].Word, results_array[i].Definition);
                    }
                }
            }
        }
    }
    xmlhttp.open("GET","php/get_trophies.php?userID=" + userID, true);
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

    xmlhttp.open("GET","php/submit_vote.php?wordID=" + wordID + "&definitionID=" + definition_id + "&vote=" + vote, true);
    xmlhttp.send();
}

function report_spam(definition_id) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","php/report_spam.php?wordID=" + wordID + "&definitionID=" + definition_id + "&userID=" + userID, true);
    xmlhttp.send();
}

function complete_notification() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","php/complete_notification.php?userID=" + userID, true);
    xmlhttp.send();
}