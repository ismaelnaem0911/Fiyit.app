const root = document.getElementById('page-render-root');

function renderProgressDashboard() {
    const readingHistory = FiyitStorage.getProgress();
    root.innerHTML = `
        <header><a href="../index.html"><i class="ph ph-caret-left"></i></a><h2>Your Learning Metrics</h2><div></div></header>
        <div class="list-container">
            <h3>Completed Modules Log (${readingHistory.length})</h3>
            ${readingHistory.length === 0 ? '<p style="color:var(--text-muted)">No lessons finished yet. Get reading!</p>' : 
              readingHistory.map(h => `
                <div class="list-item">
                    <div>
                        <strong>${h.subject}</strong><br>
                        <small style="color:var(--neon-orange);">${h.unit}</small>
                    </div>
                    <i class="ph ph-check-circle" style="color:var(--neon-green); font-size:24px;"></i>
                </div>
            `).join('')}
        </div>`;
}
renderProgressDashboard();
