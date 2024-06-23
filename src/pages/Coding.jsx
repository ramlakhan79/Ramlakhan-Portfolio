
// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
// import Box from '@mui/joy/Box';
// import CircularProgress from '@mui/joy/CircularProgress';
// import ReportIcon from '@mui/icons-material/Report';
// import WarningIcon from '@mui/icons-material/Warning';


export default function Coding() {
    const [isDarkMode] = useOutletContext();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://leetcode-stats-api.herokuapp.com/ramlakhan_79')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className="w-[100%] mt-9 sm:mt-10 md:mt-11 flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
            <div className="bg-gray-900 p-4 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center">
                            <svg
                                viewBox="0 0 150 150"
                                className="w-34 h-34"
                                // style={{ transform: 'scale(1.5)' }} 
                            >
                                <circle
                                    cx="75"
                                    cy="75"
                                    r="65"
                                    stroke="#F59E0B"
                                    strokeWidth="8"
                                    fill="transparent"
                                />
                                <circle
                                    cx="75"
                                    cy="75"
                                    r="65"
                                    stroke="#38B2AC"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray="232.7433388230814 282.7433388230814"
                                    strokeDashoffset="204.16385182057517"
                                />
                                <circle
                                    cx="75"
                                    cy="75"
                                    r="65"
                                    stroke="#E53E3E"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray="252.7433388230814 282.7433388230814"
                                    strokeDashoffset="78.5794869925063"
                                />
                                <text
                                    x="75"
                                    y="75"
                                    textAnchor="middle"
                                    fontSize="12"
                                    fill={isDarkMode ? '#fff' : '#000'}
                                >
                                    {data.totalSolved}/{data.totalQuestions}
                                </text>
                                <text
                                    x="75"
                                    y="95"
                                    textAnchor="middle"
                                    fontSize="12"
                                    fill="#38B2AC"
                                >
                                    Solved
                                </text>
                            </svg>
                        </div>
                        <div className="text-sm font-medium text-gray-400 mt-2">10 Attempting</div>
                    </div>
                    <div className="ml-8">
                        <div className="bg-gray-800 p-2 rounded-md mb-2">
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-blue-400 mr-2">Easy</span>
                                <span className="text-sm font-medium text-gray-400">{data.easySolved}/{data.totalEasy}</span>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-2 rounded-md mb-2">
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-yellow-400 mr-2">Med.</span>
                                <span className="text-sm font-medium text-gray-400">{data.mediumSolved}/{data.totalMedium}</span>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-2 rounded-md">
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-red-400 mr-2">Hard</span>
                                <span className="text-sm font-medium text-gray-400">{data.hardSolved}/{data.totalHard}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <h1>To be implemented</h1> */}
        </section>
    );
}


