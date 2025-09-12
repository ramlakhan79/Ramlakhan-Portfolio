// import React, { useEffect, useState } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";

// export default function SubmissionHeatmap() {
//     const currentYear = new Date().getFullYear();
//     const [submissions, setSubmissions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [year, setYear] = useState(String(currentYear));

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const res = await fetch(
//                     `https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=Ramlakhan_79&year=${year}`
//                 );
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! status: ${res.status}`);
//                 }
//                 const data = await res.json();

//                 if (data?.message && data.message.includes("Too many request")) {
//                     throw new Error("Rate limit exceeded. Please try again later.");
//                 }

//                 const formatted = Object.entries(data?.submissionCalendar || {}).map(
//                     ([timestamp, count]) => {
//                         const date = new Date(Number(timestamp) * 1000)
//                             .toISOString()
//                             .split("T")[0];
//                         return { date, count: Number(count) };
//                     }
//                 );
//                 setSubmissions(formatted);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching data:", err);
//                 setError(err);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [year]);

//     // if (loading) return <div className="p-4">Loading...</div>;
//     // if (error) return <div className="p-4 text-red-500">{error.message}</div>;

//     return (
//         <div className="p-4">
//             <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold">LeetCode Submissions ({year})</h2>
//                 <select
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     className="border p-1 rounded"
//                 >
//                     {Array.from({ length: 5 }, (_, i) => year - i).map((y) => (
//                         <option key={y} value={y}>{y}</option>
//                     ))}
//                 </select>
//             </div>
//             <CalendarHeatmap
//                 startDate={new Date(`${year}-01-01`)}
//                 endDate={new Date(`${year}-12-31`)}
//                 values={submissions}
//                 classForValue={(val) => {
//                     if (!val || val.count === 0) return "color-empty";
//                     if (val.count < 3) return "color-scale-1";
//                     if (val.count < 6) return "color-scale-2";
//                     if (val.count < 10) return "color-scale-3";
//                     return "color-scale-4";
//                 }}
//                 tooltipDataAttrs={(val) =>
//                     val && val.date
//                         ? { "data-tip": `${val.date}: ${val.count || 0} submissions` }
//                         : { "data-tip": "No submissions" }
//                 }
//             />

//             <style jsx>{`
//         .color-empty { fill: #ebedf0; }
//         .color-scale-1 { fill: #9be9a8; }
//         .color-scale-2 { fill: #40c463; }
//         .color-scale-3 { fill: #30a14e; }
//         .color-scale-4 { fill: #216e39; }
//       `}</style>
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { leetCodeMapData } from "../constants/LCHeatMap"; // updated local data file

export default function SubmissionHeatmap() {
    const currentYear = new Date().getFullYear();
    const [submissions, setSubmissions] = useState([]);
    const [year, setYear] = useState(String(currentYear));
    const [activeYears, setActiveYears] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=Ramlakhan_79&year=${year}`
                );
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();

                if (true) {
                    throw new Error("Rate limit exceeded");
                }

                const formatted = Object.entries(data?.submissionCalendar || {}).map(
                    ([timestamp, count]) => {
                        const date = new Date(Number(timestamp) * 1000)
                            .toISOString()
                            .split("T")[0];
                        return { date, count: Number(count) };
                    }
                );
                setSubmissions(formatted);
                setActiveYears([year]);
            } catch (err) {
                console.warn("Falling back to local data due to error:", err);
                const calendar = leetCodeMapData[0]?.data?.matchedUser?.userCalendar;
                if (!calendar) return;

                const parsedCalendar = JSON.parse(calendar.submissionCalendar || "{}");
                const formatted = Object.entries(parsedCalendar).map(
                    ([timestamp, count]) => {
                        const date = new Date(Number(timestamp) * 1000)
                            .toISOString()
                            .split("T")[0];
                        return { date, count: Number(count) };
                    }
                );
                console.log(formatted)
                setSubmissions(formatted);
                setActiveYears(calendar.activeYears || []);
            }
        };

        fetchData();
    }, [year]);

    // console.log()
    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">LeetCode Submissions ({year})</h2>
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border p-1 rounded"
                >
                    {activeYears
                        .slice()          
                        .sort((a, b) => b - a) 
                        .map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                </select>
            </div>
            <CalendarHeatmap
                startDate={new Date(`${year}-01-01`)}
                endDate={new Date(`${year}-12-31`)}
                values={submissions
                    .filter(s => s.date.startsWith(year)) 
                    .map(s => ({
                        date: s.date,
                        count: s.count || 0
                    }))
                }
                classForValue={(val) => {
                    if (!val || val.count === 0) return "color-empty";
                    if (val.count < 3) return "color-scale-1";
                    if (val.count < 6) return "color-scale-2";
                    if (val.count < 10) return "color-scale-3";
                    return "color-scale-4";
                }}
                tooltipDataAttrs={(val) =>
                    val && val.date
                        ? { "data-tip": `${val.date}: ${val.count || 0} submissions` }
                        : { "data-tip": "No submissions" }
                }
            />
            <style jsx>{`
        .color-empty { fill: #ebedf0; }
        .color-scale-1 { fill: #9be9a8; }
        .color-scale-2 { fill: #40c463; }
        .color-scale-3 { fill: #30a14e; }
        .color-scale-4 { fill: #216e39; }
      `}</style>
        </div>
    );
}
