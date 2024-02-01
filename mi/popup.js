var bank = {}; // Initialize an empty object for the bank data

// Function to load bank.json
function loadBankData() {
    fetch('bank.json')
        .then(response => response.json())
        .then(data => {
            bank = data; // Store the data in the bank variable
        })
        .catch(error => console.error('Error loading bank.json:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    loadBankData(); // Load bank data when the document is ready

    var inputText = document.getElementById('inputText');
    var resultDiv = document.getElementById('result');

    inputText.addEventListener('input', function() {
        var searchText = inputText.value.toLowerCase();

        // Clear results if input is empty
        if (searchText === '') {
            resultDiv.innerHTML = '';
            return; // Exit the function early
        }

        resultDiv.innerHTML = ''; // Clear previous results

        for (var key in bank) {
            if (key.toLowerCase().includes(searchText)) {
                var questionDiv = document.createElement('div');
                questionDiv.textContent = key;
                questionDiv.style.color = 'red';

                var answer = bank[key];
                var answerDiv = document.createElement('div');
                if (Array.isArray(answer)) {
                    // If the answer is an array, join the elements with line breaks
                    answerDiv.innerHTML = answer.join('<br>');
                } else {
                    // If the answer is a string, just display it
                    answerDiv.textContent = answer;
                }
                answerDiv.style.color = 'green';

                var containerDiv = document.createElement('div');
                containerDiv.appendChild(questionDiv);
                containerDiv.appendChild(answerDiv);

                containerDiv.addEventListener('mouseup', function() {
                    var selectedText = window.getSelection().toString();
                    console.log('Selected text:', selectedText);
                });

                resultDiv.appendChild(containerDiv);
            }
        }
    });
});
