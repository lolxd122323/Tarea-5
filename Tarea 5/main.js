function getSignals(maxSignals) {
    return Array.from({ length: maxSignals }, () => Math.floor(Math.random() * 361)).filter(signal => signal >= 0);
}

function getQuadrantSequence(signals) {
    const quadrants = { 0: 'N', 1: 'E', 2: 'S', 3: 'O' };
    return signals.map(signal => quadrants[Math.floor(signal / 90) % 4]).join("");
}

function getCompleteCycles(sequence) {
    const cycles = sequence.match(/(NESO|OSEN|ESON|SENO|SONE|ENOS|ONES|NOSE)/g);
    return cycles ? cycles.length : 0;
}

function calculatePercentage(signals) {
    const quadrants = { N: 0, E: 0, S: 0, O: 0 };

    signals.forEach(signal => {
        const quadrant = signal <= 90 ? 'N' : signal <= 180 ? 'E' : signal <= 270 ? 'S' : 'O';
        quadrants[quadrant]++;
    });

    for (let quadrant in quadrants) {
        quadrants[quadrant] = ((quadrants[quadrant] / signals.length) * 100).toFixed(2);    
    }

    return quadrants;
}

function main() {
    const maxSignals = 14;
    const signals = getSignals(maxSignals);
    const sequence = getQuadrantSequence(signals);
    const completeCycles = getCompleteCycles(sequence);
    const quadrantPercentages = calculatePercentage(signals);

    console.log('Signals:', signals);
    console.log('Signal sequence:', sequence);
    console.log('Complete cycles:', completeCycles);
    console.log('Quadrant percentages:', quadrantPercentages);

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('signals').innerText = signals;
        document.getElementById('secuencia').innerText = sequence;
        document.getElementById('ciclos').innerText = completeCycles;
        document.getElementById('porcentaje').innerText = JSON.stringify(quadrantPercentages);
    });
}

main();
