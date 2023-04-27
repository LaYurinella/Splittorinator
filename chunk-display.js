function copyToClipboard(text) {
	// Create a temporary input element
	const tempInput = document.createElement("input");
	tempInput.style = "position: absolute; left: -1000px;";
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
	const textInput = document.getElementById("text-input");
	const wordCount = document.getElementById("text-display");
  
	// Split the text into chunks of 2000 words each
	const words = textInput.value.match(/\b\w+\b/g) || [];
	const chunks = [];
	for (let i = 0; i < words.length; i += 2000) {
	  chunks.push(words.slice(i, i + 2000).join(" "));
	}
  
	// Define a function to add the event listener to the copy button
	function addCopyButtonListener(copyButton, chunkElem, chunkIndex) {
	  copyButton.addEventListener("click", () => {
		// Get the text of the current chunk
		const currentChunkText = chunkElem.innerText;
  
		// Copy the text of the current chunk to the clipboard
		copyToClipboard(currentChunkText);
  
		// Remove the current chunk and copy button
		wordCount.removeChild(chunkElem);
		wordCount.removeChild(copyButton);
  
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
	  const chunkElem = document.createElement("p");
	  chunkElem.textContent = chunks[chunkIndex] + "; Rephrase the above text into a more concise, clearer and in a way that a kid could understand but preserve the details. Do it in bullet points";
	  wordCount.appendChild(chunkElem);
  
	  const copyButton = document.createElement("button");
	  copyButton.className = "btn btn-secondary";
	  copyButton.textContent = "Copy";
	  wordCount.appendChild(copyButton);
  
	  // Get the copy button element and add the event listener to it
	  addCopyButtonListener(copyButton, chunkElem, chunkIndex);
	}
  
	// Start the display process
	displayChunk(0);
  }
  
  function countWords() {
	// Get the text input element and the word count element
	const textInput = document.getElementById("text-input");
	const wordCount = document.getElementById("word-count");
  
	// Split the text into words and count the number of words
	const words = textInput.value.match(/\b\w+\b/g) || [];
	const numWords = words.length;
  
	// Display the word count
	wordCount.textContent = `This text contains ${numWords} words.`;
  
	// Check if the number of words exceeds 2000
	if (numWords > 2000) {
	  // Calculate the number of chunks required
	  const numChunks = Math.ceil(numWords / 2000);
  
	  // Display the number of chunks
	  wordCount.textContent += ` This text exceeds 2000 words and requires ${numChunks} chunks.`;
	}
  }
  
