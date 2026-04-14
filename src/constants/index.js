const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "safari",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio",
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills",
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Projects",
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact",
        icon: "contact.png",
        canOpen: true,
    },

];

const projectPosts = [
    {
        id: 1,
        date: "January 2026 - Present",
        title: "TomeMate - D&D Companion App (ongoing)",
        stack: "Swift / Python / Firebase",
        description: "Full-stack iOS app that centralizes everything a D&D player needs mid-session: searchable spells, items, and creature databases, character management, homebrew content, quest tracking, and an interactive campaign map. SwiftUI frontend, FastAPI and Firebase backend.",
        image: "/images/swift.svg",
        link: "https://github.com/ndalbah/TomeMate",
    },
    {
        id: 2,
        date: "January - April 2026",
        title: "KakuroHero - Kakuro Puzzle Game",
        stack: "Kotlin / Android",
        description: "A native Android implementation of Kakuro, the cross-sum number puzzle. Built in Kotlin with a clean, intuitive interface that scales across difficulty levels and keeps the focus where it belongs: on the puzzle.",
        image: "/images/kotlin.svg",
        link: "https://github.com/ndalbah/KakuroHero",
    },
    {
        id: 3,
        date: "February 17, 2026",
        title:
            "iOS Navigation App",
        stack: "Swift / SwiftUI / MapKit",
        description: "Native iOS navigation app that calculates real-time routes from the user's current location across four transport modes — driving, walking, transit, and cycling. Built with Apple's iOS 17 Map APIs, featuring live distance and ETA display and custom zoom controls",
        image: "/images/swift.svg",
        link: "https://github.com/ndalbah/MapApp",
    },
    {
        id: 4,
        date: "March 23, 2026",
        title: "Flutter Messenger App UI",
        stack: "Flutter / Dart",
        description: "A clean, fully responsive messenger interface built in Flutter, designed to run natively on both iOS and Android from a single codebase. Focused on smooth navigation flow and a polished visual experience across screen sizes.",
        image: "/images/flutter.svg",
        link: "https://github.com/ndalbah/flutter_messenger_ui",
    },
    {
        id: 5,
        date: "August - November 2025",
        title: "CookMania - Cooking Simulator Game",
        stack: "Unity / C# / Firebase",
        description: "A cooking-themed mobile game built in Unity, featuring custom shaders, ScriptableObject-driven game data, and Firebase integration for persistent player data. Covers the full game development stack, from scene management and player input to rendering pipeline configuration and cloud connectivity.",
        image: "/images/unity.svg",
        link: "https://github.com/ndalbah/CookMania",
    },
    {
        id: 6,
        date: "January - April 2025",
        title: "NOJUL RestoBar",
        stack: "Java / SpringBoot / Maven",
        description: "A full web application for a local Montreal restobar, built with Spring Boot. Handles menu presentation and restaurant info through a structured Java backend.",
        image: "/images/java.svg",
        link: "https://github.com/ndalbah/NOJULRestoBar",
    },

];

const techStack = [
    {
        category: "Frontend",
        items: ["React", "HTML", "JavaScript"],
    },
    {
        category: "Mobile",
        items: ["Flutter", "Kotlin", "SwiftUI"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "Bootstrap", "CSS"],
    },
    {
        category: "Backend",
        items: ["Python", "PHP", "ASP.NET"],
    },
    {
        category: "Database",
        items: ["MongoDB", "Firebase", "MySQL"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker", "Postman"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/ndalbah",
    },
    {
        id: 2,
        text: "Email",
        icon: "/icons/email.svg",
        bg: "#4bcb63",
        link: "mailto:ndalbah@outlook.com",
    },
    {
        id: 3,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/in/yourprofile",
    },
    {
        id: 3,
        text: "Montréal",
        icon: "/icons/location.svg",
        bg: "#ff866b",
        link: "https://en.wikipedia.org/wiki/Montreal",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/gal1.png",
    },
    {
        id: 2,
        img: "/images/gal2.png",
    },
    {
        id: 3,
        img: "/images/gal3.png",
    },
    {
        id: 4,
        img: "/images/gal4.png",
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    projectPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "who-am-i.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-10 left-5",
            subtitle: "Meet the Developer Behind the Code",
            description: [
                "Hey! I’m Noah 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
                "I specialize in C#, .NET, and Java, and I love making things feel smooth, fast, and just a little bit delightful.",
                "I’m big on clean UI, good UX, and writing easily readable and scalable code.",
                "I am highly motivated by the problem-solving aspect of programming: breaking down complex challenges, and turning ideas into working solutions.",
                "Even when I'm not working, I'm constantly exploring new tools, frameworks, and trying to broaden my skill set.",
                "My goal is to continue growing as a full-stack developer, contributing to meaningful and impactful projects."
            ],
        },
        {
            id: 2,
            name: "education.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-40 left-75",
            subtitle: "My Studies and Academic Background",
            description: [
                "During my studies in Computer Science (Programming) at LaSalle College, I've Completed a wide range of courses that have given me a solid understanding of both software development and computing fundamentals.",
                "My coursework covers areas such as object-oriented programming, web development, databases, as well as mobile development for iOS and Android.",
                "I've also gained experience in computer architecture, network security, and other core topics that strengthen my technical foundation.",
                "These courses have not only enhanced my programming skills but also taught me how to think critically, solve complex problems, and apply theoretical knowledge to real-world projects.",
            ],
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
        },
    ],
};

export const locations = {
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
