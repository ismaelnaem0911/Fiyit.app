const root = document.getElementById('page-render-root');

function renderBooksWorkflow() {
    const currentView = appState.viewStack[appState.viewStack.length - 1];

    if (currentView === 'grade') {
        root.innerHTML = `
            <header><a href="../index.html"><i class="ph ph-caret-left"></i></a><h2>Select Grade</h2><div></div></header>
            <div class="list-container">
                ${[9, 10, 11, 12].map(g => `<div class="list-item" onclick="chooseGrade(${g})">Grade ${g} <i class="ph ph-caret-right"></i></div>`).join('')}
            </div>`;
    } 
    else if (currentView === 'stream') {
        root.innerHTML = `
            <header><i class="ph ph-caret-left" onclick="backOneStep()"></i><h2>Select Stream</h2><div></div></header>
            <div class="list-container">
                <div class="list-item" onclick="chooseStream('Natural Science')">Natural Science <i class="ph ph-caret-right"></i></div>
                <div class="list-item" onclick="chooseStream('Social Science')">Social Science <i class="ph ph-caret-right"></i></div>
            </div>`;
    }
    else if (currentView === 'subject') {
        let dataBlock = (appState.grade >= 11) ? CURRICULUM_DATA[appState.grade][appState.stream] : CURRICULUM_DATA[appState.grade];
        root.innerHTML = `
            <header><i class="ph ph-caret-left" onclick="backOneStep()"></i><h2>Subjects</h2><div></div></header>
            <div class="list-container">
                ${Object.keys(dataBlock).map(sub => `<div class="list-item" onclick="chooseSubject('${sub}')">${sub} <i class="ph ph-caret-right"></i></div>`).join('')}
            </div>`;
    }
    else if (currentView === 'unit') {
        let dataBlock = (appState.grade >= 11) ? CURRICULUM_DATA[appState.grade][appState.stream][appState.subject] : CURRICULUM_DATA[appState.grade][appState.subject];
        root.innerHTML = `
            <header><i class="ph ph-caret-left" onclick="backOneStep()"></i><h2>Units</h2><div></div></header>
            <div class="list-container">
                ${Object.keys(dataBlock).map(ut => `<div class="list-item" onclick="chooseUnit('${ut}')">${ut} <i class="ph ph-caret-right"></i></div>`).join('')}
            </div>`;
    }
    else if (currentView === 'aiContent') {
        let dataBlock = (appState.grade >= 11) ? CURRICULUM_DATA[appState.grade][appState.stream][appState.subject][appState.unit] : CURRICULUM_DATA[appState.grade][appState.subject][appState.unit];
        
        // Save current read instantly to localstorage
        FiyitStorage.saveProgress(appState.subject, appState.unit, dataBlock[0] || "Overview");

        root.innerHTML = `
            <header><i class="ph ph-caret-left" onclick="backOneStep()"></i><h2>AI Content</h2><div></div></header>
            <div class="ai-container">
                <div class="ai-content-inner">
                    <h3 style="color: var(--neon-blue); margin-bottom:15px;">${appState.unit}</h3>
                    <p style="line-height:1.7;"><strong>Subtopics:</strong> ${dataBlock.join(', ')}</p>
                    <p style="margin-top:15px; color: var(--text-muted); line-height:1.6;">
                        This lesson introduces the foundation of ${appState.unit}. It covers what it means, why it is critical for your national examinations, and how it is systematically implemented in practical scenarios.
                    </p>
                    <div class="ai-buttons">
                        <button onclick="backOneStep()"><i class="ph ph-arrow-left"></i> Back</button>
                        <button onclick="alert('Generating next dynamic sub-unit content...')">Next <i class="ph ph-arrow-right"></i></button>
                        <button class="btn-quiz" onclick="redirectToQuiz()">Take Quiz</button>
                    </div>
                </div>
            </div>`;
    }
}

function chooseGrade(g) { appState.grade = g; appState.viewStack.push((g >= 11) ? 'stream' : 'subject'); renderBooksWorkflow(); }
function chooseStream(s) { appState.stream = s; appState.viewStack.push('subject'); renderBooksWorkflow(); }
function chooseSubject(sub) { appState.subject = sub; appState.viewStack.push('unit'); renderBooksWorkflow(); }
function chooseUnit(u) { appState.unit = u; appState.viewStack.push('aiContent'); renderBooksWorkflow(); }
function backOneStep() { appState.viewStack.pop(); renderBooksWorkflow(); }
function redirectToQuiz() { window.location.href = "quiz.html"; }

renderBooksWorkflow();
