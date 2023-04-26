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

	// Display the word count
	wordCount.innerText = "This text contains " + numWords + " words.";

	// Check if the number of words exceeds 500
	if (numWords > 500) {
		// Calculate the number of chunks required
		var numChunks = Math.ceil(numWords / 500);

		// Display the number of chunks ll
		wordCount.innerText += " This text exceeds 500 words and requires " + numChunks + " chunks.";

	// Define a function to add the event listener to the copy button
	function addCopyButtonListener(copyButton, chunkElem, chunkIndex) {
        copyButton.addEventListener("click", function() {
            // Get the text of the current chunk
            var currentChunkText = chunkElem.innerText;
    
            // Copy the text of the current chunk to the clipboard
            copyToClipboard(currentChunkText);
    
            // Remove the current chunk and copy button
            var chunkToRemove = chunkElem;
            var copyButtonToRemove = copyButton;
            wordCount.removeChild(chunkToRemove);
            wordCount.removeChild(copyButtonToRemove);
    
            // If there are more chunks, display the next chunk
            if (chunkIndex < chunks.length - 1) {
                displayChunk(chunkIndex + 1);
            }
        });
    }
    

	// Define a function to display the chunk
	function displayChunk(chunkIndex) {
		// Clear the word count element
		wordCount.innerHTML = "";

		// Display the current chunk
		var chunkElem = document.createElement("p");
		chunkElem.innerText = chunks[chunkIndex];
		wordCount.appendChild(chunkElem);

		var copyButton = document.createElement("button");
		copyButton.innerText = "Copy";
		wordCount.appendChild(copyButton);

		// Get the copy button element and add the event listener to it
		addCopyButtonListener(copyButton, chunkElem, chunkIndex);
	}

	// Start the display process
	displayChunk(0);
}

