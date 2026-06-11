// Controls landing page chat execution
document.getElementById('send-chat-btn')?.addEventListener('click', () => {
    const query = document.getElementById('ai-chat').value;
    if(query.trim() !== "") {
        alert("Teacher AI responding to: " + query);
    }
});
