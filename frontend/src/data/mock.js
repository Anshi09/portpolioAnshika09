// Mock data for Anshika Rana's Portfolio

export const personalInfo = {
  name: "Anshika Rana",
  email: "anshika2695@gmail.com",
  tagline: "Building clean, scalable mobile apps & data-driven solutions",
  description: "M.Tech Computer Science student specializing in React Native development and AI/ML solutions. Passionate about creating impactful mobile experiences and data-driven applications.",
  location: "Punjab, India",
  availability: "Open to freelance projects and internship opportunities"
};

export const education = [
  {
    id: 1,
    degree: "M.Tech - Computer Science and Engineering",
    institution: "Thapar Institute of Engineering and Technology",
    period: "July 2024 - Present",
    location: "Patiala, Punjab",
    focus: "Advanced Computer Science, Mobile Development, AI/ML"
  },
  {
    id: 2,
    degree: "B.Tech - Computer Science and Engineering",
    institution: "RIMT University",
    period: "2019 - 2023",
    location: "Punjab",
    focus: "Software Development, Data Structures, Algorithms"
  }
];

export const skills = {
  programming: [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Java", level: 80 },
    { name: "C++", level: 75 }
  ],
  mobile: [
    { name: "React Native", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Redux Toolkit", level: 80 },
    { name: "HTML/CSS", level: 85 }
  ],
  backend: [
    { name: "REST APIs", level: 85 },
    { name: "Node.js", level: 70 },
    { name: "Django", level: 65 },
    { name: "MongoDB", level: 70 }
  ],
  aiData: [
    { name: "Machine Learning", level: 80 },
    { name: "Data Analysis", level: 85 },
    { name: "Power BI", level: 75 },
    { name: "Pandas/NumPy", level: 85 }
  ],
  strengths: [
    "Problem Solving",
    "Clean Code",
    "Logical Thinking",
    "Continuous Learning",
    "Team Collaboration"
  ]
};

export const experience = [
  {
    id: 1,
    role: "React Native Intern",
    company: "Deftsoft Pvt. Ltd.",
    period: "February 2023 - July 2023",
    location: "Punjab, India",
    type: "Internship",
    achievements: [
      "Developed React Native features in an agile development environment",
      "Built reusable UI components using React Hooks and Redux Toolkit",
      "Integrated REST APIs for seamless data flow and real-time updates",
      "Implemented FlatList optimizations for better performance",
      "Debugged and optimized UI performance, reducing load times by 30%",
      "Collaborated with cross-functional teams on feature planning"
    ],
    technologies: ["React Native", "Redux Toolkit", "REST APIs", "JavaScript", "Git"]
  }
];

export const projects = [
  {
    id: 1,
    title: "Social Media Sentiment Analysis",
    category: "AI/ML",
    description: "Advanced machine learning system for analyzing social media sentiment with high accuracy.",
    problem: "Social media platforms generate massive amounts of unstructured data. Understanding user sentiment is crucial for businesses to make data-driven decisions.",
    solution: "Developed a comprehensive sentiment analysis system using natural language processing and machine learning algorithms to classify social media posts as positive, negative, or neutral.",
    technologies: ["Python", "Pandas", "NLTK", "Scikit-learn", "Matplotlib", "NumPy"],
    highlights: [
      "Achieved ~85% accuracy in sentiment classification",
      "Processed and analyzed 10,000+ social media posts",
      "Implemented text preprocessing and feature extraction",
      "Created interactive visualizations for sentiment trends"
    ],
    results: "85% accuracy, Real-time analysis capability",
    image: "/api/placeholder/600/400",
    liveLink: null,
    githubLink: null
  },
  {
    id: 2,
    title: "Diabetes Prediction System",
    category: "AI/ML",
    description: "Predictive healthcare application using machine learning to assess diabetes risk.",
    problem: "Early detection of diabetes is critical for prevention and management. Traditional methods require extensive medical testing.",
    solution: "Built a machine learning model using Logistic Regression and Random Forest algorithms with an interactive Streamlit interface for real-time predictions.",
    technologies: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Matplotlib"],
    highlights: [
      "Implemented multiple ML algorithms for comparison",
      "Created user-friendly Streamlit web interface",
      "Feature engineering for better prediction accuracy",
      "Model evaluation with confusion matrix and ROC curves"
    ],
    results: "High prediction accuracy, User-friendly interface",
    image: "/api/placeholder/600/400",
    liveLink: null,
    githubLink: null
  },
  {
    id: 3,
    title: "Event Management App",
    category: "Mobile App",
    description: "Comprehensive React Native application for managing events and attendees.",
    problem: "Event organizers need efficient tools to manage registrations, schedules, and attendee engagement in one place.",
    solution: "Developed a full-featured mobile app with event creation, registration management, real-time updates, and attendee networking features.",
    technologies: ["React Native", "Redux Toolkit", "REST APIs", "JavaScript", "AsyncStorage"],
    highlights: [
      "Built intuitive UI with smooth navigation",
      "Integrated REST APIs for backend communication",
      "Implemented real-time event updates and notifications",
      "Optimized app performance for smooth user experience",
      "Created reusable component library"
    ],
    results: "Smooth UX, 40% faster load times",
    image: "/api/placeholder/600/400",
    liveLink: null,
    githubLink: null
  },
  {
    id: 4,
    title: "Frendii Social App",
    category: "Mobile App",
    description: "Social networking mobile application built with React Native.",
    problem: "Modern social apps need to balance rich features with performance, especially on mobile devices.",
    solution: "Developed a feature-rich social media app frontend with user profiles, posts, likes, comments, and real-time feeds, focusing on performance optimization.",
    technologies: ["React Native", "Redux Toolkit", "REST APIs", "FlatList", "React Navigation"],
    highlights: [
      "Implemented user authentication and profile management",
      "Built dynamic social feed with infinite scroll",
      "Integrated REST APIs for data fetching",
      "Performance optimization using FlatList and memoization",
      "Created engaging UI with smooth animations"
    ],
    results: "Optimized performance, Engaging user experience",
    image: "/api/placeholder/600/400",
    liveLink: null,
    githubLink: null
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Project Supervisor",
    role: "Technical Lead",
    company: "Deftsoft Pvt. Ltd.",
    text: "Anshika demonstrated excellent problem-solving skills and delivered high-quality React Native components. Her attention to detail and ability to learn quickly made her a valuable team member.",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Academic Mentor",
    role: "Professor",
    company: "RIMT University",
    text: "Outstanding work on the sentiment analysis project. Anshika's analytical thinking and technical implementation were exemplary. She consistently goes above and beyond in her projects.",
    avatar: "/api/placeholder/100/100"
  }
];

export const socialLinks = {
  github: "https://github.com/anshika",
  linkedin: "https://linkedin.com/in/anshika-rana",
  email: "anshika2695@gmail.com"
};