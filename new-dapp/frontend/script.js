document.getElementById('voteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const option = document.getElementById('option').value;
    const response = await fetch('http://localhost:3000/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    });
    const message = await response.text();
    alert(message);
});
