// ui.js - UI elements (crosshair, score, hints)

export function initUI(container) {
    // Crosshair
    const crosshair = document.createElement('div');
    crosshair.textContent = '+';
    Object.assign(crosshair.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '24px',
        color: 'white',
        pointerEvents: 'none',
        userSelect: 'none',
    });
    container.appendChild(crosshair);

    // Score
    let score = 0;
    const scoreDiv = document.createElement('div');
    scoreDiv.textContent = `Score: ${score}`;
    Object.assign(scoreDiv.style, {
        position: 'absolute',
        top: '10px',
        left: '10px',
        fontSize: '18px',
        color: 'white',
        textShadow: '0 0 5px black',
        pointerEvents: 'none',
        userSelect: 'none',
    });
    container.appendChild(scoreDiv);

    function setScore(newScore) {
        score = newScore;
        scoreDiv.textContent = `Score: ${score}`;
    }

    function getScore() {
        return score;
    }

    // Hint text
    const hintDiv = document.createElement('div');
    hintDiv.textContent = 'Click to lock mouse. WASD to move. Click again to shoot.';
    Object.assign(hintDiv.style, {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '14px',
        color: 'white',
        textShadow: '0 0 5px black',
        pointerEvents: 'none',
        userSelect: 'none',
        opacity: '0.8',
    });
    container.appendChild(hintDiv);

    return {
        setScore,
        getScore,
        crosshair,
        scoreDiv,
        hintDiv
    };
}
