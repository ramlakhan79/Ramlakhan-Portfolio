
import { useOutletContext } from "react-router-dom";
import Socials from "../components/Socials";
import Projects from "../components/Projects";
import LeetCodeHeatMap from "../components/LeetCodeHeatMap";
import Dailyquotes from "../components/Dailyquotes";
// import Testimonials from "../components/Testimonials";
import SplashSection from "../components/SplashSection";
import ContactForm from "../components/ContactForm";

export default function Home() {
    const [isDarkMode] = useOutletContext();

    return (
        <>
            <SplashSection splashMessage={'RAMLAKHAN Developer'} isDarkMode={isDarkMode} isErrorMode={false} />
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h1 className="text-center max-w-[18em]">Problem Solving and Web Experiences</h1>
                <p className="text-justify">Hello, and welcome! I&apos;m Ramlakhan Lodhi, a MERN-Stack Aspiring developer. I am a passionate competitive programmer and highly interested in algorithmic problem solving. I am very interested in new technologies and am always eager to learn new technologies that enhance my knowledge. Together, let&apos;s Explore the vast opportunities in the digital world and design online solutions that engage, inspire, and propel success.</p>
            </section>
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>My Projects</h2>
                <Projects />
            </section>
            {/* <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>My Leetcode Graph</h2>
                <LeetCodeHeatMap />                
            </section> */}
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Daily Quote</h2>
                <Dailyquotes />
            </section>
            {/* <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Testimonials</h2>
                <Testimonials />
            </section> */}
            <section className="w-[100%] flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
                <h2>Contact</h2>
                <Socials />
                <p className="text-center">Are you ready to connect me? Let&apos;s chat!</p>
                <ContactForm />
            </section>

            <a
                href="https://code-with-ram.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-suppYellow-400/40 bg-suppYellow-500/5 px-5 py-3 shadow-[0_0_15px_rgba(59,130,246,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
                <span className="absolute inset-y-0 -left-1/2 w-1/2 animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-suppYellow-400">
                    <i className="fa-solid fa-globe" />
                </span>

                <span className="relative">
                    {/* <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                        Code With Ram
                    </span> */}

                    <span className="block text-xs text-suppYellow-400 dark:text-suppRed-400 animate-pulse"> Visit my website </span>
                </span>

                <i className="fa-solid fa-arrow-up-right-from-square relative text-xs text-suppYellow-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

        </>
    );
}
