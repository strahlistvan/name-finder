var dictionary = [];

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

/* Draws the result container table to the result HTML DOM element. */
function drawResultTable(allNames, resultElem, longProjectName) {
	if (allNames.length === 0) {
		resultElem.innerHTML = "No name found for "+longProjectName+" </ br>";
	}
	else {
		resultElem.innerHTML = "";
		
		var resTable = document.createElement("table");
		resTable.className = "table table-striped";
		
		for (var i=0; i<allNames.length; ++i) {
			var row = resTable.insertRow(-1);
			
			var  nameCell = row.insertCell(-1);
			nameCell.innerHTML = allNames[i];
			
			var longNameCell = row.insertCell(-1)
			longNameCell.innerHTML = getCheckedProjectName(allNames[i], longProjectName);
					
		}
		
		//Create a header
		var header = resTable.createTHead();
		//header.style = "font-weight: bold";
		header.className = "thead-inverse";
		var row_h = header.insertRow(0);
		
		var th1 = document.createElement("th");
		th1.innerHTML = "Recommended Project Name";
		var th2 = document.createElement("th");
		th2.innerHTML = "Occurence in Full Project Name";

		row_h.appendChild(th1);
		row_h.appendChild(th2);
		
		//row_h.insertCell(0).innerHTML = "Recommended Project Name";
		//row_h.insertCell(1).innerHTML = "Occurence in Full Project Name";

		resultElem.appendChild(resTable);
	}
	
}

function printAllNames(baseText, expectedLength) {

	//dictionary = [];	
	var xmlhttp = new XMLHttpRequest();
	var done = false;

	var allNames = [];
	var resultElem = document.getElementById("result");
	resultElem.innerHTML = "Please wait!";
	
	var longProjectName = baseText;
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var respStr = this.responseText.toLowerCase().trim();
			var respArr = respStr.split("\n");
			
			//The names are in the first column, separated with comma. We cut the rest of the strings.
			respArr = respArr.map(function(curr) { 
									if (curr.indexOf(" ") === -1) 
										return curr.trim();
									return curr.substring(0, curr.indexOf(" ")).trim(); 
								   } 
								 );
			console.log(respArr);
			
			dictionary = dictionary.concat(respArr);
			allNames = findAllWords(baseText, expectedLength);

			drawResultTable(allNames, resultElem, longProjectName);
			
		}
	};
	
//	xmlhttp.open("GET", "https://cors.io/?http://norvig.com/ngrams/enable1.txt", true);
//	xmlhttp.send();
	
	xmlhttp.open("GET", "https://cors.io/?http://deron.meranda.us/data/census-derived-all-first.txt", true);
	xmlhttp.send();
	
}