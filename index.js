document.getElementById('submit-btn').addEventListener('click', function() {
    const essay = document.getElementById('essay').value;
    const resultDiv = document.getElementById('result');

    // Ensure the essay is not empty
    if (!essay.trim()) {
        resultDiv.innerHTML = 'Please enter an essay.';
        return;
    }

    // Make a POST request to the Heroku API
    fetch('https://ai-reviewer-f35347dc4486.herokuapp.com/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ essay }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response and display feedback
        if (data.feedback) {
            resultDiv.innerHTML = `Feedback: ${data.feedback}`;
        } else {
            resultDiv.innerHTML = 'Error: Unable to get feedback.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'Error: Something went wrong.';
    });
});
