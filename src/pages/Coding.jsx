
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
        <section className="w-[100%] mt-9 sm:mt-10 md:mt-11 flex flex-row flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10">
            <div className="bg-gray-900 p-4 rounded-md shadow-md">
                <p><a href="https://leetcode.com/u/Ramlakhan_79/" title="Visit My Profile" rel="nofollow" className="hover:underline hover:text-blue-600 hover:bg-gray-100 transition duration-300 ease-in-out" >LeetCode</a></p>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center">
                            <svg
                                viewBox="0 0 150 150"
                                className="w-34 h-34"
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
            {/* 
/*=======================================
        Geeks For Geeks
=========================================*/ }
            <div className="bg-gray-900 p-4 rounded-md shadow-md">
                <p><a href="https://www.geeksforgeeks.org/user/ramlakhan79/" title="Visit My Profile" rel="nofollow" className="hover:underline hover:text-blue-600 hover:bg-gray-100 transition duration-300 ease-in-out">Geeks For Geeks</a></p>
                <div className="flex gap-4">
                    <div className="bg-gray-900 rounded-md shadow-md p-4 w-60">
                        <div className="flex justify-center items-center mb-4">
                            <div className="rounded-full bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800">Overall</h3>
                            <p className="text-lg font-medium text-gray-600">Coding Score</p>
                            <h4 className="text-4xl font-bold text-gray-900 pt-6">1569</h4>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-md shadow-md p-4 w-60">
                        <div className="flex justify-center items-center mb-4">
                            <div className="rounded-full bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800">Total Problem</h3>
                            <p className="text-lg font-medium text-gray-600">Solved</p>
                            <h4 className="text-4xl font-bold text-gray-900 pt-6">520</h4>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-md shadow-md p-4 w-60">
                        <div className="flex justify-center items-center mb-4">
                            <div className="rounded-full bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800">Monthly</h3>
                            <p className="text-lg font-medium text-gray-600">Coding Score</p>
                            <h4 className="text-4xl font-bold text-gray-900 pt-6">70</h4>
                        </div>
                    </div>
                </div>
            </div>
            {/* <h1>To be implemented</h1> */}
        </section>
    );
}


