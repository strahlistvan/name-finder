var dictionary = getDictionary();

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
	var resultDiv = document.getElementById("result");
	resultDiv.innerHTML = "Please wait!";
	
	allNames = findAllWords(baseText, expectedLength);
	resultDiv.innerHTML = "";
	
	for (var i=0; i<allNames.length; ++i) {
		resultDiv.innerHTML += allNames[i] + "<br />";
	}
	
}