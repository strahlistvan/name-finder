var dictionary = getDictionary();
var longProjectName;

function getCheckedProjectName(shortName, longName) {
	var j = 0;
	var shortName  = shortName.toLowerCase();
	var longName   = longName.toLowerCase();
	var returnText = "";
	
	for (i=0; i<longName.length; ++i) {
		if(longName[i] == shortName[j]) {
			returnText += longName[i].toUpperCase();
			++j;
		}
		else {
			returnText += longName[i];
		}
	}
	
	if (j !== shortName.length)  {
		alert("Error!");
		return null;
	}
	
	return returnText;
}

function findAllWords(baseText, expectedLength) {

	var allWords = [];	
	var currentWord = "";
	
	baseText = baseText.toLowerCase().replace(/\s+/g, "");	
	
	if (!dictionary) {
		console.log("Dictionary not available");
		dictionary = getDictionary();
	}
		
	function findAll(baseText, currentWord) {
		if (baseText.length === 0 || currentWord.length >= expectedLength) {
			
			if (dictionary.indexOf(currentWord) !== -1 && allWords.indexOf(currentWord) === -1) {
				console.log("Founded: " + currentWord);
				
				//redraw?
			//	document.getElementById("result").display = 'none';
			//	document.getElementById("result").display = 'block';
			//	document.getElementById("result").innerHTML += currentWord + "<br />";

				allWords.push(currentWord);
			}
			return;			
		}
		
		//If exactly expectedLength needed
		if (currentWord.length + baseText.length <= expectedLength) {
			return;
		}
		
		var firstChar = baseText[0];
		baseText = baseText.substring(1);
		
		findAll(baseText, currentWord + firstChar);
		findAll(baseText, currentWord);
			
	}
		
	findAll(baseText, currentWord);
	console.log("Find all words running Done. allWords.length = " + allWords.length);

	return allWords;
}

function printAllNames(baseText, expectedLength) {

	var allNames = [];
	var resultElem = document.getElementById("result");
	resultElem.innerHTML = "Please wait!";
	
	longProjectName = baseText;
	allNames = findAllWords(baseText, expectedLength);
	
	if (allNames.length === 0) {
		resultElem.innerHTML = "No name found for "+longProjectName+" </ br>";
	}
	else {
		resultElem.innerHTML = "";
	}
	
	var resTable = document.createElement("table");
	resTable.className = "table table-striped";
	
	for (var i=0; i<allNames.length; ++i) {
		var row = resTable.insertRow(-1);
		
		var  nameCell = row.insertCell(-1);
		nameCell.innerHTML = allNames[i];
		
		var longNameCell = row.insertCell(-1)
		longNameCell.innerHTML = getCheckedProjectName(allNames[i], longProjectName);
				
	}
	resultElem.appendChild(resTable);
	
}