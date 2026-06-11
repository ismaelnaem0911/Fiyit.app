const root = document.getElementById('page-render-root');

function renderQuizLanding() {
    root.innerHTML = `
        <header><a href="../index.html"><i class="ph ph-caret-left"></i></a><h2>Quiz Arena</h2><div></div></header>
        <div class="ai-container">
            <div class="ai-content-inner">
                <h3>Dynamic Assessment Generated</h3>
                <p style="margin: 15px 0; color: var(--text-muted);">This test evaluates what you have read recently via LocalStorage sync settings.</p>
                <div class="list-item" style="margin-bottom:10px;" onclick="submitScore(100)">Option A: Rational Numbers <i class="ph ph-circle"></i></div>
                <div class="list-item" style="margin-bottom:10px;" onclick="submitScore(0)">Option B: Imaginary Values <i class="ph ph-circle"></i></div>
            </div>
        </div>`;
}

function submitScore(score) {
    FiyitStorage.saveQuizScore("General Study Match", "Unit 1 Summary", score);
    alert("Score Saved to Progress tracking dashboard! Result: " + score + "%");
    window.location.href = "../index.html";
}

renderQuizLanding();
