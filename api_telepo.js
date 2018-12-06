/*
The code below demonstrates API calls from within JS to the Micloud Office Telepo API.
Full functions available @ https://solar.co.uk/wp-content/uploads/2015/12/MiCloud-Office-Telepo-API-Guide.pdf
@Contact: braam.vanhavermaet*bkm.be
*/

//Global variables.
var baseUrl = "https://bcs.hexacom.be/api";
var domain = "";
var user = "";
var token = "";

/*
 * Functions
	* Mainfunctions
		- initVars(): set input values to vars.
		- apiCall() > 3 arguments: method,url,fn
			This is the main function that interacts with the server API.
	* Getters
		- getContactsId(): retrieve xml for contacts, with callback function parseContactsID. 
	* Setters
		- setNoteId() > 1 argument: userID, change note value for supplied userID.
	* Parsers
	    - parseContactsID: example for loop that outputs all contactID's for given domain.
*/
function initVars() {
	domain = document.getElementById('domain').value;
    user = "/" + document.getElementById('user').value;
    token = "/?t=" + document.getElementById('token').value;
}
function apiCall(method, url, fn) {
    //method: GET, POST, PUT, DELETE, PATCH
    //url: api url path, base url set above.
	//fn --> callback function.
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            fn(this);
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}

function getContactsID() {
	initVars(); //initialize inputboxes.
    var fullURL = baseUrl + "/contacts/list/" + domain + user + token; 
    apiCall('GET', fullURL, parseContactsID); //get xml response and feed it to parseContactsID function.
}

function setNoteID(userID) {
	initVars(); //initialize inputboxes.
	var note = prompt("Please enter note", "");
    var fullURL = baseUrl + "/user/info/" + domain + "/" + userID + "/note/" + note + token; 
    apiCall('PUT', fullURL, null); //no callback function needed.
}

function parseContactsID(xml) {
	//display all contactsID (first part of contact id > mail format).
	var xmlDoc, contacts, contactID, contactIDshort, i, txt;
	xmlDoc = xml.responseXML;
	contacts = xmlDoc.getElementsByTagName('contact');
    txt = "";
    for (var i = 0; i < contacts.length; i++) {
        contactID = contacts[i].getAttributeNode('id');
        contactID = contactID.nodeValue;
        contactIDshort = contactID.substring(0, contactID.lastIndexOf("@"));
        txt += contactIDshort + "<br/>";
    }
    document.getElementById("response").innerHTML = txt;
}