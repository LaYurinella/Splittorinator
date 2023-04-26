function countWords() {
    // Get the text input element and the word count element
    var textInput = document.getElementById("text-input");
    var wordCount = document.getElementById("word-count");

    // Split the text into words and count the number of words
    var words = textInput.value.match(/\b\w+\b/g);
    var numWords = words ? words.length : 0;

    // Display the word count
    wordCount.innerText = "This text contains " + numWords + " words.";

    // Check if the number of words exceeds 500
    if (numWords > 500) {
        // Calculate the number of chunks required
        var numChunks = Math.ceil(numWords / 500);

        // Display the number of chunks
        wordCount.innerText += " This text exceeds 500 words and requires " + numChunks + " chunks.";
    }
}
