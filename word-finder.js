function getDictionary() {

	var dictionary = [];	
	var xmlhttp = new XMLHttpRequest();
	var done = false;
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			//done = false;
			var respStr = this.responseText.toLowerCase().trim();
			var respArr = respStr.split("\n");
			respArr = respArr.map(function(curr) { 
									if (curr.indexOf(" ") === -1 ) 
										return curr.trim();
									return curr.substring(0, curr.indexOf(" ")).trim(); 
								   } 
								 );
			console.log(respArr);
			
			//document.body.innerHTML += JSON.stringify(respArr);
			dictionary = respArr;
		}
	};
	
//	xmlhttp.open("GET", "https://cors.io/?http://norvig.com/ngrams/enable1.txt", true);
//	xmlhttp.send();

	xmlhttp.open("GET", "https://cors.io/?http://deron.meranda.us/data/census-derived-all-first.txt", false);
	xmlhttp.send();

	return dictionary;
	
}
		