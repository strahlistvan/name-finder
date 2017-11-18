function getDictionary() {
	
	var dictionary = [];
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var respStr = this.responseText.toLowerCase().trim();
			var respArr = respStr.split("\n");
			respArr = respArr.map(function(curr) { 
									if (curr.indexOf(" ") === -1 ) 
										return curr.trim();
									return curr.substring(0, curr.indexOf(" ")).trim(); 
								   } 
								 );
			console.log(respArr);
			
			document.body.innerHTML += JSON.stringify(respArr);
			
			dictionary.concat(respArr);
			
			
			//console.log(this.responseText);
			//var myObj = JSON.parse(this.responseText);
			//document.getElementById("demo").innerHTML = myObj.name;
		}
	};
	
//	xmlhttp.open("GET", "https://cors.io/?http://norvig.com/ngrams/enable1.txt", true);
//	xmlhttp.send();

	xmlhttp.open("GET", "https://cors.io/?http://deron.meranda.us/data/census-derived-all-first.txt", true);
	xmlhttp.send();
}


function findAllWords(baseText, expectedLength) {
	
	var currentWord = "";
	
	function findAll(baseText, currentWord) {
		
		if (baseText.length === 0 || currentWord.length >= expectedLength) {
			
			console.log("Founded: " + currentWord);
			return;			
		}
		
		//if (currentWord.length + baseText.length < expectedLength) {
		//	return;
		//}
		
		var lastChar = baseText.slice(-1);
		baseText = baseText.slice(0, -1);
		
		findAll(baseText, currentWord + lastChar);
		findAll(baseText, currentWord);
		
	}
	
	console.log('EXPECTED LENGHT : ' + expectedLength);
	findAll(baseText, currentWord, expectedLength);
	
}

window.onload = function() {
	var dictionary = getDictionary();
	
}