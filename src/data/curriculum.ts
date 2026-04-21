import { Brain, Sparkles, Layers, GitBranch, Compass, BarChart3, Bot, Rocket, LucideIcon } from "lucide-react";

export type Pillar = {
  id: string;
  title: string;
  description: string;
  example: string;
  color: string; // tailwind class color name (pillar-*)
  icon: LucideIcon;
};

export const pillars: Pillar[] = [
  { id: "decomposition", title: "Decomposition", description: "Breaking a complex problem into smaller, manageable parts.", example: "Planning a picnic = food + transport + games + permissions.", color: "pillar-decompose", icon: Layers },
  { id: "pattern", title: "Pattern Recognition", description: "Spotting regularities and trends in data or behavior.", example: "Noticing it always rains in July helps you predict next year.", color: "pillar-pattern", icon: Sparkles },
  { id: "abstraction", title: "Abstraction", description: "Focusing on essential details while ignoring the rest.", example: "A subway map ignores roads — only stations matter.", color: "pillar-abstract", icon: Brain },
  { id: "algorithm", title: "Algorithm Design", description: "Writing precise step-by-step instructions to solve a problem.", example: "A recipe is an algorithm to make a cake.", color: "pillar-algorithm", icon: GitBranch },
];

export type Activity = {
  title: string;
  focus: string;
  time: string;
  objective: string;
  steps: string[];
};

export type ClassChapter = {
  grade: number;
  slug: string;
  title: string;
  tagline: string;
  objectives: string;
  color: string; // hsl variable, e.g. "var(--grade-3)"
  icon: LucideIcon;
  activities: Activity[];
  toolDeepDive?: { name: string; description: string; sections: { heading: string; items: string[] }[] };
  authorInsight?: string;
};

export const classes: ClassChapter[] = [
  {
    grade: 3,
    slug: "class-3",
    title: "Sequencing & Observation",
    tagline: "Stories, objects, movement, and very simple AI awareness.",
    objectives: "Solve problems with hidden ideas, identify simple 1–2 change patterns, and follow clear step-by-step rules.",
    color: "var(--grade-3)",
    icon: Compass,
    activities: [
      {
        title: "The Human Robot",
        focus: "Algorithm Design",
        time: "15 mins",
        objective: "Students learn that order matters and instructions must be precise.",
        steps: [
          "Pick one student to be the 'Robot'. The Robot only does exactly what is said.",
          "Class gives a task: 'Walk to the door and pick up the eraser.'",
          "Students give verbal instructions one step at a time (e.g., 'Lift left foot').",
          "If the Robot bumps into a desk, the class must 'debug' the instructions.",
        ],
      },
      {
        title: "Pattern Hunt",
        focus: "Pattern Recognition",
        time: "10 mins",
        objective: "Find patterns in the immediate environment.",
        steps: [
          "Give students 5 minutes to walk around the classroom.",
          "Find 3 things that repeat (tiles, window bars, alphabet chart).",
          "Draw the pattern and explain the rule (e.g., 'Blue, White, Blue, White').",
        ],
      },
      {
        title: "Story Sequencing Cards",
        focus: "Algorithm Design",
        time: "15 mins",
        objective: "Arrange events in correct logical order.",
        steps: [
          "Show 4 jumbled picture cards of a story (e.g., planting a seed).",
          "In pairs, students put cards in correct order.",
          "Each pair narrates the sequence aloud.",
          "Discuss: what changes if step 2 and 3 are swapped?",
        ],
      },
      {
        title: "Odd One Out",
        focus: "Pattern Recognition",
        time: "10 mins",
        objective: "Spot the item that breaks a pattern.",
        steps: [
          "Teacher shows rows of objects/shapes — one breaks the rule.",
          "Students raise hands to identify the odd one.",
          "Explain WHY it doesn't fit the pattern.",
          "Repeat with 5 increasingly tricky examples.",
        ],
      },
      {
        title: "Smart or Not Smart?",
        focus: "AI Awareness",
        time: "15 mins",
        objective: "Distinguish AI-powered devices from regular ones.",
        steps: [
          "Show pictures: torch, Alexa, calculator, Google Maps, fan, self-driving car.",
          "Students sort into 'Thinks for itself' vs 'Just follows a switch'.",
          "Discuss: what makes something 'smart'?",
          "Conclude: AI learns from data; a fan just turns on.",
        ],
      },
      {
        title: "Treasure Map Directions",
        focus: "Algorithm Design",
        time: "20 mins",
        objective: "Write precise navigation instructions.",
        steps: [
          "Draw a 5x5 grid on the board with a treasure cell.",
          "Students write step-by-step moves: 'Forward 2, Right 1, Forward 3'.",
          "A volunteer follows the steps exactly.",
          "Debug if the path misses the treasure.",
        ],
      },
      {
        title: "Sound Patterns Clap-Along",
        focus: "Pattern Recognition",
        time: "10 mins",
        objective: "Recognize and continue auditory patterns.",
        steps: [
          "Teacher claps a pattern (clap-clap-stomp).",
          "Class repeats it back twice.",
          "Students invent their own 4-beat pattern.",
          "Partner predicts and continues the pattern.",
        ],
      },
    ],
    authorInsight:
      "Enterprise Connection: 'The Human Robot' is the foundation of Robotic Process Automation (RPA). Automating an invoice workflow needs the exact same precision — only the scale changes.",
  },
  {
    grade: 4,
    slug: "class-4",
    title: "Sorting, Comparison & Everyday Algorithms",
    tagline: "Light data handling and early ethical thinking.",
    objectives: "Solve moderate problems, identify multi-change patterns, follow elaborate conditions.",
    color: "var(--grade-4)",
    icon: BarChart3,
    activities: [
      {
        title: "The Picnic Planner",
        focus: "Decomposition",
        time: "20 mins",
        objective: "Break one big task into smaller pieces.",
        steps: [
          "Present: 'We're going on a class picnic.'",
          "List everything that must happen: Food, Transport, Games, Permissions.",
          "Group into categories — under Food: Buy snacks, Pack water, Distribute.",
          "Build a mind map on the board.",
        ],
      },
      {
        title: "The Vegetable Bar Chart",
        focus: "Data Handling",
        time: "25 mins",
        objective: "Collect and represent data manually.",
        steps: [
          "Ask: 'What is your favourite vegetable?' (Carrot, Peas, Potato, Other).",
          "Count raised hands.",
          "Draw a simple bar chart on the board.",
          "Discuss: most popular? least? How does this help meal planning?",
        ],
      },
      {
        title: "Sort the Library Shelf",
        focus: "Algorithm Design",
        time: "20 mins",
        objective: "Practice sorting by different criteria.",
        steps: [
          "Give 8 books (or cards) to a group.",
          "Sort by height, then by colour, then alphabetically.",
          "Discuss which sort was easiest and why.",
          "Connect: search engines sort billions of pages this way.",
        ],
      },
      {
        title: "Compare & Choose: Best Lunch Box",
        focus: "Comparison",
        time: "20 mins",
        objective: "Make decisions using multiple attributes.",
        steps: [
          "List 3 lunch boxes with price, size, weight, colour.",
          "Students rank them based on what THEY value most.",
          "Compare rankings — same data, different priorities.",
          "Connect: AI recommendation systems weigh attributes too.",
        ],
      },
      {
        title: "Recipe Algorithm Race",
        focus: "Algorithm Design",
        time: "25 mins",
        objective: "Write clear sequential instructions.",
        steps: [
          "Each group writes the steps to make lemonade.",
          "Swap recipes with another group.",
          "Read out exactly as written — no guessing missing steps.",
          "Add fixes (debug) until the recipe works perfectly.",
        ],
      },
      {
        title: "Spot the Repeating Number Pattern",
        focus: "Pattern Recognition",
        time: "15 mins",
        objective: "Find rules in number sequences.",
        steps: [
          "Write 2, 4, 6, 8, ?  on the board.",
          "Students find the next number and the rule.",
          "Try harder: 1, 4, 9, 16, ?  (squares).",
          "Invent your own pattern and challenge a partner.",
        ],
      },
      {
        title: "AI in My Day",
        focus: "AI Awareness",
        time: "15 mins",
        objective: "Identify AI uses in everyday life.",
        steps: [
          "Make a 24-hour clock on paper.",
          "Mark every time AI helps: alarm, YouTube, Maps, autocorrect.",
          "Share with a partner — count total touchpoints.",
          "Discuss: what would your day look like without AI?",
        ],
      },
    ],
  },
  {
    grade: 5,
    slug: "class-5",
    title: "Data, Flowcharts & Fairness",
    tagline: "Build flowcharts; meet bias and fairness for the first time.",
    objectives: "Solve multi-layered problems, build flowcharts, use early digital tools, understand fairness.",
    color: "var(--grade-5)",
    icon: GitBranch,
    activities: [
      {
        title: "Flowcharting the Morning Routine",
        focus: "Algorithm Design",
        time: "30 mins",
        objective: "Visualize a process with decision points.",
        steps: [
          "List steps to get ready for school.",
          "Introduce decision: 'Is it raining?'",
          "If YES → take umbrella. If NO → take cap.",
          "Draw using arrows and boxes — your first flowchart.",
        ],
      },
      {
        title: "Is It Fair?",
        focus: "Bias & Fairness",
        time: "20 mins",
        objective: "Introduce the concept of bias.",
        steps: [
          "Scenario: A music app only recommends English songs, never Hindi.",
          "Question: Is this fair for Hindi-only listeners?",
          "Why does the app do this? (Trained on English data only.)",
          "Conclusion: Computers are only as fair as the data we give them.",
        ],
      },
      {
        title: "Decompose: Plan a Birthday Party",
        focus: "Decomposition",
        time: "30 mins",
        objective: "Break a large goal into sub-tasks and dependencies.",
        steps: [
          "List everything needed: invites, cake, games, decor, gifts.",
          "Group into categories and decide order (some depend on others).",
          "Draw a tree diagram of tasks and sub-tasks.",
          "Estimate time per task — total project plan!",
        ],
      },
      {
        title: "Survey & Tally: Favourite Subject",
        focus: "Data Handling",
        time: "25 mins",
        objective: "Collect, tally, and visualise classroom data.",
        steps: [
          "Each student picks a favourite subject.",
          "Tally responses on the board.",
          "Convert tally to a bar chart on graph paper.",
          "Discuss what the chart tells us — and what it hides.",
        ],
      },
      {
        title: "Algorithm: Cross the Road Safely",
        focus: "Algorithm Design",
        time: "20 mins",
        objective: "Design an algorithm with safety conditions.",
        steps: [
          "Write the steps to safely cross a road.",
          "Add decisions: 'Is the signal red?', 'Are vehicles stopped?'",
          "Test by acting it out in pairs.",
          "Discuss what happens if a step is skipped.",
        ],
      },
      {
        title: "Map It Out — Abstraction in Action",
        focus: "Abstraction",
        time: "25 mins",
        objective: "Understand what to keep and what to drop.",
        steps: [
          "Show a satellite photo and a simplified school map.",
          "List details kept (rooms) vs ignored (trees, cars).",
          "Students sketch a map of their home — only essentials.",
          "Explain: abstraction makes complex things usable.",
        ],
      },
      {
        title: "Fairness Court: Loan Approval",
        focus: "Bias & Fairness",
        time: "30 mins",
        objective: "Role-play how rules can be unfair.",
        steps: [
          "Give 5 fictional applicants with age, income, city.",
          "Apply rule: 'Approve only if income > X'.",
          "Discuss who is left out unfairly.",
          "Rewrite the rule to be fairer — debate trade-offs.",
        ],
      },
    ],
  },
  {
    grade: 6,
    slug: "class-6",
    title: "Digital Tools, Spreadsheets & Intro to ML",
    tagline: "Transition to digital tools and event-driven thinking.",
    objectives: "Data literacy, event-driven thinking, intro to ML via Scratch & Teachable Machine.",
    color: "var(--grade-6)",
    icon: Bot,
    toolDeepDive: {
      name: "Scratch 3.0",
      description: "A visual programming language where students connect colour-coded code blocks to control sprites.",
      sections: [
        { heading: "The Interface", items: ["Stage — where the action happens", "Sprite Pane — list of characters", "Block Palette — Motion, Looks, Sound, Events, Control"] },
        { heading: "Building a Chatbot", items: ["Drag 'When this sprite clicked'", "Add 'Ask [What's your name?] and wait'", "Add 'Say [Hello] + (answer) for 2 secs'"] },
        { heading: "Logic & Control", items: ["Use 'If…then…else' blocks", "Example: If answer = 'Apple', say 'I like fruit', else say 'I don't know that'"] },
      ],
    },
    activities: [
      {
        title: "Digital Lab: Rainfall Data in Excel",
        focus: "Data Literacy",
        time: "40 mins",
        objective: "Use spreadsheets to analyse trends.",
        steps: [
          "Open Excel/Google Sheets.",
          "Enter rainfall data for 10 days (10mm, 0mm, 5mm…).",
          "Use SUM to find total rain.",
          "Use AVERAGE.",
          "Insert a Line Chart to visualize the trend.",
        ],
      },
      {
        title: "Scratch Chatbot: Mood Buddy",
        focus: "Programming",
        time: "45 mins",
        objective: "Build a basic conditional chatbot.",
        steps: [
          "Open Scratch and pick a friendly sprite.",
          "Use 'Ask [How are you?]' and store the answer.",
          "If answer = 'happy', say 'Yay!'; else say 'Tell me more'.",
          "Add 3 more moods with unique responses.",
        ],
      },
      {
        title: "Spreadsheet Sleuth: Sort & Filter",
        focus: "Data Literacy",
        time: "30 mins",
        objective: "Use sort/filter to answer questions from data.",
        steps: [
          "Open a sheet of 20 students with marks across subjects.",
          "Sort by Maths marks — find top 3.",
          "Filter to show only students above 80% in Science.",
          "Discuss: how does Google Sheets do this so fast?",
        ],
      },
      {
        title: "Event-Driven Maze",
        focus: "Programming",
        time: "40 mins",
        objective: "Use events and conditions to control a sprite.",
        steps: [
          "Design a maze backdrop in Scratch.",
          "Use arrow-key events to move the sprite.",
          "Add 'If touching wall → bounce back'.",
          "Add a 'goal' sprite that says 'You win!' when touched.",
        ],
      },
      {
        title: "Teachable Machine: Hand Signs",
        focus: "Machine Learning",
        time: "40 mins",
        objective: "Train a model to recognise gestures.",
        steps: [
          "Open Google Teachable Machine → Image Project.",
          "Train classes: 'Thumbs Up', 'Thumbs Down', 'Wave'.",
          "Capture 30+ images per class with varied backgrounds.",
          "Test live and discuss confidence scores.",
        ],
      },
      {
        title: "Algorithm Detective: Recommendation Rules",
        focus: "Pattern Recognition",
        time: "25 mins",
        objective: "Reverse-engineer a recommender's logic.",
        steps: [
          "Show YouTube/Netflix recommendation rows.",
          "Students guess what rule chose each video.",
          "Write a pseudo-code rule: 'If user watched X, suggest Y'.",
          "Discuss filter bubbles and variety.",
        ],
      },
    ],
    authorInsight:
      "Enterprise Connection: 'If-Then' logic is the bedrock of all software. In banking: 'If balance < 1000, decline transaction.' Scratch blocks are a visual version of the Python or Java that powers trading systems.",
  },
  {
    grade: 7,
    slug: "class-7",
    title: "Predictive Analytics, Branching Logic & Ethics",
    tagline: "Regression, classification, and AI ethics in action.",
    objectives: "Deepen data analysis, introduce predictive techniques, focus on ethics.",
    color: "var(--grade-7)",
    icon: Sparkles,
    toolDeepDive: {
      name: "Google Teachable Machine",
      description: "A web-based tool that trains a simple ML model in your browser using images, sounds, or poses.",
      sections: [
        { heading: "1. Gather Data", items: ["Select 'Image Project'", "Create Class 1 ('Apple') — record 10+ images from different angles"] },
        { heading: "2. Train Model", items: ["Create Class 2 ('Banana') — record 10+ banana images", "Click 'Train Model' and watch the AI find pixel patterns"] },
        { heading: "3. Export & Test", items: ["Show the model an apple — high confidence for 'Apple'", "Click 'Export Model' to use in Scratch"] },
      ],
    },
    activities: [
      {
        title: "The Biased Dataset",
        focus: "Ethics",
        time: "35 mins",
        objective: "Understand how data affects AI.",
        steps: [
          "Train 'Apple' using only red apples.",
          "Train 'Banana' using only green bananas.",
          "Test with a Green Apple.",
          "The AI may call it 'Banana' because it's green!",
          "Discussion: The AI isn't stupid — it was trained on biased data.",
        ],
      },
      {
        title: "Predict the Score: Mini Regression",
        focus: "Predictive Analytics",
        time: "35 mins",
        objective: "Use simple trend lines to predict outcomes.",
        steps: [
          "Plot study hours vs marks for 10 students.",
          "Draw a 'best fit' line by hand.",
          "Predict marks for someone studying 6 hours.",
          "Discuss accuracy and outliers.",
        ],
      },
      {
        title: "Classify It: Fruit or Vegetable",
        focus: "Classification",
        time: "30 mins",
        objective: "Define features that separate classes.",
        steps: [
          "List 15 items: tomato, apple, carrot, etc.",
          "Define features (sweet?, has seeds?, eaten raw?).",
          "Build a decision tree on paper.",
          "Test edge cases — where does the tree fail?",
        ],
      },
      {
        title: "Branching Logic: Choose-Your-Adventure",
        focus: "Algorithm Design",
        time: "40 mins",
        objective: "Design multi-path stories with conditions.",
        steps: [
          "Write a 5-scene story with choice points.",
          "Map paths in a flowchart.",
          "Implement in Scratch or Google Slides hyperlinks.",
          "Swap with a peer and play through.",
        ],
      },
      {
        title: "Ethics Debate: Should AI Grade Essays?",
        focus: "Ethics",
        time: "30 mins",
        objective: "Argue both sides of an AI ethics question.",
        steps: [
          "Split class into FOR and AGAINST teams.",
          "Each team prepares 3 arguments with examples.",
          "Hold a 10-minute debate.",
          "Vote and reflect on what changed minds.",
        ],
      },
      {
        title: "Spreadsheet Forecast: Weather Trend",
        focus: "Data Analysis",
        time: "35 mins",
        objective: "Use formulas to forecast next-week values.",
        steps: [
          "Enter 30 days of temperature data.",
          "Use AVERAGE, MIN, MAX, and TREND functions.",
          "Plot a trend line and forecast 3 days ahead.",
          "Compare with actual weather later — measure error.",
        ],
      },
    ],
  },
  {
    grade: 8,
    slug: "class-8",
    title: "The AI Project Lifecycle",
    tagline: "Real-world projects with the full AI cycle.",
    objectives: "Engage the full AI project cycle: Define → Collect → Build → Test → Reflect.",
    color: "var(--grade-8)",
    icon: Rocket,
    activities: [
      {
        title: "Project: Smart Attendance System",
        focus: "AI Project Cycle",
        time: "3 hours",
        objective: "Apply the full lifecycle to a real-world problem.",
        steps: [
          "Define Problem: Taking attendance takes too long.",
          "Collect Data: Photos of students in different lighting.",
          "Train Model: Use a face-recognition tool (or simulate it).",
          "Test: Does it recognise students wearing glasses? (Identify bias.)",
          "Reflect: Is this faster? Is it privacy-friendly?",
        ],
      },
      {
        title: "Build a Recommendation Engine (Paper)",
        focus: "AI Project Cycle",
        time: "45 mins",
        objective: "Design a simple content recommender.",
        steps: [
          "Survey 10 friends: list their top 3 movies.",
          "Find overlaps — group people by taste.",
          "For each group, recommend an unseen movie.",
          "Reflect: how is this like Netflix's algorithm?",
        ],
      },
      {
        title: "Chatbot for the School Library",
        focus: "Programming",
        time: "60 mins",
        objective: "Apply NLP basics to a real use case.",
        steps: [
          "List 10 common library questions (timings, fines, books).",
          "In Scratch (or Dialogflow), map keywords to responses.",
          "Test with classmates — log questions it can't answer.",
          "Iterate to improve coverage.",
        ],
      },
      {
        title: "Data Cleaning Lab",
        focus: "Data Preparation",
        time: "40 mins",
        objective: "Understand why dirty data breaks AI.",
        steps: [
          "Open a messy CSV (duplicates, blanks, wrong types).",
          "Identify each issue and propose a fix.",
          "Clean the data using spreadsheet tools.",
          "Discuss: 80% of an AI project = cleaning data.",
        ],
      },
      {
        title: "Privacy Audit of Your Phone",
        focus: "Ethics",
        time: "30 mins",
        objective: "Understand digital footprints and consent.",
        steps: [
          "List apps you use daily.",
          "Check what permissions each one asks for.",
          "Identify 3 you'd revoke and explain why.",
          "Discuss the trade-off: convenience vs privacy.",
        ],
      },
      {
        title: "Capstone Pitch: AI for My Community",
        focus: "AI Project Cycle",
        time: "60 mins",
        objective: "Pitch an end-to-end AI solution.",
        steps: [
          "Identify a real problem in your school or locality.",
          "Define data needed, model type, and success metric.",
          "Sketch the user interface on paper.",
          "Present a 3-minute pitch with risks and ethics.",
        ],
      },
    ],
    authorInsight:
      "Enterprise Connection: The Class 8 AI Project Cycle is exactly how we build LLMs and RAG systems in industry — define the business problem, collect data, train/fine-tune, and rigorously test for hallucinations before deployment.",
  },
];

export type WorkshopModule = {
  number: number;
  title: string;
  goal: string;
  strategy: string;
  activity: { name: string; time: string; mode: string; task: string };
};

export const workshopModules: WorkshopModule[] = [
  {
    number: 1, title: "Curriculum Orientation & Vision",
    goal: "Teachers understand the 'Why' behind CT and AI, shifting from anxiety to empowerment.",
    strategy: "Use the 'Think First, Tool Second' philosophy. Review NEP 2020 and NCF-SE 2023 to set context.",
    activity: { name: "Myth-Busting Session", time: "15 mins", mode: "Group Discussion", task: "Each group debunks a common myth (e.g., 'AI is only for CS teachers') using 'Think First, Tool Second'." },
  },
  {
    number: 2, title: "CT Foundations — The Four Pillars",
    goal: "Explain Decomposition, Patterns, Abstraction & Algorithms with real-world analogies.",
    strategy: "Avoid jargon. Use cooking recipes (Algorithms), organising a closet (Decomposition), spotting weather trends (Patterns).",
    activity: { name: "The Sandwich Algorithm", time: "20 mins", mode: "Paired Activity", task: "One teacher is the 'Robot', the other gives literal verbal instructions to make a peanut-butter sandwich." },
  },
  {
    number: 3, title: "Unplugged Classroom Activities",
    goal: "Experience activities as students; learn to manage engagement without computers.",
    strategy: "'Unplugged' ≠ unstructured. Focus on logic before syntax; debrief carefully.",
    activity: { name: "Activity Simulation Stations", time: "25 mins", mode: "Group Rotation", task: "Set up 3 stations (Human Robot, Pattern Hunt, Sort & Explain). Rotate every 8 minutes." },
  },
  {
    number: 4, title: "Lesson Planning for Classes 3–5",
    goal: "Draft a subject-linked CT activity that doesn't add extra time.",
    strategy: "Inject CT questions into existing chapters — e.g., decomposition in a Math measurement lesson.",
    activity: { name: "The 5-Minute Lesson Plan", time: "30 mins", mode: "Individual Work", task: "Pick a textbook chapter; write one CT question that fits. Share with a partner for feedback." },
  },
  {
    number: 5, title: "AI Basics for Teachers",
    goal: "Demystify AI — 'AI is prediction based on data.'",
    strategy: "Use the 'Black Box' analogy: you don't need to know how the engine works to drive the car.",
    activity: { name: "Predict the Next Word", time: "15 mins", mode: "Interactive Demo", task: "'The cat sat on the ___.' Teachers shout the word. Their prediction is based on data — so does AI, with millions of sentences." },
  },
  {
    number: 6, title: "AI Ethics — Bias, Privacy, Fairness",
    goal: "Host safe, age-appropriate discussions about digital responsibility.",
    strategy: "Discuss data collection. Use the 'Cookie Tracker' analogy for digital footprints.",
    activity: { name: "The Cookie Jar", time: "20 mins", mode: "Roleplay", task: "One person plays 'The Website', others 'Users'. Each visit costs a 'cookie' (a fact). Reveal what the Website knows." },
  },
  {
    number: 7, title: "Digital Tools for Classes 6–8",
    goal: "Hands-on proficiency with Scratch, Spreadsheets, Teachable Machine.",
    strategy: "'Follow along' style. Project the screen and pause for understanding. Discuss low-tech alternatives.",
    activity: { name: "Build a Chatbot", time: "30 mins", mode: "Guided Practice", task: "In Scratch: a sprite asks 'What is your favourite colour?' and responds based on the answer." },
  },
  {
    number: 8, title: "Project Design & Interdisciplinary Integration",
    goal: "Plan a cross-subject project that applies CT and AI to a real problem.",
    strategy: "Encourage Math + Science + CS collaboration. Output should be a deliverable — report, model, presentation.",
    activity: { name: "Project Blueprinting", time: "30 mins", mode: "Group Work", task: "Outline a project (e.g., Water Conservation): define problem, list data, decide on output (graph or presentation)." },
  },
  {
    number: 9, title: "Assessment & Rubrics",
    goal: "Assess thinking, not just answers.",
    strategy: "Move from MCQs to 'Exit Tickets' where students explain reasoning. Allow partial credit for logic.",
    activity: { name: "Rubric Calibration", time: "20 mins", mode: "Peer Review", task: "Grade 3 sample answers (poor / good / excellent) using the Master Rubric. Compare and align." },
  },
  {
    number: 10, title: "Implementation Roadmap",
    goal: "Each school leaves with a concrete 30-60-90 day plan.",
    strategy: "Don't 'boil the ocean'. Start small (one CT question/week) and scale up.",
    activity: { name: "School Commitment Pledge", time: "15 mins", mode: "School Teams", task: "Each school fills a Commitment Card with 3 specific actions for the next 30 days." },
  },
];

export const glossary: { term: string; definition: string }[] = [
  { term: "Abstraction", definition: "Focusing on essential details while ignoring irrelevant information." },
  { term: "Algorithm", definition: "A step-by-step set of instructions to solve a problem or complete a task." },
  { term: "Artificial Intelligence (AI)", definition: "Technologies that enable machines to perform tasks normally needing human intelligence — learning, reasoning, language." },
  { term: "Bias (in AI)", definition: "Systematic errors in AI predictions caused by unrepresentative or skewed training data." },
  { term: "Computational Thinking (CT)", definition: "A structured problem-solving approach with four pillars: decomposition, pattern recognition, abstraction & algorithm design." },
  { term: "Decomposition", definition: "Breaking down a complex problem into smaller, manageable parts." },
  { term: "Flowchart", definition: "A diagram of boxes and arrows that shows the steps and decision points in a process." },
  { term: "Generative AI", definition: "AI that creates new content — text, images, music — by learning from huge datasets." },
  { term: "Machine Learning (ML)", definition: "A subset of AI where computers learn from data without being explicitly programmed for every rule." },
  { term: "Natural Language Processing (NLP)", definition: "The ability of a computer to understand and interpret human language." },
  { term: "Neural Network", definition: "A computing system inspired by the human brain's network of neurons." },
  { term: "Pattern Recognition", definition: "Identifying regularities or trends in data." },
  { term: "RAG (Retrieval-Augmented Generation)", definition: "AI framework that retrieves facts from an external knowledge base to generate accurate responses." },
  { term: "Supervised Learning", definition: "Training an AI using labeled data (e.g., images marked 'cat' or 'dog')." },
  { term: "Transformers", definition: "Deep learning architecture that powers modern Generative AI like GPT." },
  { term: "Unplugged", definition: "Teaching computer science concepts without using computers or digital devices." },
  { term: "Accuracy", definition: "The percentage of correct predictions made by an AI model out of all predictions." },
  { term: "Algorithm Design", definition: "The process of creating a precise, step-by-step plan to solve a computational problem." },
  { term: "Annotation", definition: "Labelling raw data (images, text, audio) so an AI model can learn from it." },
  { term: "Automation", definition: "Using machines or software to perform tasks with minimal human intervention." },
  { term: "Avatar", definition: "A digital representation of a person or character in a virtual environment." },
  { term: "Bar Chart", definition: "A graph that uses rectangular bars to compare quantities across different categories." },
  { term: "Binary", definition: "A number system using only 0 and 1, the fundamental language of computers." },
  { term: "Bug", definition: "An error or flaw in a program that causes it to behave unexpectedly." },
  { term: "Chatbot", definition: "A software program that simulates conversation with humans using text or voice." },
  { term: "Classification", definition: "An ML task where the model assigns input data to one of several predefined categories." },
  { term: "Cloud Computing", definition: "Delivering computing services — storage, processing, software — over the internet." },
  { term: "Code", definition: "Instructions written in a programming language that a computer can execute." },
  { term: "Conditional Statement", definition: "An instruction that executes different actions based on whether a condition is true or false (if-then-else)." },
  { term: "Confidence Score", definition: "A number (0–100%) indicating how certain an AI model is about its prediction." },
  { term: "CSV (Comma-Separated Values)", definition: "A plain-text file format that stores tabular data with values separated by commas." },
  { term: "Cybersecurity", definition: "Practices and technologies that protect computers, networks, and data from unauthorised access or attacks." },
  { term: "Data", definition: "Raw facts and figures collected for analysis or reference." },
  { term: "Data Cleaning", definition: "The process of fixing or removing incorrect, duplicate, or incomplete records in a dataset." },
  { term: "Data Collection", definition: "Gathering information from various sources for analysis or training an AI model." },
  { term: "Data Literacy", definition: "The ability to read, understand, create, and communicate data as information." },
  { term: "Data Privacy", definition: "The right of individuals to control how their personal information is collected and used." },
  { term: "Dataset", definition: "A structured collection of data used to train, validate, or test an AI model." },
  { term: "Debug", definition: "The process of finding and fixing errors (bugs) in a program." },
  { term: "Decision Tree", definition: "A flowchart-like model that makes decisions by splitting data based on feature values." },
  { term: "Deep Learning", definition: "A subset of ML using multi-layered neural networks to learn complex patterns from large datasets." },
  { term: "Digital Citizenship", definition: "Responsible and ethical behaviour when using technology and the internet." },
  { term: "Digital Footprint", definition: "The trail of data left behind by a user's online activities." },
  { term: "Event-Driven Programming", definition: "A programming style where code runs in response to user actions or system events (clicks, key presses)." },
  { term: "Feature", definition: "An individual measurable property or characteristic used as input to an ML model." },
  { term: "Filter Bubble", definition: "A state where algorithms show users only content that matches their past behaviour, limiting exposure to new ideas." },
  { term: "Flowchart Symbol", definition: "Standard shapes used in flowcharts: oval (start/end), rectangle (process), diamond (decision), arrow (flow)." },
  { term: "Function", definition: "A named, reusable block of code that performs a specific task." },
  { term: "Gesture Recognition", definition: "AI technology that interprets human hand or body movements as commands." },
  { term: "Google Teachable Machine", definition: "A free web tool that lets anyone train a simple image, sound, or pose ML model in a browser." },
  { term: "Hallucination (AI)", definition: "When a generative AI model produces confident but factually incorrect or made-up information." },
  { term: "Hardware", definition: "The physical components of a computer system (CPU, RAM, keyboard, screen)." },
  { term: "Human-in-the-Loop", definition: "A design approach where humans review or correct AI decisions before they take effect." },
  { term: "Hyperparameter", definition: "A configuration setting for an ML model (e.g., learning rate) set before training begins." },
  { term: "Image Recognition", definition: "AI's ability to identify objects, people, or scenes in digital images." },
  { term: "Input", definition: "Data fed into a computer or algorithm for processing." },
  { term: "Internet of Things (IoT)", definition: "A network of physical devices embedded with sensors that collect and exchange data over the internet." },
  { term: "Iteration", definition: "Repeating a set of steps in a loop until a condition is met." },
  { term: "Label", definition: "The correct answer or category assigned to a training data example." },
  { term: "Large Language Model (LLM)", definition: "An AI model trained on vast text data to understand and generate human language (e.g., GPT, Gemini)." },
  { term: "Latency", definition: "The delay between sending a request to a system and receiving a response." },
  { term: "Linear Regression", definition: "A statistical method that models the relationship between variables using a straight line to make predictions." },
  { term: "Logic", definition: "The systematic use of rules and reasoning to reach conclusions or solve problems." },
  { term: "Loop", definition: "A programming construct that repeats a block of code a set number of times or until a condition changes." },
  { term: "Mind Map", definition: "A visual diagram that organises information around a central concept using branches." },
  { term: "Model", definition: "A mathematical representation trained on data that makes predictions or decisions." },
  { term: "Model Training", definition: "The process of feeding data to an ML algorithm so it learns patterns and improves its predictions." },
  { term: "NEP 2020", definition: "India's National Education Policy 2020, which emphasises computational thinking and AI literacy across all grades." },
  { term: "Object Detection", definition: "AI technology that identifies and locates multiple objects within an image or video frame." },
  { term: "Output", definition: "The result produced by a computer or algorithm after processing input data." },
  { term: "Overfitting", definition: "When an ML model learns training data too precisely and performs poorly on new, unseen data." },
  { term: "Parameter", definition: "A variable inside an ML model whose value is learned from training data." },
  { term: "Phishing", definition: "A cyberattack where fraudulent messages trick users into revealing sensitive information." },
  { term: "Pixel", definition: "The smallest unit of a digital image; millions of pixels together form a picture." },
  { term: "Pose Estimation", definition: "AI technology that detects the position of a person's body joints from an image or video." },
  { term: "Prediction", definition: "An AI model's output — its best guess about a new input based on patterns learned from training data." },
  { term: "Preprocessing", definition: "Transforming raw data into a clean, structured format suitable for ML model training." },
  { term: "Privacy", definition: "The right to keep personal information confidential and control who can access it." },
  { term: "Probability", definition: "A number between 0 and 1 expressing how likely an event is to occur." },
  { term: "Prompt", definition: "The text or instruction given to a generative AI model to guide its output." },
  { term: "Pseudocode", definition: "An informal, plain-language description of an algorithm's steps, not tied to any specific programming language." },
  { term: "Recommendation System", definition: "An AI system that suggests items (videos, products, songs) based on a user's past behaviour and preferences." },
  { term: "Regression", definition: "An ML task that predicts a continuous numerical value (e.g., temperature, price)." },
  { term: "Reinforcement Learning", definition: "An ML approach where an agent learns by taking actions and receiving rewards or penalties." },
  { term: "Responsible AI", definition: "Designing and deploying AI systems that are fair, transparent, accountable, and safe." },
  { term: "Robot", definition: "A machine programmed to carry out physical tasks automatically, often guided by sensors and AI." },
  { term: "Robotics", definition: "The branch of technology concerned with designing, building, and programming robots." },
  { term: "Scratch", definition: "A free visual programming language from MIT where users build programs by snapping together code blocks." },
  { term: "Sensor", definition: "A device that detects physical input (light, temperature, motion) and converts it to digital data." },
  { term: "Sequence", definition: "A set of instructions executed one after another in a fixed order." },
  { term: "Smart Device", definition: "An electronic device that connects to the internet and can process data intelligently (e.g., smartphone, smart speaker)." },
  { term: "Software", definition: "Programs and operating information that tell a computer what to do." },
  { term: "Speech Recognition", definition: "AI technology that converts spoken words into text." },
  { term: "Sprite", definition: "A 2D character or object in Scratch that can be programmed to move, speak, and react." },
  { term: "Structured Data", definition: "Data organised in a fixed format such as rows and columns in a spreadsheet or database." },
  { term: "Sub-task", definition: "A smaller, specific action that is part of a larger decomposed problem." },
  { term: "Syntax", definition: "The set of rules that define the correct structure of statements in a programming language." },
  { term: "Tally Chart", definition: "A quick counting method using marks grouped in fives to record data." },
  { term: "Test Data", definition: "A separate portion of a dataset used to evaluate how well a trained model performs on unseen examples." },
  { term: "Training Data", definition: "The labelled examples used to teach an ML model to recognise patterns." },
  { term: "Transparency (AI)", definition: "The degree to which an AI system's decision-making process can be understood and explained." },
  { term: "Trend Line", definition: "A line drawn through data points on a graph to show the general direction of the data." },
  { term: "Turing Test", definition: "A test proposed by Alan Turing to determine whether a machine can exhibit intelligent behaviour indistinguishable from a human." },
  { term: "Underfitting", definition: "When an ML model is too simple to capture the patterns in training data, leading to poor predictions." },
  { term: "Unstructured Data", definition: "Data without a predefined format, such as images, audio, video, and free-form text." },
  { term: "Unsupervised Learning", definition: "Training an ML model on unlabelled data so it discovers hidden patterns or groupings on its own." },
  { term: "User Interface (UI)", definition: "The visual elements (buttons, menus, screens) through which a user interacts with software." },
  { term: "Variable", definition: "A named storage location in a program that holds a value which can change during execution." },
  { term: "Virtual Assistant", definition: "An AI-powered software agent that understands voice or text commands and performs tasks (e.g., Siri, Alexa)." },
  { term: "Visualisation", definition: "Representing data graphically (charts, graphs, maps) to make patterns and insights easier to understand." },
  { term: "Voice Recognition", definition: "AI technology that identifies who is speaking based on the unique characteristics of their voice." },
  { term: "Web Scraping", definition: "Automatically extracting data from websites using a program." },
  { term: "Weights", definition: "Numerical values inside a neural network that are adjusted during training to improve predictions." },
];

export const ethicsTopics = [
  {
    title: "Data Privacy & Digital Footprints",
    points: [
      "Personal data — name, address, photos, location — should never be shared publicly without consent.",
      "Strong passwords: longer is better (entropy).",
      "Phishing: identify suspicious links and emails.",
    ],
  },
  {
    title: "Bias & Fairness in Algorithms",
    points: [
      "Algorithms are not neutral — they reflect the data they're fed.",
      "Example: facial recognition that fails on darker skin tones because training data was mostly light-skinned faces.",
      "Classroom action: always ask 'Who is left out of this data?'",
    ],
  },
  {
    title: "Responsible Use of Generative AI",
    points: [
      "Academic integrity: using AI to write your essay = plagiarism. Using AI to brainstorm = research.",
      "AI hallucinates — always verify facts from reliable sources.",
      "Creativity vs. crutch: AI should enhance creativity, not replace the struggle of learning.",
    ],
  },
];
