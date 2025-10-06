// Advanced Soft Skills Lab - JavaScript Logic
// Enhanced with multi-turn conversations, analytics, achievements, and AI-powered insights

// ==================== DATA STRUCTURES ====================

const ScenarioTypes = {
    DEADLINE: 'deadline',
    CONFLICT: 'conflict',
    REVIEW: 'review',
    BUDGET: 'budget',
    INNOVATION: 'innovation',
    CRISIS: 'crisis'
};

const Difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
};

const CommunicationStyles = {
    AUTHORITARIAN: 'authoritarian',
    COLLABORATIVE: 'collaborative',
    PASSIVE: 'passive',
    ASSERTIVE: 'assertive',
    MANIPULATIVE: 'manipulative'
};

// ==================== GLOBAL STATE ====================

let currentScenario = null;
let currentTurn = 1;
let conversationHistory = [];
let sessionData = loadSessionData();
let currentSimulationScore = { productivity: 0, morale: 0, trust: 0 };

// ==================== SCENARIO DEFINITIONS ====================

const scenarios = {
    deadline: {
        title: "Project Deadline Crisis",
        difficulty: Difficulty.MEDIUM,
        totalTurns: 4,
        context: "Your team is two weeks behind on a critical project. The client is demanding updates, and team members are stressed.",
        turns: [
            {
                situation: "You call an emergency team meeting. Team members look worried and exhausted.",
                responses: {
                    authoritarian: { text: "We're behind schedule. I need everyone working overtime until this is done. No excuses.", impact: { productivity: 15, morale: -20, trust: -10 } },
                    collaborative: { text: "I know we're under pressure. Let's brainstorm together - what's blocking us and how can we help each other?", impact: { productivity: 20, morale: 15, trust: 20 } },
                    passive: { text: "Well, we're a bit behind... I'm sure you'll figure it out. Do what you think is best.", impact: { productivity: -15, morale: -10, trust: -15 } },
                    assertive: { text: "We're facing a real challenge. I need your honest assessment of what's blocking progress so we can solve this together.", impact: { productivity: 18, morale: 12, trust: 18 } },
                    manipulative: { text: "I heard the client mentioned budget concerns. It would be unfortunate if this project affected future raises...", impact: { productivity: 10, morale: -25, trust: -30 } }
                },
                teamReactions: {
                    authoritarian: "Team members exchange concerned glances. Sarah sighs heavily, while Mike crosses his arms defensively.",
                    collaborative: "The team visibly relaxes. People start sharing their concerns and offering help to each other.",
                    passive: "Confusion spreads. Team members look at each other, unsure who's supposed to take charge.",
                    assertive: "Team members nod appreciatively. Several people speak up about specific blockers.",
                    manipulative: "The mood darkens immediately. Trust has been damaged."
                }
            },
            {
                situation: "After the initial discussion, Sarah mentions she's overwhelmed with tasks while Mike says he's waiting for reviews.",
                responses: {
                    authoritarian: { text: "Mike, stop waiting and move forward. Sarah, delegate better. This isn't complicated.", impact: { productivity: 5, morale: -15, trust: -15 } },
                    collaborative: { text: "Let's redistribute tasks. Mike, can you help Sarah with X while I fast-track your reviews?", impact: { productivity: 25, morale: 20, trust: 15 } },
                    passive: { text: "Hmm, that's tough. Maybe you two could... work something out?", impact: { productivity: -10, morale: -12, trust: -10 } },
                    assertive: { text: "Good information. Mike, I'll review your work by EOD. Sarah, let's identify which tasks we can reassign.", impact: { productivity: 22, morale: 15, trust: 18 } },
                    manipulative: { text: "Interesting how some people are 'too busy' while others are 'waiting'... I'll remember this during reviews.", impact: { productivity: 0, morale: -20, trust: -25 } }
                },
                teamReactions: {
                    authoritarian: "Sarah looks defeated. Mike becomes defensive. Team cohesion weakens.",
                    collaborative: "Relief is visible. Team members start problem-solving together.",
                    passive: "Frustration grows. No concrete solution emerges.",
                    assertive: "Clear action items emerge. Team feels supported and directed.",
                    manipulative: "Team members become guarded and stop communicating openly."
                }
            },
            {
                situation: "With 3 days left, you discover a critical bug. The team is already exhausted from working extra hours.",
                responses: {
                    authoritarian: { text: "All hands on deck. Everyone stays until this is fixed. Cancel personal plans if needed.", impact: { productivity: 10, morale: -25, trust: -20 } },
                    collaborative: { text: "This is serious. Who has capacity? Let's identify the must-haves vs nice-to-haves and tackle this smartly.", impact: { productivity: 30, morale: 10, trust: 20 } },
                    passive: { text: "Oh no... Well, do your best I guess. I don't want to push anyone too hard.", impact: { productivity: -20, morale: -5, trust: -15 } },
                    assertive: { text: "Here's the situation [explains clearly]. I need volunteers who can stay late. Others can support remotely. Who's in?", impact: { productivity: 28, morale: 8, trust: 22 } },
                    manipulative: { text: "It's a shame some people chose not to catch this earlier. I guess we know who the real team players are.", impact: { productivity: 5, morale: -30, trust: -35 } }
                },
                teamReactions: {
                    authoritarian: "Morale crashes. People comply but resentment builds.",
                    collaborative: "Team rallies together. People volunteer and support each other.",
                    passive: "Panic sets in. No clear direction, people work inefficiently.",
                    assertive: "Volunteers step up. Team appreciates the choice and clarity.",
                    manipulative: "Team fragments. People work isolated, trust is broken."
                }
            },
            {
                situation: "The project is complete. It's time to debrief with the team about the intense experience.",
                responses: {
                    authoritarian: { text: "We made it. That's what I expect going forward. Dismissed.", impact: { productivity: 0, morale: -10, trust: -10 } },
                    collaborative: { text: "Thank you all for your incredible effort. What did we learn? How can we prevent this crunch in the future?", impact: { productivity: 15, morale: 30, trust: 25 } },
                    passive: { text: "Well, that was stressful. Um, thanks for your work. I guess we should avoid that next time.", impact: { productivity: 0, morale: -5, trust: -8 } },
                    assertive: { text: "You all showed real dedication. Let's capture lessons learned and celebrate this win. I'm buying lunch.", impact: { productivity: 12, morale: 28, trust: 23 } },
                    manipulative: { text: "Good thing we got through that. I'll remember who really contributed when bonus time comes around.", impact: { productivity: 0, morale: -15, trust: -25 } }
                },
                teamReactions: {
                    authoritarian: "Team feels used and unappreciated. Turnover risk increases.",
                    collaborative: "Team bonds stronger. People feel valued and heard.",
                    passive: "Team feels the experience was meaningless and poorly led.",
                    assertive: "Team feels accomplished and appreciated. Ready for next challenge.",
                    manipulative: "Team feels manipulated even in success. Trust damage persists."
                }
            }
        ]
    },
    conflict: {
        title: "Team Conflict Resolution",
        difficulty: Difficulty.HARD,
        totalTurns: 5,
        context: "Two senior team members, Alex and Jordan, have been in open disagreement about the technical approach. It's affecting team morale.",
        turns: [
            {
                situation: "You've called a meeting with both Alex and Jordan. The tension in the room is palpable.",
                responses: {
                    authoritarian: { text: "Enough. I'm deciding the approach right now. Alex, we're going with your plan. Jordan, make it work.", impact: { productivity: -5, morale: -30, trust: -25 } },
                    collaborative: { text: "I want to understand both perspectives. Alex, explain your approach. Jordan, I'll need yours too. Let's find the best path.", impact: { productivity: 10, morale: 15, trust: 25 } },
                    passive: { text: "Can't you two just... work it out? I don't want to take sides here.", impact: { productivity: -20, morale: -20, trust: -30 } },
                    assertive: { text: "This conflict is impacting the team. I need you both to present your cases objectively, then we'll decide on merit.", impact: { productivity: 12, morale: 18, trust: 28 } },
                    manipulative: { text: "You both have good ideas, but frankly, I've already decided. Just need you to feel heard first.", impact: { productivity: -10, morale: -25, trust: -40 } }
                },
                teamReactions: {
                    authoritarian: "Jordan looks furious. Alex looks uncomfortable with the win. Team cohesion suffers.",
                    collaborative: "Both parties prepare to present thoughtfully. Team watches with interest.",
                    passive: "Both Alex and Jordan look frustrated with your lack of leadership.",
                    assertive: "Both parties appreciate the fair process. Team sees strong leadership.",
                    manipulative: "Both sense dishonesty. The conflict deepens with mistrust of leadership added."
                }
            }
        ]
    },
    innovation: {
        title: "Innovation Workshop",
        difficulty: Difficulty.EASY,
        totalTurns: 3,
        context: "You're leading a brainstorming session to generate ideas for improving your product.",
        turns: [
            {
                situation: "The team is gathered for the innovation workshop. Some look excited, others skeptical.",
                responses: {
                    authoritarian: { text: "Here are the three ideas I want us to explore. Split into groups and work on these.", impact: { productivity: 5, morale: -10, trust: -5 } },
                    collaborative: { text: "No idea is too wild today. Let's throw everything on the board and build on each other's thoughts.", impact: { productivity: 20, morale: 25, trust: 20 } },
                    passive: { text: "So... does anyone have any ideas? Whatever you want to share is fine.", impact: { productivity: -5, morale: -5, trust: -10 } },
                    assertive: { text: "Our goal today: 20 ideas minimum. Quantity over quality. I'll be sharing my ideas too. Ready?", impact: { productivity: 22, morale: 20, trust: 18 } },
                    manipulative: { text: "Let's hear your ideas. Just remember, some suggestions might reflect on your understanding of our strategy.", impact: { productivity: 0, morale: -15, trust: -20 } }
                },
                teamReactions: {
                    authoritarian: "Creativity is stifled. Team follows directions but doesn't innovate.",
                    collaborative: "Ideas start flowing. Team builds energy and enthusiasm.",
                    passive: "Awkward silence. A few half-hearted suggestions emerge.",
                    assertive: "Team engages actively. Ideas start coming rapid-fire.",
                    manipulative: "Team becomes risk-averse. Only safe, conventional ideas are shared."
                }
            }
        ]
    }
};

// ==================== ACHIEVEMENTS SYSTEM ====================

const achievements = [
    {
        id: 'first_sim',
        icon: '🎯',
        name: 'First Steps',
        description: 'Complete your first simulation',
        condition: (data) => data.totalSimulations >= 1,
        progress: (data) => Math.min(data.totalSimulations, 1)
    },
    {
        id: 'collaborator',
        icon: '🤝',
        name: 'Team Player',
        description: 'Use Collaborative style 10 times',
        condition: (data) => (data.styleUsage?.collaborative || 0) >= 10,
        progress: (data) => Math.min((data.styleUsage?.collaborative || 0), 10)
    },
    {
        id: 'perfectionist',
        icon: '⭐',
        name: 'Perfectionist',
        description: 'Score 95% or higher in a simulation',
        condition: (data) => data.highestScore >= 95,
        progress: (data) => Math.min(data.highestScore, 95)
    },
    {
        id: 'consistent',
        icon: '🔥',
        name: 'On Fire',
        description: 'Maintain a 7-day streak',
        condition: (data) => data.currentStreak >= 7,
        progress: (data) => Math.min(data.currentStreak, 7)
    },
    {
        id: 'explorer',
        icon: '🗺️',
        name: 'Explorer',
        description: 'Try all 5 communication styles',
        condition: (data) => {
            const styles = data.styleUsage || {};
            return Object.keys(styles).length >= 5;
        },
        progress: (data) => Object.keys(data.styleUsage || {}).length
    },
    {
        id: 'dedicated',
        icon: '💪',
        name: 'Dedicated Learner',
        description: 'Complete 25 simulations',
        condition: (data) => data.totalSimulations >= 25,
        progress: (data) => Math.min(data.totalSimulations, 25)
    },
    {
        id: 'master',
        icon: '👑',
        name: 'Communication Master',
        description: 'Average score above 85%',
        condition: (data) => data.averageScore >= 85,
        progress: (data) => Math.min(data.averageScore, 85)
    },
    {
        id: 'assertive_pro',
        icon: '💬',
        name: 'Assertive Pro',
        description: 'Master assertive communication (use 15 times)',
        condition: (data) => (data.styleUsage?.assertive || 0) >= 15,
        progress: (data) => Math.min((data.styleUsage?.assertive || 0), 15)
    },
    {
        id: 'scenario_master',
        icon: '🎬',
        name: 'Scenario Master',
        description: 'Complete all scenario types',
        condition: (data) => {
            const completed = data.scenariosCompleted || {};
            return Object.keys(completed).length >= 6;
        },
        progress: (data) => Object.keys(data.scenariosCompleted || {}).length
    },
    {
        id: 'high_trust',
        icon: '🤲',
        name: 'Trustworthy Leader',
        description: 'Achieve 90+ trust score 5 times',
        condition: (data) => (data.highTrustCount || 0) >= 5,
        progress: (data) => Math.min((data.highTrustCount || 0), 5)
    },
    {
        id: 'morale_booster',
        icon: '😊',
        name: 'Morale Booster',
        description: 'Achieve 90+ morale score 5 times',
        condition: (data) => (data.highMoraleCount || 0) >= 5,
        progress: (data) => Math.min((data.highMoraleCount || 0), 5)
    },
    {
        id: 'productive',
        icon: '📊',
        name: 'Productivity Champion',
        description: 'Achieve 90+ productivity score 5 times',
        condition: (data) => (data.highProductivityCount || 0) >= 5,
        progress: (data) => Math.min((data.highProductivityCount || 0), 5)
    },
    {
        id: 'balanced',
        icon: '⚖️',
        name: 'Balanced Leader',
        description: 'Score 80+ in all three metrics simultaneously',
        condition: (data) => data.balancedScoreCount >= 1,
        progress: (data) => Math.min(data.balancedScoreCount, 1)
    },
    {
        id: 'hard_mode',
        icon: '🔴',
        name: 'Challenge Accepted',
        description: 'Complete 5 hard scenarios with 80+ score',
        condition: (data) => (data.hardScenarioSuccess || 0) >= 5,
        progress: (data) => Math.min((data.hardScenarioSuccess || 0), 5)
    },
    {
        id: 'veteran',
        icon: '🎖️',
        name: 'Veteran Communicator',
        description: 'Complete 50 simulations',
        condition: (data) => data.totalSimulations >= 50,
        progress: (data) => Math.min(data.totalSimulations, 50)
    }
];

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    updateDashboard();
    renderAchievements();
    updateAnalytics();
});

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const screen = this.dataset.screen;
            navigateToScreen(screen);
        });
    });
}

function navigateToScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.content-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    const targetScreen = document.getElementById(screenName + 'Screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.screen === screenName) {
            item.classList.add('active');
        }
    });
    
    // Refresh screen content
    if (screenName === 'analytics') {
        updateAnalytics();
    } else if (screenName === 'achievements') {
        renderAchievements();
    } else if (screenName === 'learning') {
        updateLearningPath();
    }
}

// ==================== DASHBOARD ====================

function updateDashboard() {
    document.getElementById('totalSimulations').textContent = sessionData.totalSimulations || 0;
    document.getElementById('avgScore').textContent = (sessionData.averageScore || 0).toFixed(0) + '%';
    document.getElementById('currentStreak').textContent = sessionData.currentStreak || 0;
    
    const unlockedCount = achievements.filter(a => a.condition(sessionData)).length;
    document.getElementById('totalAchievements').textContent = `${unlockedCount}/${achievements.length}`;
    
    // Update user level
    const level = Math.floor((sessionData.totalSimulations || 0) / 5) + 1;
    document.getElementById('userLevel').textContent = `Level ${level}`;
}

function startQuickScenario(difficulty) {
    // Pick a random scenario matching difficulty
    const matchingScenarios = Object.entries(scenarios).filter(([key, scenario]) => 
        scenario.difficulty === difficulty
    );
    
    if (matchingScenarios.length > 0) {
        const randomScenario = matchingScenarios[Math.floor(Math.random() * matchingScenarios.length)];
        selectScenario(randomScenario[0], difficulty);
    }
}

// ==================== SCENARIO SELECTION & SIMULATION ====================

function selectScenario(scenarioType, difficulty) {
    currentScenario = {
        type: scenarioType,
        data: scenarios[scenarioType],
        difficulty: difficulty
    };
    
    currentTurn = 1;
    conversationHistory = [];
    currentSimulationScore = { productivity: 50, morale: 50, trust: 50 };
    
    startSimulation();
}

function startSimulation() {
    navigateToScreen('simulation');
    
    document.getElementById('scenarioTitle').textContent = currentScenario.data.title;
    document.getElementById('totalTurns').textContent = currentScenario.data.totalTurns;
    
    displayTurn();
}

function displayTurn() {
    document.getElementById('currentTurn').textContent = currentTurn;
    
    const turn = currentScenario.data.turns[currentTurn - 1];
    if (!turn) {
        endSimulation();
        return;
    }
    
    // Display situation
    const conversationArea = document.getElementById('conversationArea');
    conversationArea.innerHTML = '';
    
    // Show context on first turn
    if (currentTurn === 1) {
        const contextMessage = createMessage('team', 'Context', currentScenario.data.context);
        conversationArea.appendChild(contextMessage);
    }
    
    // Show previous conversation
    conversationHistory.forEach(msg => {
        conversationArea.appendChild(createMessage(msg.sender, msg.header, msg.text));
    });
    
    // Show current situation
    const situationMessage = createMessage('team', 'Team', turn.situation);
    conversationArea.appendChild(situationMessage);
    
    // Display response options
    displayResponseOptions(turn.responses);
}

function createMessage(sender, header, text) {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.innerHTML = `
        <div class="message-header">${header}</div>
        <div class="message-text">${text}</div>
    `;
    return message;
}

function displayResponseOptions(responses) {
    const optionsContainer = document.getElementById('responseOptions');
    optionsContainer.innerHTML = '';
    
    const styleNames = {
        authoritarian: '👔 Authoritarian',
        collaborative: '🤝 Collaborative',
        passive: '😌 Passive',
        assertive: '💪 Assertive',
        manipulative: '🎭 Manipulative'
    };
    
    Object.entries(responses).forEach(([style, data]) => {
        const option = document.createElement('button');
        option.className = 'response-option';
        option.innerHTML = `
            <div class="response-style">${styleNames[style]}</div>
            <div class="response-text">${data.text}</div>
        `;
        option.onclick = () => selectResponse(style, data);
        optionsContainer.appendChild(option);
    });
}

function selectResponse(style, data) {
    // Record choice
    conversationHistory.push({
        sender: 'user',
        header: 'You',
        text: data.text,
        style: style
    });
    
    // Apply impact
    currentSimulationScore.productivity += data.impact.productivity;
    currentSimulationScore.morale += data.impact.morale;
    currentSimulationScore.trust += data.impact.trust;
    
    // Clamp values
    currentSimulationScore.productivity = clamp(currentSimulationScore.productivity, 0, 100);
    currentSimulationScore.morale = clamp(currentSimulationScore.morale, 0, 100);
    currentSimulationScore.trust = clamp(currentSimulationScore.trust, 0, 100);
    
    // Show team reaction
    const turn = currentScenario.data.turns[currentTurn - 1];
    const reaction = turn.teamReactions[style];
    conversationHistory.push({
        sender: 'team',
        header: 'Team Reaction',
        text: reaction
    });
    
    // Track style usage
    if (!sessionData.styleUsage) sessionData.styleUsage = {};
    sessionData.styleUsage[style] = (sessionData.styleUsage[style] || 0) + 1;
    
    // Move to next turn
    currentTurn++;
    
    if (currentTurn <= currentScenario.data.totalTurns) {
        setTimeout(() => displayTurn(), 500);
    } else {
        setTimeout(() => endSimulation(), 1000);
    }
}

// ==================== SIMULATION END & RESULTS ====================

function endSimulation() {
    // Calculate final score
    const finalScore = Math.round(
        (currentSimulationScore.productivity + currentSimulationScore.morale + currentSimulationScore.trust) / 3
    );
    
    // Update session data
    sessionData.totalSimulations = (sessionData.totalSimulations || 0) + 1;
    
    if (!sessionData.scoreHistory) sessionData.scoreHistory = [];
    sessionData.scoreHistory.push({
        date: new Date().toISOString(),
        score: finalScore,
        productivity: currentSimulationScore.productivity,
        morale: currentSimulationScore.morale,
        trust: currentSimulationScore.trust,
        scenario: currentScenario.type,
        difficulty: currentScenario.difficulty
    });
    
    // Track high scores
    sessionData.highestScore = Math.max(sessionData.highestScore || 0, finalScore);
    if (currentSimulationScore.trust >= 90) {
        sessionData.highTrustCount = (sessionData.highTrustCount || 0) + 1;
    }
    if (currentSimulationScore.morale >= 90) {
        sessionData.highMoraleCount = (sessionData.highMoraleCount || 0) + 1;
    }
    if (currentSimulationScore.productivity >= 90) {
        sessionData.highProductivityCount = (sessionData.highProductivityCount || 0) + 1;
    }
    if (currentSimulationScore.productivity >= 80 && currentSimulationScore.morale >= 80 && currentSimulationScore.trust >= 80) {
        sessionData.balancedScoreCount = (sessionData.balancedScoreCount || 0) + 1;
    }
    if (currentScenario.difficulty === 'hard' && finalScore >= 80) {
        sessionData.hardScenarioSuccess = (sessionData.hardScenarioSuccess || 0) + 1;
    }
    
    // Track completed scenarios
    if (!sessionData.scenariosCompleted) sessionData.scenariosCompleted = {};
    sessionData.scenariosCompleted[currentScenario.type] = true;
    
    // Calculate average score
    const scores = sessionData.scoreHistory.map(s => s.score);
    sessionData.averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    // Update streak
    updateStreak();
    
    saveSessionData();
    
    // Check for new achievements
    const newAchievements = checkNewAchievements();
    
    // Show results
    showResults(finalScore, newAchievements);
}

function showResults(finalScore, newAchievements) {
    navigateToScreen('resultsAdvanced');
    
    document.getElementById('finalScore').textContent = finalScore + '%';
    
    // Create metrics chart
    createMetricsChart();
    
    // Generate analysis
    generateAnalysis(finalScore);
    
    // Generate detailed feedback
    generateDetailedFeedback();
    
    // Show new achievements if any
    if (newAchievements.length > 0) {
        displayNewAchievements(newAchievements);
    }
}

function createMetricsChart() {
    const ctx = document.getElementById('metricsChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.metricsChartInstance) {
        window.metricsChartInstance.destroy();
    }
    
    window.metricsChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Productivity', 'Morale', 'Trust'],
            datasets: [{
                label: 'Your Performance',
                data: [
                    currentSimulationScore.productivity,
                    currentSimulationScore.morale,
                    currentSimulationScore.trust
                ],
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function generateAnalysis(finalScore) {
    const analysisContent = document.getElementById('analysisContent');
    
    let analysis = '<div class="analysis-item">';
    
    // Overall assessment
    if (finalScore >= 85) {
        analysis += '<p><strong>🌟 Excellent Performance!</strong> You demonstrated strong communication skills.</p>';
    } else if (finalScore >= 70) {
        analysis += '<p><strong>👍 Good Work!</strong> Your communication was effective with room for refinement.</p>';
    } else if (finalScore >= 55) {
        analysis += '<p><strong>⚠️ Average Performance.</strong> Consider adjusting your approach for better results.</p>';
    } else {
        analysis += '<p><strong>📚 Learning Opportunity.</strong> This scenario reveals areas for significant improvement.</p>';
    }
    
    // Metric-specific insights
    if (currentSimulationScore.productivity < 60) {
        analysis += '<p>• <strong>Productivity:</strong> Your approach may have lacked clear direction or actionable next steps.</p>';
    }
    if (currentSimulationScore.morale < 60) {
        analysis += '<p>• <strong>Morale:</strong> Team members may not feel valued or heard. Consider more inclusive approaches.</p>';
    }
    if (currentSimulationScore.trust < 60) {
        analysis += '<p>• <strong>Trust:</strong> Authenticity and consistency are key. Avoid manipulative or passive tactics.</p>';
    }
    
    // Pattern detection
    const styleUsage = sessionData.styleUsage || {};
    const mostUsedStyle = Object.entries(styleUsage).sort((a, b) => b[1] - a[1])[0];
    if (mostUsedStyle) {
        analysis += `<p>• You tend to favor <strong>${mostUsedStyle[0]}</strong> communication. Consider experimenting with other styles.</p>`;
    }
    
    analysis += '</div>';
    analysisContent.innerHTML = analysis;
}

function generateDetailedFeedback() {
    const feedbackContent = document.getElementById('detailedFeedback');
    
    let feedback = '<div class="feedback-section">';
    
    // Turn-by-turn analysis
    feedback += '<h4>Turn-by-Turn Analysis:</h4>';
    conversationHistory.filter(msg => msg.sender === 'user').forEach((msg, index) => {
        feedback += `
            <div class="turn-feedback">
                <strong>Turn ${index + 1} - ${capitalizeFirst(msg.style)} Style:</strong>
                <p>${msg.text}</p>
                <p class="feedback-note">This approach ${getStyleImpactDescription(msg.style)}</p>
            </div>
        `;
    });
    
    feedback += '</div>';
    feedbackContent.innerHTML = feedback;
}

function getStyleImpactDescription(style) {
    const descriptions = {
        authoritarian: 'provided clear direction but may have reduced team autonomy and morale.',
        collaborative: 'fostered team engagement and built trust through inclusive decision-making.',
        passive: 'avoided conflict but may have left the team without clear guidance.',
        assertive: 'balanced clarity with respect, empowering the team while providing direction.',
        manipulative: 'may have achieved short-term goals but damaged long-term trust and relationships.'
    };
    return descriptions[style] || 'had a mixed impact on team dynamics.';
}

function displayNewAchievements(newAchievements) {
    const container = document.getElementById('achievementsEarned');
    const content = document.getElementById('newAchievements');
    
    container.style.display = 'block';
    
    let html = '<div class="new-achievements-grid">';
    newAchievements.forEach(achievement => {
        html += `
            <div class="new-achievement-card">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
    });
    html += '</div>';
    
    content.innerHTML = html;
}

// ==================== ACHIEVEMENTS ====================

function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isUnlocked = achievement.condition(sessionData);
        const progress = achievement.progress(sessionData);
        const maxProgress = achievement.id === 'first_sim' ? 1 : 
                          achievement.id.includes('collaborator') ? 10 :
                          achievement.id.includes('perfectionist') ? 95 :
                          achievement.id.includes('consistent') ? 7 :
                          achievement.id.includes('dedicated') ? 25 :
                          achievement.id.includes('assertive_pro') ? 15 :
                          achievement.id.includes('veteran') ? 50 : 10;
        
        const progressPercent = (progress / maxProgress) * 100;
        
        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            ${!isUnlocked ? `
                <div class="achievement-progress">
                    <div class="achievement-progress-bar" style="width: ${progressPercent}%"></div>
                </div>
                <div style="font-size: 0.85em; color: #718096; margin-top: 5px;">
                    ${progress} / ${maxProgress}
                </div>
            ` : '<div style="color: #11998e; font-weight: 600; margin-top: 10px;">✓ Unlocked</div>'}
        `;
        
        grid.appendChild(card);
    });
}

function checkNewAchievements() {
    const previouslyUnlocked = sessionData.unlockedAchievements || [];
    const newlyUnlocked = [];
    
    achievements.forEach(achievement => {
        if (achievement.condition(sessionData) && !previouslyUnlocked.includes(achievement.id)) {
            newlyUnlocked.push(achievement);
            previouslyUnlocked.push(achievement.id);
        }
    });
    
    sessionData.unlockedAchievements = previouslyUnlocked;
    saveSessionData();
    
    return newlyUnlocked;
}

// ==================== ANALYTICS ====================

function updateAnalytics() {
    if (sessionData.scoreHistory && sessionData.scoreHistory.length > 0) {
        createTrendsChart();
        createStyleDistributionChart();
        createHistoryChart();
        generateInsights();
    }
}

function createTrendsChart() {
    const ctx = document.getElementById('trendsChart');
    if (!ctx) return;
    
    if (window.trendsChartInstance) {
        window.trendsChartInstance.destroy();
    }
    
    const recentScores = sessionData.scoreHistory.slice(-10);
    
    window.trendsChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: recentScores.map((_, i) => `Session ${i + 1}`),
            datasets: [
                {
                    label: 'Productivity',
                    data: recentScores.map(s => s.productivity),
                    borderColor: '#667eea',
                    tension: 0.4
                },
                {
                    label: 'Morale',
                    data: recentScores.map(s => s.morale),
                    borderColor: '#11998e',
                    tension: 0.4
                },
                {
                    label: 'Trust',
                    data: recentScores.map(s => s.trust),
                    borderColor: '#f2994a',
                    tension: 0.4
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function createStyleDistributionChart() {
    const ctx = document.getElementById('styleChart');
    if (!ctx) return;
    
    if (window.styleChartInstance) {
        window.styleChartInstance.destroy();
    }
    
    const styleUsage = sessionData.styleUsage || {};
    
    window.styleChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(styleUsage).map(capitalizeFirst),
            datasets: [{
                data: Object.values(styleUsage),
                backgroundColor: [
                    '#667eea',
                    '#11998e',
                    '#f2994a',
                    '#764ba2',
                    '#eb3349'
                ]
            }]
        }
    });
}

function createHistoryChart() {
    const ctx = document.getElementById('historyChart');
    if (!ctx) return;
    
    if (window.historyChartInstance) {
        window.historyChartInstance.destroy();
    }
    
    const history = sessionData.scoreHistory || [];
    
    window.historyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: history.map((_, i) => `#${i + 1}`),
            datasets: [{
                label: 'Overall Score',
                data: history.map(s => s.score),
                backgroundColor: history.map(s => 
                    s.score >= 85 ? '#11998e' :
                    s.score >= 70 ? '#667eea' :
                    s.score >= 55 ? '#f2994a' : '#eb3349'
                )
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function generateInsights() {
    const insightsContent = document.getElementById('insightsContent');
    if (!insightsContent) return;
    
    let insights = '<ul class="item-list">';
    
    // Trend analysis
    const recentScores = sessionData.scoreHistory.slice(-5).map(s => s.score);
    if (recentScores.length >= 3) {
        const trend = recentScores[recentScores.length - 1] - recentScores[0];
        if (trend > 10) {
            insights += '<li>📈 <strong>Improving!</strong> Your scores have increased by ' + trend.toFixed(0) + ' points recently.</li>';
        } else if (trend < -10) {
            insights += '<li>📉 <strong>Attention needed.</strong> Your scores have decreased. Review your recent approaches.</li>';
        }
    }
    
    // Style effectiveness
    const styleUsage = sessionData.styleUsage || {};
    const mostUsed = Object.entries(styleUsage).sort((a, b) => b[1] - a[1])[0];
    if (mostUsed) {
        insights += `<li>🎯 Your most-used style is <strong>${capitalizeFirst(mostUsed[0])}</strong> (${mostUsed[1]} times).</li>`;
    }
    
    // Best metric
    const avgMetrics = {
        productivity: average(sessionData.scoreHistory.map(s => s.productivity)),
        morale: average(sessionData.scoreHistory.map(s => s.morale)),
        trust: average(sessionData.scoreHistory.map(s => s.trust))
    };
    const bestMetric = Object.entries(avgMetrics).sort((a, b) => b[1] - a[1])[0];
    insights += `<li>💪 Your strongest area is <strong>${capitalizeFirst(bestMetric[0])}</strong> (avg: ${bestMetric[1].toFixed(0)}%).</li>`;
    
    const worstMetric = Object.entries(avgMetrics).sort((a, b) => a[1] - b[1])[0];
    insights += `<li>📈 Focus on improving <strong>${capitalizeFirst(worstMetric[0])}</strong> (avg: ${worstMetric[1].toFixed(0)}%).</li>`;
    
    insights += '</ul>';
    insightsContent.innerHTML = insights;
}

// ==================== LEARNING PATH ====================

function updateLearningPath() {
    generateStrengthsAndWeaknesses();
    generateRecommendations();
    generateResources();
}

function generateStrengthsAndWeaknesses() {
    const strengthsList = document.getElementById('strengthsList');
    const weaknessesList = document.getElementById('weaknessesList');
    
    if (!sessionData.scoreHistory || sessionData.scoreHistory.length === 0) {
        strengthsList.innerHTML = '<p>Complete simulations to see your strengths.</p>';
        weaknessesList.innerHTML = '<p>Complete simulations to identify growth areas.</p>';
        return;
    }
    
    const avgMetrics = {
        productivity: average(sessionData.scoreHistory.map(s => s.productivity)),
        morale: average(sessionData.scoreHistory.map(s => s.morale)),
        trust: average(sessionData.scoreHistory.map(s => s.trust))
    };
    
    const sorted = Object.entries(avgMetrics).sort((a, b) => b[1] - a[1]);
    
    let strengthsHtml = '<ul class="item-list">';
    sorted.slice(0, 2).forEach(([metric, score]) => {
        strengthsHtml += `<li><strong>${capitalizeFirst(metric)}</strong>: ${score.toFixed(0)}% average</li>`;
    });
    strengthsHtml += '</ul>';
    strengthsList.innerHTML = strengthsHtml;
    
    let weaknessesHtml = '<ul class="item-list">';
    sorted.slice(-1).forEach(([metric, score]) => {
        weaknessesHtml += `<li><strong>${capitalizeFirst(metric)}</strong>: ${score.toFixed(0)}% average - Focus here for maximum improvement</li>`;
    });
    weaknessesHtml += '</ul>';
    weaknessesList.innerHTML = weaknessesHtml;
}

function generateRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');
    
    let recommendations = '<ul class="item-list">';
    
    if ((sessionData.styleUsage?.collaborative || 0) < 5) {
        recommendations += '<li>🤝 Try the <strong>Collaborative</strong> style more often. It typically yields the best long-term results.</li>';
    }
    
    if ((sessionData.styleUsage?.assertive || 0) < 5) {
        recommendations += '<li>💪 Practice <strong>Assertive</strong> communication for balanced leadership.</li>';
    }
    
    if (sessionData.averageScore < 70) {
        recommendations += '<li>📚 Focus on understanding the impact of each communication style.</li>';
    }
    
    if (!sessionData.scenariosCompleted || Object.keys(sessionData.scenariosCompleted).length < 3) {
        recommendations += '<li>🎬 Try different scenario types to broaden your skills.</li>';
    }
    
    recommendations += '</ul>';
    recommendationsList.innerHTML = recommendations;
}

function generateResources() {
    const resourcesList = document.getElementById('resourcesList');
    
    const resources = `
        <ul class="item-list">
            <li>📖 <strong>Crucial Conversations</strong> - Master high-stakes discussions</li>
            <li>📖 <strong>Nonviolent Communication</strong> - Build empathy in communication</li>
            <li>📖 <strong>Radical Candor</strong> - Balance caring personally with challenging directly</li>
            <li>🎥 <strong>TED Talk:</strong> "The Power of Vulnerability" by Brené Brown</li>
            <li>🎥 <strong>TED Talk:</strong> "How to Speak So That People Want to Listen" by Julian Treasure</li>
        </ul>
    `;
    
    resourcesList.innerHTML = resources;
}

// ==================== UTILITY FUNCTIONS ====================

function loadSessionData() {
    const stored = localStorage.getItem('softSkillsLabData');
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        totalSimulations: 0,
        averageScore: 0,
        highestScore: 0,
        currentStreak: 0,
        lastPlayDate: null,
        scoreHistory: [],
        styleUsage: {},
        unlockedAchievements: [],
        scenariosCompleted: {}
    };
}

function saveSessionData() {
    localStorage.setItem('softSkillsLabData', JSON.stringify(sessionData));
    updateDashboard();
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastPlay = sessionData.lastPlayDate ? new Date(sessionData.lastPlayDate).toDateString() : null;
    
    if (lastPlay === today) {
        // Already played today
        return;
    } else if (lastPlay === new Date(Date.now() - 86400000).toDateString()) {
        // Played yesterday, increment streak
        sessionData.currentStreak = (sessionData.currentStreak || 0) + 1;
    } else {
        // Streak broken, reset
        sessionData.currentStreak = 1;
    }
    
    sessionData.lastPlayDate = new Date().toISOString();
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==================== JSON EXPORT/IMPORT FUNCTIONS ====================

/**
 * Export progress data to JSON file for backup or transfer
 */
function exportProgressToJSON() {
    try {
        // Prepare data for export
        const exportData = {
            exportDate: new Date().toISOString(),
            version: "1.0",
            appName: "Soft Skills Lab - Advanced",
            data: sessionData
        };

        // Convert to JSON string with formatting
        const jsonString = JSON.stringify(exportData, null, 2);

        // Create blob and download link
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        link.download = `soft-skills-lab-progress-${timestamp}.json`;
        link.href = url;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Show success notification
        showNotification('✅ Progress exported successfully!', 'success');
        
        console.log('Progress exported successfully');
    } catch (error) {
        console.error('Error exporting progress:', error);
        showNotification('❌ Failed to export progress', 'error');
    }
}

/**
 * Import progress data from JSON file
 */
function importProgressFromJSON(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }

    // Validate file type
    if (!file.name.endsWith('.json')) {
        showNotification('❌ Please select a valid JSON file', 'error');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate data structure
            if (!importedData.data || !importedData.appName || importedData.appName !== "Soft Skills Lab - Advanced") {
                showNotification('❌ Invalid file format', 'error');
                return;
            }

            // Confirm before overwriting
            const confirmed = confirm(
                `Import progress from ${new Date(importedData.exportDate).toLocaleDateString()}?\n\n` +
                `This will replace your current progress:\n` +
                `- Current Simulations: ${sessionData.totalSimulations}\n` +
                `- Current Streak: ${sessionData.currentStreak} days\n` +
                `- Current Achievements: ${sessionData.unlockedAchievements.length}\n\n` +
                `With imported data:\n` +
                `- Imported Simulations: ${importedData.data.totalSimulations}\n` +
                `- Imported Streak: ${importedData.data.currentStreak} days\n` +
                `- Imported Achievements: ${importedData.data.unlockedAchievements.length}`
            );

            if (!confirmed) {
                showNotification('ℹ️ Import cancelled', 'info');
                return;
            }

            // Import data
            sessionData = importedData.data;
            saveSessionData();
            
            // Refresh UI
            updateDashboard();
            updateAnalytics();
            displayAchievements();
            updateLearningPath();
            
            showNotification('✅ Progress imported successfully!', 'success');
            console.log('Progress imported successfully');
            
        } catch (error) {
            console.error('Error importing progress:', error);
            showNotification('❌ Failed to import progress. Invalid file format.', 'error');
        }
    };
    
    reader.onerror = function() {
        showNotification('❌ Failed to read file', 'error');
    };
    
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

/**
 * Show notification message to user
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#11998e' : type === 'error' ? '#eb3349' : '#667eea'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

