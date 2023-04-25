function countWords() {
    const input = document.getElementById("text-input").value;
    const wordCount = input.trim().split(/\s+/).length;
    const result = `Word count: ${wordCount}`;
    document.getElementById("word-count").textContent = result;
  }
  