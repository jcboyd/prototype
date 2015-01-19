var userID;
var wordID;
var definitionID;
var i_dont_know = true;

var translationDefinitionID;

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
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var results_array = JSON.parse(xmlhttp.responseText);

            clear_definitions();
            wordID = results_array[0].ID;

            if(results_array[0].Consensus == 1) {
                set_consensus_word(results_array[0].Word, results_array[0].PartOfSpeech, results_array[0].Definition);
                add_definition(results_array[0].DefinitionID, '✓ That is a good definition');
                for(var i = 1; i < results_array.length; i++) {
                    if(results_array[i].Definition != undefined) {
                        add_definition(results_array[i].DefinitionID, results_array[i].Definition);
                    }
                }
            }
            else {
                set_word(results_array[0].Word, results_array[0].PartOfSpeech);
                for(var i = 0; i < results_array.length; i++) {
                    if(results_array[i].Definition != undefined) {
                        add_definition(results_array[i].DefinitionID, results_array[i].Definition);
                    }
                }
            }
            
            definitionID = -1;
        }
    }
    // alert(token);
    // document.getElementById("token").innerHTML = token;
    xmlhttp.open("GET","php/get_ranked.php?userID=" + userID + "&token=" + token, true);
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
                // document.getElementById('greeting').innerHTML = 'Welcome back, ' + response.name + '!';
                // document.getElementById('profile_name').innerHTML = response.name;
            }
            else {
                // document.getElementById('greeting').innerHTML = 'Welcome, ' + response.name + '!';
                // document.getElementById('profile_name').innerHTML = response.name;
            }
            set_greeting(response.name);
            userID = response.id;
            initialise(userID);
        }
    }
    var noCache = new Date().getTime();
    xmlhttp.open("GET","php/check_user.php?userID=" + response.id + "&noCache=" + noCache, true);
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
            // alert(xmlhttp.responseText);
            var obj = JSON.parse(xmlhttp.responseText);
            set_profile_data(obj.UserID, obj.Points, obj.Position, obj.Notify);
        }
    }
    // document.getElementById("token").innerHTML = token;
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

function get_random_def() {
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
            document.getElementById("translation_word").innerHTML = obj.Word;
            document.getElementById("translation_pos").innerHTML = obj.PartOfSpeech;
            document.getElementById("translation_definition").innerHTML = obj.Definition;
            translationDefinitionID = obj.DefinitionID;
        }
    }
    xmlhttp.open("GET","php/get_random_def.php", true);
    xmlhttp.send();
}

function submit_translation(translation) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var noCache = new Date().getTime();
    xmlhttp.open("GET","php/submit_translation.php?word=" + translation + "&definitionID=" + translationDefinitionID + "&userID=" + userID + "&noCache=" + noCache, true);
    xmlhttp.send();
}
