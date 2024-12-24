
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
        body: JSON.stringify({ essay })
    })
    .then(response => {
        if (!response.ok) {
            //this better not happen. if stuff REALLY breaks then also log the response value. not necessary for this small project
            throw new Error('Network response was not ok ');
        }
        return response.json();
    })
    .then(data => {
        
        const feedback = data.result || 'No feedback available';
        resultDiv.innerHTML = `Feedback: ${feedback}`;
        resultDiv.style.display = 'block';  // Show the result
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'Error: Something went wrong.';
    });
});
