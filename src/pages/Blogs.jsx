export default function Blogs() {
    return (
        <section className="w-[100%] mt-9 sm:mt-10 md:mt-11 flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">           
            {/* <p className="text-justify">Welcome to the Blogs section! Here, I share my thoughts, experiences, and insights on various topics related to web development, programming, and technology. Stay tuned for regular updates and feel free to explore the articles I've written.</p> */}
            <a className="text-blue-500 underline" href="http://localhost:5173/blogs/page1" target="_self" rel="noopener noreferrer">Click to continue to my blog</a>
            <p>To be continued...</p>
        </section>
    );
}