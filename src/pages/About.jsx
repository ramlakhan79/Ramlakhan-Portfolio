
import CubeCarousel from "../components/CubeCarousel";
import { dessertImages } from "../constants/data";

export default function About() {
    return (
        <section className="w-[100%] mt-9 sm:mt-10 md:mt-11 flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
            <h1 className="text-center max-w-[18em]">About Ramlakhan</h1>
            <img className="w-[300px] profile-border " src="/assets/images/ramlakhan1.png" alt="Profile of Ramlakhan" />
            <p className="text-justify">Hello! My name is Ramlakhan, and I currently living in Bhopal , India..</p>
            <p className="text-justify">I hold a BTech in Computer Science and Engineering from the Sagar Institute of Science and Technology Bhopal. Additionally, I successfully managed a Frontend data in a database. My interest Competitive Programming and Data Structure and Algorithm.</p>
            {/* <p className="text-justify">Beyond coding and interacting with clients, I find joy in giving back to the community. Volunteering at the East Area Library allows me to troubleshoot technical issues and teach computer skills to eager learners. In my spare time, I take a picture of a moments</p> */}


            {/* <p className="text-center">Here are a few of my moments creations picturs:</p>
            <CubeCarousel name="desserts" carouselImages={dessertImages} /> */}


            {/* <p className="text-justify">My journey in web development is driven by the desire to make a meaningful impact on businesses and individuals alike. Combining my technical expertise, creativity, and dedication to continuous improvement, I strive to create compelling digital experiences that exceed expectations.</p> */}
            <p className="text-justify">I'm passionate about web development because it allows me to make a real difference for both businesses and individuals. I blend technical know-how with creativity, always pushing myself to improve. My goal is to design digital experiences that go above and beyond, delivering value that truly stands out.</p>
        </section>
    );
}