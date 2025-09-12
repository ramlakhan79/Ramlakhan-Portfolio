import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "react-calendar-heatmap/dist/styles.css";
import { leetCodeMapData } from "../constants/LCHeatMap";

export default function SubmissionHeatmap() {
    const currentYear = new Date().getFullYear();
    const [submissions, setSubmissions] = useState([]);
    const [year, setYear] = useState(String(currentYear));
    const [activeYears, setActiveYears] = useState([2025, 2024, 2023]);
    const [data, setData] = useState([]);
    const [errorLeetCode, setErrorLeetCode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try {

                // const res = await fetch(
                //     `https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=Ramlakhan_79&year=${year}`
                // );
                // if (!res.ok) throw new Error("Network response was not ok");
                // const data = await res.json();

                //                 if (data?.message && data.message.includes("Too many request")) {
                //                     throw new Error("Rate limit exceeded. Please try again later.");
                //                 }
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
                if (year === "2025") {
                    fetch('https://leetcode-stats-api.herokuapp.com/Ramlakhan_79')
                        .then(response => response.json())
                        .then(data => {
                            setData(data);

                        })
                        .catch(error => {
                            setErrorLeetCode(error);
                        });

                    let parsedCalendar = {};
                    if (typeof data.submissionCalendar === "string") {
                        try {
                            parsedCalendar = JSON.parse(data.submissionCalendar || "{}");
                        } catch (e) {
                            console.error("Failed to parse submissionCalendar string:", e);
                            parsedCalendar = {};
                        }
                    } else {
                        parsedCalendar = data.submissionCalendar || {};
                    }

                    let yearData = {};
                    if (Array.isArray(parsedCalendar) && parsedCalendar.length > 0) {
                        const first = parsedCalendar[0] || {};
                        yearData = first[String(year)] || first[Number(year)] || {};
                    } else if (
                        parsedCalendar &&
                        typeof parsedCalendar === "object" &&
                        (parsedCalendar[String(year)] || parsedCalendar[Number(year)])
                    ) {
                        yearData = parsedCalendar[String(year)] || parsedCalendar[Number(year)];
                    } else if (parsedCalendar && typeof parsedCalendar === "object") {
                        yearData = Object.fromEntries(
                            Object.entries(parsedCalendar).filter(([ts]) => {
                                const d = new Date(Number(ts) * 1000);
                                return d.getFullYear() === Number(year);
                            })
                        );
                    }
                    const formatted = Object.entries(yearData).map(([timestamp, count]) => {
                        const date = new Date(Number(timestamp) * 1000).toISOString().split("T")[0];
                        return { date, count: Number(count) };
                    });
                    // console.log("2025")
                    setSubmissions(formatted);
                    // setActiveYears(data.activeYears || []);
                }
                else {
                    console.warn("Falling back to local data due to error:", err);
                    const calendar = leetCodeMapData[0]?.data?.matchedUser?.userCalendar;
                    if (!calendar) return;
                    let parsedCalendar = {};
                    if (typeof calendar.submissionCalendar === "string") {
                        try {
                            parsedCalendar = JSON.parse(calendar.submissionCalendar || "{}");
                        } catch (e) {
                            console.error("Failed to parse submissionCalendar string:", e);
                            parsedCalendar = {};
                        }
                    } else {
                        parsedCalendar = calendar.submissionCalendar || {};
                    }

                    let yearData = {};
                    if (Array.isArray(parsedCalendar) && parsedCalendar.length > 0) {
                        const first = parsedCalendar[0] || {};
                        yearData = first[String(year)] || first[Number(year)] || {};
                    } else if (
                        parsedCalendar &&
                        typeof parsedCalendar === "object" &&
                        (parsedCalendar[String(year)] || parsedCalendar[Number(year)])
                    ) {
                        yearData = parsedCalendar[String(year)] || parsedCalendar[Number(year)];
                    } else if (parsedCalendar && typeof parsedCalendar === "object") {
                        yearData = Object.fromEntries(
                            Object.entries(parsedCalendar).filter(([ts]) => {
                                const d = new Date(Number(ts) * 1000);
                                return d.getFullYear() === Number(year);
                            })
                        );
                    }
                    const formatted = Object.entries(yearData).map(([timestamp, count]) => {
                        const date = new Date(Number(timestamp) * 1000).toISOString().split("T")[0];
                        return { date, count: Number(count) };
                    });
                    setSubmissions(formatted);
                    setActiveYears(calendar.activeYears || []);
                }
            }
        };

        fetchData();
    }, [year]);

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
                        ? { "data-tooltip-id": "heatmap-tooltip", "data-tooltip-content": `${val.date}: ${val.count} submissions` }
                        : { "data-tooltip-id": "heatmap-tooltip", "data-tooltip-content": "No submissions" }
                }
            />
            <style jsx>{`
        .color-empty { fill: #ebedf0; }
        .color-scale-1 { fill: #9be9a8; }
        .color-scale-2 { fill: #40c463; }
        .color-scale-3 { fill: #30a14e; }
        .color-scale-4 { fill: #216e39; }
      `}</style>
            <ReactTooltip id="heatmap-tooltip" />
        </div>
    );
}
