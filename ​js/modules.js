// Global State Machine Manager across all pages
const FiyitStorage = {
    saveProgress: (subject, unit, subUnit) => {
        let current = JSON.parse(localStorage.getItem('fiyit_progress')) || [];
        const entry = { subject, unit, subUnit, date: new Date().toLocaleDateString() };
        if(!current.some(p => p.subUnit === subUnit)) {
            current.push(entry);
            localStorage.setItem('fiyit_progress', JSON.stringify(current));
        }
    },
    getProgress: () => JSON.parse(localStorage.getItem('fiyit_progress')) || [],
    
    saveQuizScore: (subject, unit, score) => {
        let tracker = JSON.parse(localStorage.getItem('fiyit_quizzes')) || [];
        tracker.push({ subject, unit, score, date: new Date().toLocaleDateString() });
        localStorage.setItem('fiyit_quizzes', JSON.stringify(tracker));
    }
};

// Global App State
const appState = {
    grade: null,
    stream: null,
    subject: null,
    unit: null,
    viewStack: ['grade']
};
