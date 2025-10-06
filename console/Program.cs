using System;
using System.Collections.Generic;
using System.Linq;

namespace SoftSkillsLab
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            var simulator = new CommunicationSimulator();
            simulator.Run();
        }
    }

    // Enums for communication styles and team personalities
    enum CommunicationStyle
    {
        Authoritarian = 1,
        Collaborative = 2,
        Passive = 3,
        Assertive = 4,
        Manipulative = 5
    }

    enum TeamPersonality
    {
        Supportive,
        Skeptical,
        Ambitious,
        Cautious
    }

    // Class to hold simulation results
    class SimulationResult
    {
        public int Productivity { get; set; }
        public int Morale { get; set; }
        public int Trust { get; set; }
        public string Reaction { get; set; }
        public string Feedback { get; set; }
        public string Suggestion { get; set; }
        public int OverallScore => (Productivity + Morale + Trust) / 3;
    }

    // Main simulation engine
    class CommunicationSimulator
    {
        private Random random = new Random();
        private List<SimulationResult> sessionHistory = new List<SimulationResult>();

        private readonly Dictionary<CommunicationStyle, string> styleDescriptions = new Dictionary<CommunicationStyle, string>
        {
            { CommunicationStyle.Authoritarian, "Direct, commanding approach - 'Do as I say'" },
            { CommunicationStyle.Collaborative, "Team-oriented, inclusive approach - 'Let's work together'" },
            { CommunicationStyle.Passive, "Non-confrontational, indirect approach - 'Whatever you think is best'" },
            { CommunicationStyle.Assertive, "Clear, respectful, confident approach - 'Here's my view, what's yours?'" },
            { CommunicationStyle.Manipulative, "Indirect, controlling approach - 'You might want to consider...'" }
        };

        public void Run()
        {
            ShowWelcome();

            bool continueSimulation = true;
            while (continueSimulation)
            {
                Console.Clear();
                RunSimulation();
                continueSimulation = AskToContinue();
            }

            ShowSessionSummary();
            Console.WriteLine("\nThank you for using Soft Skills Lab! Keep practicing! 🚀");
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }

        private void ShowWelcome()
        {
            Console.Clear();
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("╔══════════════════════════════════════════════════════════════╗");
            Console.WriteLine("║          SOFT SKILLS LAB - Communication Simulator           ║");
            Console.WriteLine("╚══════════════════════════════════════════════════════════════╝");
            Console.ResetColor();
            Console.WriteLine();
            Console.WriteLine("Welcome! This simulator helps you practice different communication");
            Console.WriteLine("styles and understand their impact on team dynamics.");
            Console.WriteLine();
            Console.WriteLine("Press any key to start...");
            Console.ReadKey();
        }

        private void RunSimulation()
        {
            // Generate random team personality
            var teamPersonality = (TeamPersonality)random.Next(0, Enum.GetValues(typeof(TeamPersonality)).Length);

            // Present scenario
            ShowScenario(teamPersonality);

            // Get user choice
            var style = GetUserChoice();

            // Generate result
            var result = GenerateResult(style, teamPersonality);
            sessionHistory.Add(result);

            // Display results
            DisplayResults(result, teamPersonality);
        }

        private void ShowScenario(TeamPersonality teamPersonality)
        {
            Console.Clear();
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("═══ SCENARIO ═══");
            Console.ResetColor();
            Console.WriteLine();
            Console.WriteLine("You're leading a team meeting to discuss an upcoming project deadline.");
            Console.WriteLine("The project is behind schedule, and tough decisions need to be made.");
            Console.WriteLine();
            
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.Write("Team Mood Today: ");
            Console.ResetColor();
            Console.WriteLine(GetTeamPersonalityDescription(teamPersonality));
            Console.WriteLine();
        }

        private string GetTeamPersonalityDescription(TeamPersonality personality)
        {
            return personality switch
            {
                TeamPersonality.Supportive => "Supportive and willing to help (eager to collaborate)",
                TeamPersonality.Skeptical => "Skeptical and questioning (needs convincing)",
                TeamPersonality.Ambitious => "Ambitious and results-driven (focused on success)",
                TeamPersonality.Cautious => "Cautious and risk-averse (prefers stability)",
                _ => "Neutral"
            };
        }

        private CommunicationStyle GetUserChoice()
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("═══ CHOOSE YOUR COMMUNICATION STYLE ═══");
            Console.ResetColor();
            Console.WriteLine();

            foreach (CommunicationStyle style in Enum.GetValues(typeof(CommunicationStyle)))
            {
                Console.WriteLine($"{(int)style}. {style}");
                Console.ForegroundColor = ConsoleColor.DarkGray;
                Console.WriteLine($"   {styleDescriptions[style]}");
                Console.ResetColor();
            }

            Console.WriteLine();
            Console.Write("Enter your choice (1-5): ");

            while (true)
            {
                if (int.TryParse(Console.ReadLine(), out int choice) && 
                    Enum.IsDefined(typeof(CommunicationStyle), choice))
                {
                    return (CommunicationStyle)choice;
                }
                Console.ForegroundColor = ConsoleColor.Red;
                Console.Write("Invalid choice. Please enter 1-5: ");
                Console.ResetColor();
            }
        }

        private SimulationResult GenerateResult(CommunicationStyle style, TeamPersonality teamPersonality)
        {
            var result = new SimulationResult();

            // Base values for each style
            var baseValues = GetBaseValues(style);
            result.Productivity = baseValues.productivity;
            result.Morale = baseValues.morale;
            result.Trust = baseValues.trust;

            // Apply team personality modifier
            ApplyTeamPersonalityModifier(result, style, teamPersonality);

            // Add some randomness (±10%)
            result.Productivity = Clamp(result.Productivity + random.Next(-10, 11), 0, 100);
            result.Morale = Clamp(result.Morale + random.Next(-10, 11), 0, 100);
            result.Trust = Clamp(result.Trust + random.Next(-10, 11), 0, 100);

            // Generate text content
            result.Reaction = GetReaction(style, teamPersonality, result);
            result.Feedback = GetFeedback(style, result);
            result.Suggestion = GetSuggestion(style);

            return result;
        }

        private (int productivity, int morale, int trust) GetBaseValues(CommunicationStyle style)
        {
            return style switch
            {
                CommunicationStyle.Authoritarian => (75, 45, 50),
                CommunicationStyle.Collaborative => (85, 90, 85),
                CommunicationStyle.Passive => (50, 60, 40),
                CommunicationStyle.Assertive => (85, 85, 90),
                CommunicationStyle.Manipulative => (70, 40, 30),
                _ => (50, 50, 50)
            };
        }

        private void ApplyTeamPersonalityModifier(SimulationResult result, CommunicationStyle style, TeamPersonality personality)
        {
            switch (personality)
            {
                case TeamPersonality.Supportive:
                    if (style == CommunicationStyle.Collaborative || style == CommunicationStyle.Assertive)
                    {
                        result.Morale += 10;
                        result.Trust += 5;
                    }
                    break;

                case TeamPersonality.Skeptical:
                    if (style == CommunicationStyle.Authoritarian || style == CommunicationStyle.Manipulative)
                    {
                        result.Trust -= 15;
                        result.Morale -= 10;
                    }
                    else if (style == CommunicationStyle.Assertive)
                    {
                        result.Trust += 10;
                    }
                    break;

                case TeamPersonality.Ambitious:
                    if (style == CommunicationStyle.Passive)
                    {
                        result.Productivity -= 15;
                        result.Morale -= 10;
                    }
                    else if (style == CommunicationStyle.Authoritarian)
                    {
                        result.Productivity += 10;
                    }
                    break;

                case TeamPersonality.Cautious:
                    if (style == CommunicationStyle.Authoritarian)
                    {
                        result.Trust -= 10;
                    }
                    else if (style == CommunicationStyle.Collaborative)
                    {
                        result.Trust += 10;
                    }
                    break;
            }
        }

        private string GetReaction(CommunicationStyle style, TeamPersonality personality, SimulationResult result)
        {
            var reactions = new Dictionary<CommunicationStyle, List<string>>
            {
                { CommunicationStyle.Authoritarian, new List<string>
                    {
                        "The team falls silent. Some members exchange uncomfortable glances.",
                        "Team members nod quickly but avoid eye contact.",
                        "A few team members shift in their seats, looking tense.",
                        "The room becomes quiet as team members accept the directives."
                    }
                },
                { CommunicationStyle.Collaborative, new List<string>
                    {
                        "The team leans in, energized by the inclusive approach.",
                        "Team members start brainstorming ideas enthusiastically.",
                        "Smiles appear as team members feel valued and heard.",
                        "Several team members volunteer to take on additional responsibilities."
                    }
                },
                { CommunicationStyle.Passive, new List<string>
                    {
                        "Team members look confused and uncertain about next steps.",
                        "The meeting ends with no clear action items or decisions.",
                        "Some team members appear frustrated by the lack of direction.",
                        "The team seems directionless and waiting for someone to lead."
                    }
                },
                { CommunicationStyle.Assertive, new List<string>
                    {
                        "Team members appreciate the clear communication and respond positively.",
                        "The team engages in constructive dialogue about the challenges.",
                        "Team members feel respected and empowered to share their views.",
                        "A collaborative problem-solving atmosphere emerges naturally."
                    }
                },
                { CommunicationStyle.Manipulative, new List<string>
                    {
                        "Some team members sense something is off but can't quite pinpoint it.",
                        "A few skeptical team members exchange knowing glances.",
                        "The team complies but seems hesitant and guarded.",
                        "Trust in leadership quietly diminishes among team members."
                    }
                }
            };

            var reactionList = reactions[style];
            return reactionList[random.Next(reactionList.Count)];
        }

        private string GetFeedback(CommunicationStyle style, SimulationResult result)
        {
            return style switch
            {
                CommunicationStyle.Authoritarian => 
                    $"Your authoritarian approach provided clear direction, boosting short-term productivity " +
                    $"to {result.Productivity}%. However, it decreased team morale to {result.Morale}% " +
                    $"and trust to {result.Trust}%. Team members may feel undervalued and less motivated " +
                    $"over time. This style works in crisis situations but can damage relationships if overused.",

                CommunicationStyle.Collaborative => 
                    $"Excellent choice! Your collaborative approach increased productivity to {result.Productivity}%, " +
                    $"morale to {result.Morale}%, and trust to {result.Trust}%. The team feels valued and " +
                    $"engaged. This style builds long-term success by fostering ownership and commitment. " +
                    $"Team members are more likely to go above and beyond.",

                CommunicationStyle.Passive => 
                    $"Your passive approach led to confusion. Productivity dropped to {result.Productivity}%, " +
                    $"while morale settled at {result.Morale}% and trust at {result.Trust}%. The team " +
                    $"needs clear direction and decisive leadership. Avoiding conflict or tough decisions " +
                    $"can leave teams feeling lost and frustrated.",

                CommunicationStyle.Assertive => 
                    $"Great communication! Your assertive style achieved strong results: {result.Productivity}% " +
                    $"productivity, {result.Morale}% morale, and {result.Trust}% trust. You balanced " +
                    $"clarity with respect, making team members feel heard while providing direction. " +
                    $"This is often the most effective leadership style.",

                CommunicationStyle.Manipulative => 
                    $"Your manipulative approach may have achieved {result.Productivity}% productivity, " +
                    $"but morale dropped to {result.Morale}% and trust plummeted to {result.Trust}%. " +
                    $"Team members sense the manipulation and become guarded. This erodes trust and " +
                    $"damages long-term team dynamics. Authenticity is crucial for sustainable leadership.",

                _ => "Unexpected communication style."
            };
        }

        private string GetSuggestion(CommunicationStyle style)
        {
            return style switch
            {
                CommunicationStyle.Authoritarian => 
                    "💡 Try incorporating team input before making final decisions. Ask 'What do you think?' " +
                    "to show you value their perspective. Reserve authoritarian style for genuine emergencies.",

                CommunicationStyle.Collaborative => 
                    "💡 You're on the right track! Continue fostering open dialogue. Remember to ensure " +
                    "discussions stay focused and lead to actionable decisions within reasonable timeframes.",

                CommunicationStyle.Passive => 
                    "💡 Practice stating your position clearly: 'Here's what I think we should do...' " +
                    "It's okay to make decisions and lead. Your team needs and wants your guidance.",

                CommunicationStyle.Assertive => 
                    "💡 Excellent approach! Keep balancing clarity with empathy. Continue to invite input " +
                    "while providing decisive direction. This builds both trust and results.",

                CommunicationStyle.Manipulative => 
                    "💡 Shift to direct, honest communication. Say what you mean and mean what you say. " +
                    "Transparency builds trust. Try expressing your needs openly instead of indirectly influencing.",

                _ => "Keep practicing different styles!"
            };
        }

        private void DisplayResults(SimulationResult result, TeamPersonality personality)
        {
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("═══ TEAM REACTION ═══");
            Console.ResetColor();
            Console.WriteLine();
            Console.WriteLine(result.Reaction);
            Console.WriteLine();

            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("═══ PERFORMANCE METRICS ═══");
            Console.ResetColor();
            Console.WriteLine();
            
            DisplayMetricBar("Productivity", result.Productivity);
            DisplayMetricBar("Morale", result.Morale);
            DisplayMetricBar("Trust", result.Trust);
            
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write("Overall Score: ");
            DisplayScore(result.OverallScore);
            Console.ResetColor();
            Console.WriteLine();

            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine("═══ FEEDBACK ═══");
            Console.ResetColor();
            Console.WriteLine();
            Console.WriteLine(WrapText(result.Feedback, 70));
            Console.WriteLine();

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("═══ SUGGESTION FOR IMPROVEMENT ═══");
            Console.ResetColor();
            Console.WriteLine();
            Console.WriteLine(WrapText(result.Suggestion, 70));
            Console.WriteLine();
        }

        private void DisplayMetricBar(string label, int value)
        {
            Console.Write($"{label,-15}: ");
            
            // Color based on value
            if (value >= 75) Console.ForegroundColor = ConsoleColor.Green;
            else if (value >= 50) Console.ForegroundColor = ConsoleColor.Yellow;
            else Console.ForegroundColor = ConsoleColor.Red;

            int bars = value / 5;
            Console.Write(new string('█', bars));
            Console.Write(new string('░', 20 - bars));
            Console.Write($" {value}%");
            Console.ResetColor();
            Console.WriteLine();
        }

        private void DisplayScore(int score)
        {
            if (score >= 90) Console.ForegroundColor = ConsoleColor.Green;
            else if (score >= 75) Console.ForegroundColor = ConsoleColor.Yellow;
            else if (score >= 60) Console.ForegroundColor = ConsoleColor.DarkYellow;
            else Console.ForegroundColor = ConsoleColor.Red;

            Console.Write($"{score}%");
            Console.ResetColor();

            string rating = score switch
            {
                >= 90 => " (Excellent! 🌟)",
                >= 75 => " (Good! 👍)",
                >= 60 => " (Average ⚠️)",
                _ => " (Needs Improvement ⚠️)"
            };

            Console.WriteLine(rating);
        }

        private string WrapText(string text, int maxWidth)
        {
            var words = text.Split(' ');
            var lines = new List<string>();
            var currentLine = "";

            foreach (var word in words)
            {
                if (currentLine.Length + word.Length + 1 <= maxWidth)
                {
                    currentLine += (currentLine.Length > 0 ? " " : "") + word;
                }
                else
                {
                    if (currentLine.Length > 0) lines.Add(currentLine);
                    currentLine = word;
                }
            }
            if (currentLine.Length > 0) lines.Add(currentLine);

            return string.Join(Environment.NewLine, lines);
        }

        private bool AskToContinue()
        {
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.Write("Would you like to try another communication style? (y/n): ");
            Console.ResetColor();
            
            var response = Console.ReadLine()?.ToLower();
            return response == "y" || response == "yes";
        }

        private void ShowSessionSummary()
        {
            if (sessionHistory.Count == 0) return;

            Console.Clear();
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("╔══════════════════════════════════════════════════════════════╗");
            Console.WriteLine("║                    SESSION SUMMARY                           ║");
            Console.WriteLine("╚══════════════════════════════════════════════════════════════╝");
            Console.ResetColor();
            Console.WriteLine();

            Console.WriteLine($"Total Simulations: {sessionHistory.Count}");
            Console.WriteLine($"Average Overall Score: {sessionHistory.Average(r => r.OverallScore):F1}%");
            Console.WriteLine($"Average Productivity: {sessionHistory.Average(r => r.Productivity):F1}%");
            Console.WriteLine($"Average Morale: {sessionHistory.Average(r => r.Morale):F1}%");
            Console.WriteLine($"Average Trust: {sessionHistory.Average(r => r.Trust):F1}%");
            Console.WriteLine();

            var bestResult = sessionHistory.OrderByDescending(r => r.OverallScore).First();
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"Best Overall Score: {bestResult.OverallScore}%");
            Console.ResetColor();
            Console.WriteLine();

            Console.WriteLine("Keep practicing to improve your communication skills!");
        }

        private int Clamp(int value, int min, int max)
        {
            return Math.Max(min, Math.Min(max, value));
        }
    }
}
