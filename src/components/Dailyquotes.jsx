import { quoteUpdate } from "../constants/data";

import { QuoteIcon } from "./Icons";

export default function Dailyquotes() {
    const today = new Date().getDate();
    
    const dailyQuoteData = quoteUpdate.find((entry) => entry.dayq === today);

    if (!dailyQuoteData || dailyQuoteData.dailyquotes.length === 0) {
        return <p>No quote available for today.</p>;
    }
    const update = dailyQuoteData.dailyquotes[0];
    console.log(update,"update")

    return (
        <>
            {dailyQuoteData.dailyquotes.map((dailyquotes, id) => (
                <figure key={id} className="glassy-screen px-mobileBound py-8 flex flex-col flex-nowrap gap-6 sm:px-7 sm:py-8 sm:gap-7 md:px-8 md:py-9 md:gap-8 lg:px-9 lg:py-10 lg:gap-9">
                    <QuoteIcon />
                    <blockquote className="h-[100%] max-h-[300px] relative overflow-y-scroll pr-6">
                        <p className="text-justify">{update.quote}</p>
                    </blockquote>
                    <div className="flex flex-row flex-wrap items-end justify-center gap-6">
                        {/* <img src={dailyQuotes.src} alt={dailyQuotes.altText} className="w-[100px] h-[100px]" /> */}
                        <div className="max-w-[18em]">
                            <figcaption className="text-suppBlue-100 dark:text-suppBlue-200">{update.name}</figcaption>
                            {/* <p>{dailyquotes.title}</p> */}
                        </div>
                    </div>
                </figure>
            ))}
        </>
    );
}
