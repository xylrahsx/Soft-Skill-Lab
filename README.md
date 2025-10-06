# Soft Skills Lab - Communication Style Simulator

An interactive educational tool designed to help users practice and improve their soft skills by demonstrating the impact of different communication styles on team dynamics.

## 🎯 Two Versions Available

### Basic Version (`index.html`)
Perfect for quick practice and learning fundamentals

### **Advanced Version (`index-advanced.html`)** ⭐
Full-featured professional training platform with:
- Multi-turn conversation scenarios
- Advanced analytics and trend tracking
- Achievement system with 15+ unlockable badges
- Personalized learning paths
- Interactive data visualizations
- Progress tracking and streaks

## 📋 Project Overview

This simulator allows users to:
- Choose a communication style (authoritarian, collaborative, passive, assertive, manipulative)
- Experience simulated team reactions based on their choices
- Receive constructive feedback explaining team dynamics
- Track their progress with a scoring system
- Learn from personalized improvement suggestions
- **[Advanced]** Engage in multi-turn conversations with dynamic team responses
- **[Advanced]** Unlock achievements and track learning progress
- **[Advanced]** View detailed analytics and communication patterns

## 🎯 Core Features

### User Input
Select from five different communication styles:
1. **Authoritarian**: Direct, commanding approach
2. **Collaborative**: Team-oriented, inclusive approach
3. **Passive**: Non-confrontational, indirect approach
4. **Assertive**: Clear, respectful, confident approach
5. **Manipulative**: Indirect, controlling approach

### Simulation Engine
- Generates realistic team reactions based on chosen communication style
- Incorporates random team personality factors for varied outcomes
- Provides immediate feedback on communication effectiveness

### Feedback System
- Explains why the team reacted in a specific way
- Highlights strengths and weaknesses of the chosen style
- Offers actionable suggestions for improvement

### Scoring System
- Tracks productivity, morale, and trust metrics
- Calculates overall effectiveness scores
- Maintains session history for comparison

### Replay Option
- Try different communication styles
- Compare outcomes side-by-side
- Learn from different scenarios

## 🚀 Getting Started

### Prerequisites

#### For C# Console Version:
- .NET 6.0 SDK or later
- Any text editor or Visual Studio

#### For Web Version:
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- No installation required!

## 📦 Installation & Running

### C# Console Version

1. **Navigate to the console folder:**
   ```bash
   cd console
   ```

2. **Run the application:**
   ```bash
   dotnet run
   ```

   Or compile and run:
   ```bash
   dotnet build
   dotnet run
   ```

### Web Version

#### Basic Version
1. **Open the basic version:**
   ```bash
   cd web
   start index.html
   ```

#### Advanced Version (Recommended) ⭐
1. **Open the advanced version with full features:**
   ```bash
   cd web
   start index-advanced.html
   ```

   Or double-click the respective HTML file in File Explorer.

## 🎮 How to Use

### Console Version
1. Run the program
2. Read the scenario presented
3. Choose a communication style by entering the corresponding number (1-5)
4. Review the team's reaction and feedback
5. Check your performance scores
6. Choose to try again or exit

### Web Version
1. Open `index.html` in your browser
2. Read the scenario
3. Click on one of the communication style buttons
4. Review the animated team reaction
5. Read the detailed feedback and suggestions
6. View your performance metrics
7. Click "Try Again" to simulate another scenario

## 📊 Understanding the Scores

Each simulation generates three key metrics:

- **Productivity**: How effectively the team completes tasks
- **Morale**: Team satisfaction and engagement levels
- **Trust**: Team confidence in leadership and communication

**Overall Score Interpretation:**
- 90-100: Excellent communication
- 75-89: Good communication with room for improvement
- 60-74: Average communication, needs development
- Below 60: Poor communication, significant improvement needed

## 🧩 Project Structure

```
Soft Skills Lab/
├── README.md                    # This file
├── ADVANCED_FEATURES.md         # Detailed feature documentation
├── QUICK_START.md               # Beginner's guide
├── PROJECT_SUMMARY.md           # Complete project summary
├── console/                     # C# Console application
│   ├── Program.cs              # Main simulation logic
│   └── SoftSkillsLab.csproj    # Project file
└── web/                        # Web-based application
    ├── index.html              # Basic version
    ├── styles.css              # Basic styling
    ├── script.js               # Basic logic
    ├── index-advanced.html     # Advanced version ⭐
    ├── styles-advanced.css     # Advanced styling
    └── script-advanced.js      # Advanced logic
```

## 🔧 Technical Details

### Architecture
- **No database required**: All logic handled in-memory
- **Stateless design**: Each simulation is independent
- **Random variation**: Team personalities add unpredictability
- **Extensible**: Easy to add new communication styles or scenarios

### Technologies Used
- **Console Version**: C# (.NET 6+)
- **Web Version**: HTML5, CSS3, Vanilla JavaScript

## 🎓 Learning Outcomes

By using this simulator, users will:
- Understand the impact of different communication styles
- Recognize patterns in team reactions
- Develop awareness of their communication preferences
- Learn strategies for effective leadership communication
- Practice adapting communication styles to situations

## 🔮 Features Implemented

### Basic Version
✅ Multiple communication styles (5 total)  
✅ Random team personalities for varied outcomes  
✅ Scoring system to track user progress  
✅ Improvement suggestions after each simulation  
✅ Visual feedback in web version  
✅ Session history tracking

### Advanced Version (Additional Features)
✅ **Multi-Turn Conversations**: Dynamic 3-5 turn scenarios where your choices affect the next interaction  
✅ **Scenario Variety**: 6 different scenario types (Deadline Crisis, Conflict Resolution, Performance Review, Budget Cuts, Innovation Workshop, Crisis Management)  
✅ **Difficulty Levels**: Easy, Medium, and Hard scenarios for progressive learning  
✅ **Achievement System**: 15+ unlockable badges to motivate continued practice  
✅ **Streak Tracking**: Daily practice streaks to build habits  
✅ **Advanced Analytics**: Interactive charts showing performance trends, style distribution, and score history  
✅ **Personalized Learning Path**: AI-powered insights into strengths, weaknesses, and recommended next steps  
✅ **Detailed Feedback**: Turn-by-turn analysis of your communication choices  
✅ **Progress Dashboard**: Quick overview of your learning journey with key metrics  
✅ **Data Persistence**: Your progress is saved locally and persists across sessions  

## 🤝 Contributing

Feel free to extend this project by:
- Adding new communication styles
- Creating more complex scenarios
- Implementing multi-turn conversations
- Adding cultural context variations
- Building team-specific personality profiles

## 📝 License

This project is created for educational purposes. Feel free to use, modify, and distribute as needed.

## 🙏 Acknowledgments

Designed as an interactive learning tool to help professionals develop better communication and leadership skills.

---

**Happy Learning! 🚀**

For questions or suggestions, feel free to modify and extend this project to fit your learning needs.
