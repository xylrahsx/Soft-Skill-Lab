// Communication Styles Simulator - JavaScript Logic

// Team personalities
const TeamPersonality = {
    SUPPORTIVE: 'supportive',
    SKEPTICAL: 'skeptical',
    AMBITIOUS: 'ambitious',
    CAUTIOUS: 'cautious'
};

// Communication styles
const CommunicationStyle = {
    AUTHORITARIAN: 1,
    COLLABORATIVE: 2,
    PASSIVE: 3,
    ASSERTIVE: 4,
    MANIPULATIVE: 5
};

// Global state
let currentTeamPersonality = null;
let sessionHistory = [];

// Team personality descriptions
const personalityDescriptions = {
    [TeamPersonality.SUPPORTIVE]: 'Supportive and willing to help (eager to collaborate) 🤗',
    [TeamPersonality.SKEPTICAL]: 'Skeptical and questioning (needs convincing) 🤔',
    [TeamPersonality.AMBITIOUS]: 'Ambitious and results-driven (focused on success) 🎯',
    [TeamPersonality.CAUTIOUS]: 'Cautious and risk-averse (prefers stability) 🛡️'
};

// Base values for each communication style
const baseValues = {
    [CommunicationStyle.AUTHORITARIAN]: { productivity: 75, morale: 45, trust: 50 },
    [CommunicationStyle.COLLABORATIVE]: { productivity: 85, morale: 90, trust: 85 },
    [CommunicationStyle.PASSIVE]: { productivity: 50, morale: 60, trust: 40 },
    [CommunicationStyle.ASSERTIVE]: { productivity: 85, morale: 85, trust: 90 },
    [CommunicationStyle.MANIPULATIVE]: { productivity: 70, morale: 40, trust: 30 }
};

// Team reactions for each communication style
const reactions = {
    [CommunicationStyle.AUTHORITARIAN]: [
        "The team falls silent. Some members exchange uncomfortable glances.",
        "Team members nod quickly but avoid eye contact.",
        "A few team members shift in their seats, looking tense.",
        "The room becomes quiet as team members accept the directives."
    ],
    [CommunicationStyle.COLLABORATIVE]: [
        "The team leans in, energized by the inclusive approach.",
        "Team members start brainstorming ideas enthusiastically.",
        "Smiles appear as team members feel valued and heard.",
        "Several team members volunteer to take on additional responsibilities."
    ],
    [CommunicationStyle.PASSIVE]: [
        "Team members look confused and uncertain about next steps.",
        "The meeting ends with no clear action items or decisions.",
        "Some team members appear frustrated by the lack of direction.",
        "The team seems directionless and waiting for someone to lead."
    ],
    [CommunicationStyle.ASSERTIVE]: [
        "Team members appreciate the clear communication and respond positively.",
        "The team engages in constructive dialogue about the challenges.",
        "Team members feel respected and empowered to share their views.",
        "A collaborative problem-solving atmosphere emerges naturally."
    ],
    [CommunicationStyle.MANIPULATIVE]: [
        "Some team members sense something is off but can't quite pinpoint it.",
        "A few skeptical team members exchange knowing glances.",
        "The team complies but seems hesitant and guarded.",
        "Trust in leadership quietly diminishes among team members."
    ]
};

// Feedback for each communication style
const feedbackTemplates = {
    [CommunicationStyle.AUTHORITARIAN]: (result) =>
        `Your authoritarian approach provided clear direction, boosting short-term productivity to ${result.productivity}%. However, it decreased team morale to ${result.morale}% and trust to ${result.trust}%. Team members may feel undervalued and less motivated over time. This style works in crisis situations but can damage relationships if overused.`,
    
    [CommunicationStyle.COLLABORATIVE]: (result) =>
        `Excellent choice! Your collaborative approach increased productivity to ${result.productivity}%, morale to ${result.morale}%, and trust to ${result.trust}%. The team feels valued and engaged. This style builds long-term success by fostering ownership and commitment. Team members are more likely to go above and beyond.`,
    
    [CommunicationStyle.PASSIVE]: (result) =>
        `Your passive approach led to confusion. Productivity dropped to ${result.productivity}%, while morale settled at ${result.morale}% and trust at ${result.trust}%. The team needs clear direction and decisive leadership. Avoiding conflict or tough decisions can leave teams feeling lost and frustrated.`,
    
    [CommunicationStyle.ASSERTIVE]: (result) =>
        `Great communication! Your assertive style achieved strong results: ${result.productivity}% productivity, ${result.morale}% morale, and ${result.trust}% trust. You balanced clarity with respect, making team members feel heard while providing direction. This is often the most effective leadership style.`,
    
    [CommunicationStyle.MANIPULATIVE]: (result) =>
        `Your manipulative approach may have achieved ${result.productivity}% productivity, but morale dropped to ${result.morale}% and trust plummeted to ${result.trust}%. Team members sense the manipulation and become guarded. This erodes trust and damages long-term team dynamics. Authenticity is crucial for sustainable leadership.`
};

// Suggestions for each communication style
const suggestions = {
    [CommunicationStyle.AUTHORITARIAN]:
        "💡 Try incorporating team input before making final decisions. Ask 'What do you think?' to show you value their perspective. Reserve authoritarian style for genuine emergencies.",
    
    [CommunicationStyle.COLLABORATIVE]:
        "💡 You're on the right track! Continue fostering open dialogue. Remember to ensure discussions stay focused and lead to actionable decisions within reasonable timeframes.",
    
    [CommunicationStyle.PASSIVE]:
        "💡 Practice stating your position clearly: 'Here's what I think we should do...' It's okay to make decisions and lead. Your team needs and wants your guidance.",
    
    [CommunicationStyle.ASSERTIVE]:
        "💡 Excellent approach! Keep balancing clarity with empathy. Continue to invite input while providing decisive direction. This builds both trust and results.",
    
    [CommunicationStyle.MANIPULATIVE]:
        "💡 Shift to direct, honest communication. Say what you mean and mean what you say. Transparency builds trust. Try expressing your needs openly instead of indirectly influencing."
};

// Initialize the simulation
function startSimulation() {
    hideAllScreens();
    showScreen('scenarioScreen');
    generateScenario();
}

// Generate a new scenario
function generateScenario() {
    // Select random team personality
    const personalities = Object.values(TeamPersonality);
    currentTeamPersonality = personalities[Math.floor(Math.random() * personalities.length)];
    
    // Display team personality
    document.getElementById('teamPersonality').textContent = personalityDescriptions[currentTeamPersonality];
}

// Handle user choice
function makeChoice(styleId) {
    const result = generateResult(styleId, currentTeamPersonality);
    sessionHistory.push(result);
    displayResults(result);
}

// Generate simulation result
function generateResult(styleId, teamPersonality) {
    const base = baseValues[styleId];
    const result = {
        style: styleId,
        productivity: base.productivity,
        morale: base.morale,
        trust: base.trust
    };

    // Apply team personality modifier
    applyTeamPersonalityModifier(result, styleId, teamPersonality);

    // Add randomness (±10%)
    result.productivity = clamp(result.productivity + randomInt(-10, 10), 0, 100);
    result.morale = clamp(result.morale + randomInt(-10, 10), 0, 100);
    result.trust = clamp(result.trust + randomInt(-10, 10), 0, 100);

    // Calculate overall score
    result.overallScore = Math.round((result.productivity + result.morale + result.trust) / 3);

    // Get text content
    result.reaction = getRandomElement(reactions[styleId]);
    result.feedback = feedbackTemplates[styleId](result);
    result.suggestion = suggestions[styleId];

    return result;
}

// Apply team personality modifiers
function applyTeamPersonalityModifier(result, styleId, personality) {
    switch (personality) {
        case TeamPersonality.SUPPORTIVE:
            if (styleId === CommunicationStyle.COLLABORATIVE || styleId === CommunicationStyle.ASSERTIVE) {
                result.morale += 10;
                result.trust += 5;
            }
            break;

        case TeamPersonality.SKEPTICAL:
            if (styleId === CommunicationStyle.AUTHORITARIAN || styleId === CommunicationStyle.MANIPULATIVE) {
                result.trust -= 15;
                result.morale -= 10;
            } else if (styleId === CommunicationStyle.ASSERTIVE) {
                result.trust += 10;
            }
            break;

        case TeamPersonality.AMBITIOUS:
            if (styleId === CommunicationStyle.PASSIVE) {
                result.productivity -= 15;
                result.morale -= 10;
            } else if (styleId === CommunicationStyle.AUTHORITARIAN) {
                result.productivity += 10;
            }
            break;

        case TeamPersonality.CAUTIOUS:
            if (styleId === CommunicationStyle.AUTHORITARIAN) {
                result.trust -= 10;
            } else if (styleId === CommunicationStyle.COLLABORATIVE) {
                result.trust += 10;
            }
            break;
    }
}

// Display results
function displayResults(result) {
    hideAllScreens();
    showScreen('resultsScreen');

    // Display reaction
    document.getElementById('reactionText').textContent = result.reaction;

    // Animate metrics
    setTimeout(() => {
        animateMetric('productivity', result.productivity);
        animateMetric('morale', result.morale);
        animateMetric('trust', result.trust);
        displayOverallScore(result.overallScore);
    }, 500);

    // Display feedback and suggestion
    document.getElementById('feedbackText').textContent = result.feedback;
    document.getElementById('suggestionText').textContent = result.suggestion;
}

// Animate a metric bar
function animateMetric(metricName, value) {
    const bar = document.getElementById(`${metricName}Bar`);
    const valueElement = document.getElementById(`${metricName}Value`);

    // Set color based on value
    if (value >= 75) {
        bar.className = 'metric-bar high';
    } else if (value >= 50) {
        bar.className = 'metric-bar medium';
    } else {
        bar.className = 'metric-bar low';
    }

    // Animate width
    setTimeout(() => {
        bar.style.width = value + '%';
        valueElement.textContent = value + '%';
    }, 100);
}

// Display overall score
function displayOverallScore(score) {
    const scoreElement = document.getElementById('overallScore');
    const ratingElement = document.getElementById('scoreRating');

    setTimeout(() => {
        scoreElement.textContent = score + '%';

        if (score >= 90) {
            ratingElement.textContent = '(Excellent! 🌟)';
            scoreElement.style.color = '#11998e';
        } else if (score >= 75) {
            ratingElement.textContent = '(Good! 👍)';
            scoreElement.style.color = '#f2994a';
        } else if (score >= 60) {
            ratingElement.textContent = '(Average ⚠️)';
            scoreElement.style.color = '#f2c94c';
        } else {
            ratingElement.textContent = '(Needs Improvement ⚠️)';
            scoreElement.style.color = '#eb3349';
        }
    }, 1500);
}

// Try again
function tryAgain() {
    hideAllScreens();
    showScreen('scenarioScreen');
    generateScenario();
}

// Show session summary
function showSummary() {
    if (sessionHistory.length === 0) {
        alert('No simulations completed yet!');
        return;
    }

    hideAllScreens();
    showScreen('summaryScreen');

    const avgProductivity = average(sessionHistory.map(r => r.productivity));
    const avgMorale = average(sessionHistory.map(r => r.morale));
    const avgTrust = average(sessionHistory.map(r => r.trust));
    const avgOverall = average(sessionHistory.map(r => r.overallScore));
    const bestScore = Math.max(...sessionHistory.map(r => r.overallScore));

    const summaryHTML = `
        <div class="summary-stat">
            <strong>Total Simulations:</strong>
            <span>${sessionHistory.length}</span>
        </div>
        <div class="summary-stat">
            <strong>Average Overall Score:</strong>
            <span>${avgOverall.toFixed(1)}%</span>
        </div>
        <div class="summary-stat">
            <strong>Average Productivity:</strong>
            <span>${avgProductivity.toFixed(1)}%</span>
        </div>
        <div class="summary-stat">
            <strong>Average Morale:</strong>
            <span>${avgMorale.toFixed(1)}%</span>
        </div>
        <div class="summary-stat">
            <strong>Average Trust:</strong>
            <span>${avgTrust.toFixed(1)}%</span>
        </div>
        <div class="best-score">
            🏆 Best Overall Score: ${bestScore}%
        </div>
        <p style="text-align: center; margin-top: 20px; color: #667eea; font-weight: 600;">
            Keep practicing to improve your communication skills! 🚀
        </p>
    `;

    document.getElementById('summaryStats').innerHTML = summaryHTML;
}

// Utility functions
function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
}

function showScreen(screenId) {
    document.getElementById(screenId).classList.add('active');
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function average(array) {
    return array.reduce((sum, val) => sum + val, 0) / array.length;
}

// Reset metric bars when page loads
window.addEventListener('load', () => {
    document.getElementById('productivityBar').style.width = '0%';
    document.getElementById('moraleBar').style.width = '0%';
    document.getElementById('trustBar').style.width = '0%';
});
