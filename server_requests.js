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
    xmlhttp.open("GET","get_random.php",true);
    xmlhttp.send();
}

function check_user(userid) {
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
            return obj.CheckResult;
        }
    }
    xmlhttp.open("GET","check_user.php?userID=" + userid,true);
    xmlhttp.send();
}