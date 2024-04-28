import * as Icons from "../components/Icons";

export const navMenu = [
  {
    id: "Home",
    href: "/",
  },
  {
    id: "Services",
    href: "/services",
  },
  {
    id: "About",
    href: "/about",
  },
  {
    id: "Resume",
    href: "/resume",
  },
];

export const projects = [
  // {
  //   title: "My Personal Portfolio",
  //   src: "/assets/images/projects/portfolio.png",
  //   altText: "Screenshot of Portfolio home page",
  //   ariaLabel:
  //     "Opens modal window with more information about the My Personal Portfolio web project",
  //   details: {
  //     description:
  //       "Welcome to Ramlakhan, where innovation meets expertise. Based in the web technologies, our portfolio showcases a diverse range of web development projects and services, each reflecting our commitment to quality, creativity, and client satisfaction. Whether you're looking for a sleek business website, a dynamic e-commerce platform, or a custom web application, our portfolio has something for you.",
  //     technologies: [
  //       {
  //         title: "HTML",
  //         Icon: Icons.HtmlIcon,
  //       },
  //       {
  //         title: "CSS",
  //         Icon: Icons.CSSIcon,
  //       },
  //       {
  //         title: "JavaScript",
  //         Icon: Icons.JavascriptIcon,
  //       },
  //     ],
  //     url: "https://ramlakhan130.netlify.app/",
  //     githubUrl: null,
  //   },
  // },

  {
    title: "Chat Web Application",
    src: "/assets/images/projects/chitchat.png",
    altText: "Screenshot of chat web application home page",
    ariaLabel:
      "Opens modal window with more information about the chat web project",
    details: {
      description:
        "A chat web application enables real-time communication between users through text-based messages. It typically includes features like message history, user authentication, notifications, and group chats, providing a seamless and interactive platform for conversation and collaboration.",
      technologies: [
        {
          title: "MongoDB",
          Icon: Icons.MongoDBIcon,
        },
        {
          title: "ExpressJS",
          Icon: Icons.ExpressJSIcon,
        },
        {
          title: "React",
          Icon: Icons.ReactIcon,
        },
        {
          title: "NodeJS",
          Icon: Icons.NodeJSIcon,
        },
      ],
      url: "https://chitchat-165i.onrender.com/",
      githubUrl: "https://github.com/ramlakhan79/Chat-Web-Application",
    },
  },
  {
    title: "Quiz Web Application",
    src: "/assets/images/projects/quizweb.png",
    altText: "Screenshot of Quiz web home page",
    ariaLabel:
      "Opens modal window with more information about the quiz web project",
    details: {
      description:
        "A quiz web application allows users to take interactive quizzes on various topics. It typically offers multiple-choice questions, real-time scoring, and results analysis. Features may include timed quizzes, leaderboards, personalized question sets, and social sharing, creating an engaging and educational experience for users.",
      technologies: [
        {
          title: "MongoDB",
          Icon: Icons.MongoDBIcon,
        },
        {
          title: "ExpressJS",
          Icon: Icons.ExpressJSIcon,
        },
        {
          title: "React",
          Icon: Icons.ReactIcon,
        },
        {
          title: "NodeJS",
          Icon: Icons.NodeJSIcon,
        },
      ],
      url:null,
      githubUrl: "https://github.com/ramlakhan79/Quiz-Web-App",
    },
  },
];

export const testimonials = [
    {
        quote: "I am incredibly grateful for Ramlakhan remarkable efforts of completely revamping our nonprofit's website. His dedication and expertise in enhancing the site's security measures while also ensuring a seamless user experience has been nothing short of exceptional. The new website not only boasts a robust security infrastructure that safeguards sensitive data, but it also welcomes visitors with an intuitive and user-friendly interface. Ramlakhan took our organization's mission to heart and translated it into an online platform that not only represents our values but also engages our audience effectively. His selfless commitment to improving our online presence has undoubtedly elevated our nonprofit's reach and impact. We owe him a debt of gratitude for his invaluable contribution in making our website a secure and inviting space for all.",
        name: 'Lakhan L.',
        title: 'Executive Director of Web Technologies Organization',
        src: '/assets/images/testimonials/testimo.png',
        altText: 'Profile of Lakhan L.',
    }
]

export const socialMedias = [
  {
    href: "mailto:ramlakhanlodhi229@gmail.com",
    ariaLabel: "Compose an email to Ramlakhan",
    title: "Write an Email to Ramlakhan",
    Icon: Icons.EmailIcon,
  },
  {
    href: "https://www.linkedin.com/in/ramlakhanlodhi/",
    ariaLabel: "Goes to Ramlakhan&apos;s LinkedIn profile",
    title: "LinkedIn Profile",
    Icon: Icons.LinkedInIcon,
  },
  {
    href: "https://github.com/ramlakhan79",
    ariaLabel: "Goes to Ramlakhan&apos;s GitHub profile",
    title: "GitHub Profile",
    Icon: Icons.GitHubIcon,
  },
  {
    href: "https://twitter.com/RamlakhanLodh18",
    ariaLabel: "Goes to Ramlakhan&apos;s Twitter profile",
    title: "Twitter Profile",
    Icon: Icons.TwitterIcon,
  },
];

export const techSkills = [
  {
    category: "Programming Languages",
    skills: [
      {
        title: "C",
        Icon: Icons.CIcon,
      },
      {
        title: "C++",
        Icon: Icons.CPPIcon,
      },

      {
        title: "Java",
        Icon: Icons.JavaIcon,
      },
    ],
  },

  {
    category: "Coding Profile",
    skills: [
      {
        title: "LeetCode",
        Icon: Icons.LCIcon,
      },
      {
        title: "CodeChef",
        Icon: Icons.CCIcon,
      },

      {
        title: "Geeksforgeeks",
        Icon: Icons.GFGIcon,
      },
    ],
  },

  {
    category: "Front-End Development",
    skills: [
      {
        title: "HTML",
        Icon: Icons.HtmlIcon,
      },
      {
        title: "CSS",
        Icon: Icons.CSSIcon,
      },
      {
        title: "Tailwind CSS",
        Icon: Icons.TailwindCSSIcon,
      },
      {
        title: "JavaScript",
        Icon: Icons.JavascriptIcon,
      },
      {
        title: "React",
        Icon: Icons.ReactIcon,
      },
    ],
  },
  {
    category: "Back-End Development",
    skills: [
      {
        title: "MongoDB",
        Icon: Icons.MongoDBIcon,
      },
      {
        title: "ExpressJS",
        Icon: Icons.ExpressJSIcon,
      },
      {
        title: "NodeJS",
        Icon: Icons.NodeJSIcon,
      },
      {
        title: "SQL Server",
        Icon: Icons.SqlServerIcon,
      },
    ],
  },

  {
    category: "Build Tools, Frameworks, and Versioning",
    skills: [
      {
        title: "Vite",
        Icon: Icons.ViteIcon,
      },
      {
        title: "Git",
        Icon: Icons.GitIcon,
      },
      {
        title: "GitHub",
        Icon: Icons.GitHubIcon,
      },
    ],
  },
  {
    category: "Design and Prototyping",
    skills: [
      {
        title: "Responsive Design",
        Icon: Icons.ResponsiveDesignIcon,
      },
      // {
      //   title: "Pen and Paper",
      //   Icon: Icons.SketchingIcon,
      // },
      {
        title: "Figma",
        Icon: Icons.FigmaIcon,
      },
    ],
  },

  // {
  //   category: "Content Management Systems",
  //   skills: [
  //     {
  //       title: "WordPress",
  //       Icon: Icons.WordPressIcon,
  //     },
  //   ],
  // },

  // {
  //   category: "Microsoft Products",
  //   skills: [
  //     {
  //       title: "Access",
  //       Icon: Icons.AccessIcon,
  //     },
  //   ],
  // },
  {
    category: "Others",
    skills: [
      {
        title: "APIs",
        Icon: Icons.APIIcon,
      },
      {
        title: "REST APIs",
        Icon: Icons.RestAPIIcon,
      },
    ],
  },
];

export const softSkills = [
    {
        title: 'Creativity',
        Icon: Icons.BrightIdeaIcon,
    },
    {
        title: 'Teamwork',
        Icon: Icons.TeamworkIcon,
    },
    {
        title: 'Time Management',
        Icon: Icons.ScheduleIcon,
    },
];

export const workExp = [
    // {
    //     company: 'Ramlakhan',
    //     location: 'Bhopal, India',
    //     positions: [
    //         {
    //             title: 'Frontend Developer',
    //             startDate: new Date(2023, 1),
    //             endDate: new Date(2023,2),
    //         },
    //     ],
    //     tasks: [
    //         "Collaborate directly with clients to gather project requirements, provide regular updates, and deliver solutions that tailored to their specific needs",
    //         "Conduct competitor analysis to identify clients' opportunities for differentiation and growth",
    //         "Setup API calls and database structures for streamlining clients' business requirements",
    //         "Demonstrate expertise in designing custom WordPress themes and plugins in PHP, enhancing website functionality and user interactivity",
    //     ],
    // },
];

export const extracurriculars = [
    // {
    //     company: 'Literacy Bhopal',
    //     location: 'East Bhopal, India',
    //     positions: [
    //         {
    //             title: 'Digital Volunteer',
    //             startDate: new Date(2022, 3),
    //             endDate: new Date(2023, 9),
    //         },
    //     ],
    //     tasks: [
    //         "Diagnose and troubleshoot technical problems",
    //         "Demonstrate strong communication skills by explaining technical concepts in a clear and understandable manner",
    //         "Recognized for outstanding problem-solving capabilities",
    //     ],
    // },
];

export const educations = [
  {
    degree: "B.Tech",
    school: "Sagar Institute of Science and Technology, Bhopal",
    startDate: new Date(2021, 8),
    endDate: new Date(2025, 4),
    location: "Bhopal, India",
  },
  {
    degree: "12th Class",
    school: "Govt. Boys Higher Secondary School, Madhusudangarh",
    startDate: new Date(2020, 8),
    endDate: new Date(2021, 4),
    location: "Guna, India",
  },
  {
    degree: "10th Class",
    school: "Govt. High School, Ukawad",
    startDate: new Date(2018, 8),
    endDate: new Date(2019, 4),
    location: "Guna, India",
  },
  
  
];

export const dessertImages = [
  {
    src: "/assets/images/desserts/picture1.jpg",
    altText: "to be writing",
    value: "Picture1",
    label: "Picture1",
  },
  {
    src: "/assets/images/desserts/picture2.jpg",
    altText: "to be writing",
    value: "Picture2",
    label: "Picture2",
  },
  {
    src: "/assets/images/desserts/picture3.jpg",
    altText: "to be writing",
    value: "Picture3",
    label: " Picture3",
  },
  {
    src: "/assets/images/desserts/picture4.jpg",
    altText: "to be writing",
    value: "Picture4",
    label: "Picture4",
  },
  {
    src: "/assets/images/desserts/picture5.jpg",
    altText: "to be writing",
    value: "Pictures5",
    label: "Pictures5",
  },
  {
    src: "/assets/images/desserts/picture6.jpg",
    altText: "to be writing",
    value: "Picture6",
    label: "Picture6",
  },
];

export const generalServices = [
    // {
    //     title: 'Consulting and Strategy',
    //     description: "I work closely alongside you to understand your goals, target audience, and business objectives. Using this insight, I develop a strategic plan designed to seamlessly transform your goals into a captivating digital presence.",
    //     Icon: Icons.HandshakeIcon,
    // },
    // {
    //     title: 'Branding',
    //     description: "Let's craft a distinctive visual identity that resonates with your brand. An identity that not only establishes a strong visual presence, but also forges a profound connection with your audience, fostering a sense of trust and authenticity.",
    //     Icon: Icons.BrightIdeaIcon,
    // },
    // {
    //     title: 'Competitor Analysis',
    //     description: "Through my competitor analysis service, I delve deep into the strategies employed within your industry or niche. Armed with this insight, you gain a distinct advantage, positioning yourself uniquely from others.",
    //     Icon: Icons.TargetIcon,
    // },
    {
        title: 'Front-End Development',
        description: "Infusing artistry into functionality, my web design prowess creates visually stunning and intuitive interfaces that captivate your audience. Aesthetics and usability should go hand in hand.",
        Icon: Icons.WebDesignIcon,
    },
    {
        title: 'Back-End Development',
        description: "Fueling your website's functionality behind the scenes, I create dynamic processes that bridge your business requirements and your website. Expect nothing less than efficient, user-friendly functionality that adds value to their experience.",
        Icon: Icons.ServerIcon,
    },
    {
        title: 'Responsive Design',
        description: "Your website will be flawlessly showcased across all screens for optimal viewing experience. Responsive design ensures your online presence adapts seamlessly to devices of all sizes.",
        Icon: Icons.DesktopMobileIcon,
    },
];

export const specialties = [
    {
        title: 'Web Hosting and Deployment',
        Icon: Icons.DatabaseIcon,
    },
    {
        title: 'API Development and Integration',
        Icon: Icons.APIIcon,
    },
    {
        title: 'Custom Web Applications',
        Icon: Icons.ProgrammingIcon,
    },
    {
        title: 'Portfolio Websites',
        Icon: Icons.PortfolioIcon,
    },
    {
        title: 'CMS Development and Customization',
        Icon: Icons.WebContentIcon,
    },
    {
        title: 'Web Performance Optimization',
        Icon: Icons.RocketIcon,
    },
    {
        title: 'Website Maintenance',
        Icon: Icons.ToolsIcon,
    },
    {
        title: 'Website Migration',
        Icon: Icons.LeftRightArrowsIcon,
    },
];