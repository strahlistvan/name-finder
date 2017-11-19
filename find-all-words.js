	var allWords = [];


	function findAll(baseText, currentWord, expectedLength) {

		if (baseText.length === 0 || currentWord.length >= expectedLength) {
			
			console.log("Founded: " + currentWord);
		//	if (dictionary.contains(currentWord) && !allWords.contains(currentWord)) {
				allWords.push(currentWord);
		//	}
			return;			
		}
		
		//if (currentWord.length + baseText.length < expectedLength) {
		//	return;
		//}
		
		var firstChar = baseText.substring(0, 1);
		baseText = baseText.substring(1);
		
		findAll(baseText, currentWord + firstChar, expectedLength);
		findAll(baseText, currentWord, expectedLength);
			
	}


function findAllWords(baseText, expectedLength) {
	
	var currentWord = "";
	
	console.log("Find all words running");
	
	
	
	findAll(baseText, currentWord, expectedLength);
	console.log("Find all words running Done. allWords.length = " + allWords.length);

	return allWords;
}

//var allWordsTest = findAllWords("asdfg", 2);
//console.log("Allwordstest :" + allWordsTest);
