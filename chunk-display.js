function copyToClipboard(text) {
	// Create a temporary input element
	var tempInput = document.createElement("input");
	tempInput.style.position = "absolute";
	tempInput.style.left = "-1000px";
	tempInput.value = text;
	document.body.appendChild(tempInput);

	// Select the text in the input element and copy it to the clipboard
	tempInput.select();
	document.execCommand("copy");

	// Remove the temporary input element
	document.body.removeChild(tempInput);
}

function displayChunks() {
	// Get the text input element and the word count element
	var textInput = document.getElementById("text-input");
	var wordCount = document.getElementById("word-count");

	// Split the text into chunks of 500 words each
	var words = textInput.value.match(/\b\w+\b/g);
	var numWords = words ? words.length : 0;
	var chunks = [];
	for (var i = 0; i < numWords; i += 500) {
		chunks.push(words.slice(i, i + 500).join(" "));
	}

	// Define a recursive function to display the chunks
	var currentChunk = 0;
	function displayChunk() {
		// Display the current chunk
		wordCount.innerHTML += "<p>" + chunks[currentChunk] + "</p><button onclick=\"copyToClipboard('" + chunks[currentChunk] + "')\">Copy</button>";

		// Increment the current chunk index
		currentChunk++;

		// If there are more chunks, add a click event listener to the copy button to display the next chunk
		if (currentChunk < chunks.length) {
			var copyButton = wordCount.getElementsByTagName("button")[currentChunk - 1];
			copyButton.addEventListener("click", function() {
				wordCount.innerHTML = wordCount.innerHTML.replace(copyButton.outerHTML, "");
				displayChunk();
			});
		}
	}

	// Start the display process
	displayChunk();
}
