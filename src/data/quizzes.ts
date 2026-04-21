export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number; // index of correct option
  explain: string;
};

export const quizzes: Record<string, QuizQuestion[]> = {
  "class-3": [
    { q: "What is an algorithm?", options: ["A type of robot", "A step-by-step set of instructions", "A computer game", "A puzzle"], answer: 1, explain: "An algorithm is a precise list of steps to solve a problem — like a recipe." },
    { q: "In the 'Human Robot' game, what is the main lesson?", options: ["Robots are smarter than humans", "Order and precision matter", "Humans are slow", "Walking is hard"], answer: 1, explain: "Computers do exactly what they're told — order and precision are everything." },
    { q: "Which is a pattern?", options: ["A random pile of toys", "Red, Blue, Red, Blue, Red", "One dot on a page", "A sentence"], answer: 1, explain: "A pattern repeats with a clear rule." },
  ],
  "class-4": [
    { q: "Decomposition means…", options: ["Throwing things away", "Breaking a big problem into small parts", "Making things rot", "Using a computer"], answer: 1, explain: "Decomposition = break a complex problem into smaller, manageable pieces." },
    { q: "A bar chart helps us…", options: ["Cook food", "Compare quantities visually", "Write essays", "Run faster"], answer: 1, explain: "Bar charts let us instantly compare values." },
    { q: "Planning a picnic is an example of…", options: ["Pattern recognition", "Decomposition", "Abstraction", "None"], answer: 1, explain: "You break the big task into food, transport, games, and permissions." },
  ],
  "class-5": [
    { q: "A flowchart uses arrows and boxes to show…", options: ["A picture", "The steps and decisions in a process", "A song", "A poem"], answer: 1, explain: "Flowcharts visualise sequence and decision points." },
    { q: "Why might a music app only recommend English songs?", options: ["English songs are better", "It was trained on mostly English data", "Hindi songs don't exist", "The phone is broken"], answer: 1, explain: "AI reflects its training data — biased data → biased results." },
    { q: "What is bias in AI?", options: ["A glitch", "Unfair outcomes from skewed training data", "A type of song", "A bug in the wires"], answer: 1, explain: "Bias = the AI gives unfair results because the data wasn't representative." },
  ],
  "class-6": [
    { q: "In Scratch, an 'If…then…else' block is used for…", options: ["Drawing", "Branching logic", "Sound effects", "Saving files"], answer: 1, explain: "If-Then-Else lets your program take different paths based on conditions." },
    { q: "Which spreadsheet function adds numbers?", options: ["AVERAGE", "SUM", "COUNT", "MAX"], answer: 1, explain: "SUM adds the values in a range." },
    { q: "Machine Learning means…", options: ["Computers learning from data", "Robots going to school", "Coding by hand", "Buying a machine"], answer: 0, explain: "ML is teaching computers patterns from data instead of hard-coding every rule." },
  ],
  "class-7": [
    { q: "Teachable Machine trains a model using…", options: ["Magic", "Examples like images, sounds, or poses", "A dictionary", "Phone numbers"], answer: 1, explain: "You give it examples per class; it finds patterns to predict new ones." },
    { q: "Training only on red apples and green bananas leads to…", options: ["A perfect AI", "Biased predictions on new colours", "Faster training", "No problem"], answer: 1, explain: "A green apple might be classified as banana — biased training data." },
    { q: "Classification means…", options: ["Sorting items into categories", "Making a class", "Counting", "Writing notes"], answer: 0, explain: "Classification = assigning items to predefined categories." },
  ],
  "class-8": [
    { q: "The first step of the AI Project Cycle is…", options: ["Train Model", "Define the Problem", "Test", "Buy a computer"], answer: 1, explain: "You can't solve what you haven't defined." },
    { q: "An AI 'hallucination' is…", options: ["A dream", "When AI makes up false information", "A movie", "A bug fix"], answer: 1, explain: "Hallucinations are confident but incorrect AI answers — always verify." },
    { q: "Why test face-recognition with students wearing glasses?", options: ["To be funny", "To check for bias and edge cases", "To break the model", "To save time"], answer: 1, explain: "Testing edge cases reveals bias and improves the model." },
  ],
};
