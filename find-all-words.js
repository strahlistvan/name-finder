function findAllWords(baseText, expectedLength) {

	var allWords = [];	
	var currentWord = "";
	
	baseText = baseText.toLowerCase().replace(/\s+/g, "");
	
	console.log("Béztext: " +baseText);
	
	dictionary = getDictionary();
	
	if (!dictionary) {
		console.log("Dictionary not available");
		return;
	}
		
	console.log("Diksöneriszájz: "+dictionary.length);

	console.log("Find all words running");


	function findAll(baseText, currentWord) {
		if (baseText.length === 0 || currentWord.length >= expectedLength) {
			
			if (dictionary.indexOf(currentWord) !== -1 && allWords.indexOf(currentWord) === -1) {
				console.log("Founded: " + currentWord);
				allWords.push(currentWord);
			}
			return;			
		}
		
		//If exactly expectedLength needed
	//	if (currentWord.length + baseText.length < expectedLength) {
	//		return;
	//	}
		
		var firstChar = baseText.substring(0, 1);
		baseText = baseText.substring(1);
		
		findAll(baseText, currentWord + firstChar);
		findAll(baseText, currentWord);
			
	}
	
	
	findAll(baseText, currentWord);
	console.log("Find all words running Done. allWords.length = " + allWords.length);

	return allWords;
}

//var allWordsTest = findAllWords("asdfg", 2);
//console.log("Allwordstest :" + allWordsTest);
