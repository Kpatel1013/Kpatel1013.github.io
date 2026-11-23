export const profile = {
  name: "Keshav Patel",
  headline: "Computer science student building retrieval systems, vision models, and competition robots.",
  location: "Chicago, IL",
  email: "keshavpatel120@gmail.com",
  phone: "(872) 985-7536",
  linkedin: "https://www.linkedin.com/in/keshavpatel13",
  github: "https://github.com/Kpatel1013",
  resume: "/resume.pdf",
  school: "University of Illinois Chicago",
  degree: "B.S. Computer Science",
  grad: "Expected May 2028",
}

export const about = [
  "I study computer science at the University of Illinois Chicago, and I like work that has to leave the laptop: a robot that has to place a cone, a camera that has to name a hand, a chatbot that has to answer from the file you just uploaded.",
  "Right now that means full-stack retrieval, PyTorch models, and Java control code for FIRST robots. I led a five-person build for a Center Stage demo, and I compete with Team Axiom 4787. If you are hiring for software or robotics, the projects below are the fastest way to see how I build.",
]

export const coursework = [
  "Data Structures",
  "Machine Organization",
  "Languages and Automata",
  "Calculus III",
  "Applied Linear Algebra",
  "Probability and Statistics for Engineers",
]

export const skills = [
  { label: "Languages", items: ["Python", "Java", "C++", "TypeScript", "C"] },
  { label: "Frameworks", items: ["React", "FastAPI", "PyTorch", "LangChain", "WPILib", "NumPy", "OpenCV", "MediaPipe"] },
  { label: "Tools", items: ["Git", "Jira", "Docker", "PostgreSQL", "pgvector", "AWS", "Google Colab", "Onshape"] },
]

export const projects = [
  {
    id: "rag",
    title: "Document chatbot",
    kicker: "Featured · Full stack",
    dates: "August 2026 – September 2026",
    blurb: "Upload a PDF or a screenshot, then ask questions that stay on that file. Answers come back in under five seconds.",
    href: "https://github.com/Kpatel1013/RAG-Chatbot-Fullstack",
    stack: ["React", "TypeScript", "FastAPI", "LangChain", "DeepSeek", "PostgreSQL", "pgvector", "Docker", "AWS CDK"],
    overview:
      "This is a chat app you can run on your own computer or deploy to AWS. You attach a document, ask a question, and the reply is written from that document instead of from whatever the model already knows.",
    steps: [
      "The screen is React and TypeScript. A sidebar lets you open, switch, or delete chats.",
      "Messages live in PostgreSQL. The file you attached stays with that chat until you attach a different one.",
      "Screenshots go through Tesseract so the text can be read. LangChain splits the text into chunks, and MiniLM embeddings are stored with pgvector.",
      "DeepSeek writes the answer from only those chunks, in under five seconds.",
    ],
    outcome:
      "I tracked the work in Jira as an epic, stories, and tasks, and finished them in that order. The same images run locally with one Docker Compose command and deploy with AWS CDK to ECR and ECS Fargate.",
    reflection:
      "The hard part was keeping a follow-up on the current file. If retrieval searched every upload, the bot mixed old documents into new questions. Scoping each reply to the active file fixed that.",
  },
  {
    id: "gestures",
    title: "Hand gesture classifier",
    kicker: "Featured · Machine learning",
    dates: "March 2026",
    blurb: "A webcam reads one hand and a small Q-table learns to name the pose: open, fist, point, peace, or thumbs up.",
    href: "https://github.com/Kpatel1013/hand-gesture-classifier",
    stack: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    overview:
      "Point a camera at one hand and the program draws the joints, decides which fingers are up, and names the gesture. The learner is a table of numbers, not a large neural network.",
    steps: [
      "OpenCV grabs each frame. MediaPipe finds 21 landmarks on the hand.",
      "A finger counts as extended when its tip is farther from the wrist than the middle joint. Five yes-or-no flags become one of 32 states.",
      "A Q-table trains for about 2,500 steps. A correct name scores 1. A miss scores −0.05.",
    ],
    outcome:
      "The finished table is saved to disk, so the same policy can name those gestures again without starting training over.",
    reflection:
      "I did not publish a percentage accuracy. The saved table was trained live from the webcam, not scored on a separate set of poses, so a single accuracy number would overclaim what the run measured.",
  },
  {
    id: "fashion",
    title: "Clothing image classifier",
    kicker: "Machine learning",
    dates: "June 2025 – August 2025",
    blurb: "A convolutional network in PyTorch sorts 28×28 clothing photos into 10 categories.",
    href: null,
    stack: ["Python", "PyTorch", "NumPy", "Google Colab"],
    overview:
      "Fashion MNIST is a set of small grayscale photos of clothes. I trained a convolutional neural network to tell the categories apart, from shirts to sneakers.",
    steps: [
      "Images are 28 by 28 pixels. NumPy holds them as arrays before training.",
      "The network trained in Google Colab on 60,000 images.",
      "I scored that trained network on the 10,000-image test set.",
    ],
    outcome:
      "The notebook stays private. I am not listing a test-accuracy percentage until that number is written down from the run.",
    reflection:
      "Colab made it easy to change the network and train again. The useful next step is to record the test accuracy from the version I kept.",
  },
  {
    id: "ftc",
    title: "Cone Crusaders FTC robot",
    kicker: "Robotics · Internship",
    dates: "June 2024 – July 2024",
    blurb: "All of the OnBot Java for a five-person Center Stage robot, driven in a live demo on a makeshift arena.",
    href: "https://github.com/Kpatel1013/cone-crusaders-ftc-robot",
    stack: ["Java", "OnBot Java", "FTC SDK", "AprilTag"],
    overview:
      "I was the programmer for Team Cone Crusaders during a summer internship with Chicago Public Schools. We built a mecanum robot that picks up and places cones, then showed it on a practice field that followed Center Stage rules.",
    steps: [
      "Teleop maps the left stick to drive and strafe, the right stick to turn, and the bumpers and triggers to the arm and gripper.",
      "Autonomous turns inch targets into wheel-encoder ticks, then strafes, drives, turns, and places a cone.",
      "A 640×480 webcam reports AprilTag id, position in inches, and pitch, roll, and yaw so the driver can see the robot's pose.",
    ],
    outcome:
      "I led the five-person team and wrote every opmode. The demo was the finish line for the internship.",
    reflection:
      "Encoder distances made the auto repeatable. Vision told the driver where the robot was. It did not steer the autonomous path.",
  },
  {
    id: "frc",
    title: "FRC intake, Team Axiom 4787",
    kicker: "Competition",
    dates: "January 2024",
    blurb: "Arm and disk intake software that held angle within 15 degrees and ran at the Milwaukee Regional.",
    href: null,
    stack: ["Java", "WPILib"],
    overview:
      "Team Axiom 4787 needed the arm and the disk intake to move together during a match. I wrote the command-based Java that did that, then we took it to a regional.",
    steps: [
      "One controller path runs both the arm and the intake, so they can operate in the same match.",
      "A PID loop holds the arm angle within 15 degrees and keeps intake speed steady from cycle to cycle.",
    ],
    outcome:
      "We competed with that arm and intake at the Milwaukee Regional against more than 50 teams from across the Midwest.",
    reflection:
      "The practice repo on GitHub is drivetrain and Limelight work from the same team. The match result here is the intake that actually ran in competition.",
  },
]

export const experience = {
  role: "Summer Robotics Programming Intern",
  org: "CPS Office of Early College and Career Education",
  place: "Chicago, IL",
  dates: "June 2024 – July 2024",
  href: "https://github.com/Kpatel1013/cone-crusaders-ftc-robot",
  points: [
    "Led a five-person team and wrote every OnBot Java opmode for Team Cone Crusaders.",
    "Shipped mecanum teleop, an encoder autonomous that places cones, and AprilTag pose from a webcam.",
    "Closed the internship with a live demo on a makeshift arena using Center Stage rules.",
  ],
}
