
// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"
// import Box from '@mui/joy/Box';
// import CircularProgress from '@mui/joy/CircularProgress';
// import ReportIcon from '@mui/icons-material/Report';
// import WarningIcon from '@mui/icons-material/Warning';

import {
    gfgData,
} from "../constants/gfg";

export default function Coding() {
    const [isDarkMode] = useOutletContext();
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [loadingLeetCode, setLoadingLeetCode] = useState(true);
    const [loadingGeeksForGeeks, setLoadingGeeksForGeeks] = useState(true);
    const [errorLeetCode, setErrorLeetCode] = useState(null);
    const [errorGeeksForGeeks, setErrorGeeksForGeeks] = useState(null);

    useEffect(() => {
        // Fetch data from LeetCode API
        fetch('https://leetcode-stats-api.herokuapp.com/Ramlakhan_79')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setNewData(gfgData[0]);
                setLoadingLeetCode(false);
                setLoadingGeeksForGeeks(false);
            })
            .catch(error => {
                setErrorLeetCode(error);
                setLoadingLeetCode(false);
            });
    }, []);

    // useEffect(() => {

    // Fetch data from GeeksforGeeks API

    /*=====================================
        S.O.C Chnaged 22/06/2025 Old
        =========================================*/
    // const proxyUrl = "https://api.allorigins.win/get?url=";
    // const targetUrl =
    //     proxyUrl +
    //     encodeURIComponent(
    //         "https://geeks-for-geeks-api-five.vercel.app/api/user/ramlakhan79"
    //     );

    // fetch(targetUrl)
    //     .then(response => response.json())
    //     .then(newData => {
    //         const jsonData = JSON.parse(newData.contents);
    //         setNewData(jsonData);
    //         setLoadingGeeksForGeeks(false);
    //     })
    //     .catch(error => {
    //         setErrorGeeksForGeeks(error);
    //         setLoadingGeeksForGeeks(false);
    //     });
    /*=====================================
    E.O.C Chnaged 22/06/2025 Old
    =========================================*/


    /*=====================================
    S.O.C Chnaged 22/06/2025 New
    =========================================*/

    // fetch('https://cors-anywhere.herokuapp.com/https://geeks-for-geeks-api-five.vercel.app/api/user/ramlakhan79')
    //     .then(response => response.json())
    //     .then(newData => {
    //         setNewData(newData); // Use directly
    //         setLoadingGeeksForGeeks(false);
    //     })
    //     .catch(error => {
    //         setErrorGeeksForGeeks(error);
    //         setLoadingGeeksForGeeks(false);
    //     });   

    /*=====================================
    E.O.C Chnaged 22/06/2025 New
    =========================================*/
    // }, []);



    // Combined loading state


    const loading = loadingLeetCode || loadingGeeksForGeeks;
    const error = errorLeetCode || errorGeeksForGeeks;

    // console.log(newData)


    const circleRadius = 65; // Radius of the circle
    const circleCircumference = 2 * Math.PI * circleRadius;

    // Calculate dash values for each category
    const calculateDashArray = (solved, total) => (solved / total) * circleCircumference;



    if (loading) {
        return <div>
            <Skeleton count={3} height={20} width="100%" />________________________________________
            {/* Loading... */}
        </div>
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2>Something went wrong!</h2>
                <p>We couldn't retrieve the data at this moment.</p>
                {/* <p><strong>Error:</strong> {error.message}</p> */}
                <p>Here are some things you can try:</p>
                <div className="flex items-center justify-center mt-4">
                    <p className="mr-2">Try refreshing the page:</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Refresh
                    </button>
                </div>
                <ul>
                    <li>Check your internet connection</li>
                    <li>Come back later</li>
                </ul>
            </div>
        );
    }

    return (
        <section className="w-[100%] mt-9 sm:mt-10 md:mt-11 flex flex-col flex-nowrap items-center justify-center gap-7 px-mobileBound sm:px-8 sm:gap-8 md:gap-9 lg:gap-10 cl:flex-row">
            {/* 
/*=======================================
            LeetCode
=========================================*/ }
            <div className="bg-gray-900 p-4 rounded-md shadow-md">
                <p><a href="https://leetcode.com/u/Ramlakhan_79/" title="Visit My Profile" rel="nofollow" target="_blank" className="hover:underline hover:text-blue-600 hover:bg-gray-100 transition duration-300 ease-in-out" >LeetCode</a></p>
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
                                    r={circleRadius}
                                    stroke="#2D3748" // Dark gray background
                                    strokeWidth="8"
                                    fill="transparent"
                                />
                                {/* Easy Segment */}
                                <circle
                                    cx="75"
                                    cy="75"
                                    r={circleRadius}
                                    stroke="#38B2AC" // Easy color
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={`${calculateDashArray(data.easySolved, data.totalEasy)} ${circleCircumference}`}
                                    strokeDashoffset={0}
                                />
                                {/* Medium Segment */}
                                <circle
                                    cx="75"
                                    cy="75"
                                    r={circleRadius}
                                    stroke="#F59E0B" // Medium color
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={`${calculateDashArray(data.mediumSolved, data.totalMedium)} ${circleCircumference}`}
                                    strokeDashoffset={-calculateDashArray(data.easySolved, data.totalEasy)}
                                />
                                {/* Hard Segment */}
                                <circle
                                    cx="75"
                                    cy="75"
                                    r={circleRadius}
                                    stroke="#E53E3E" // Hard color
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={`${calculateDashArray(data.hardSolved, data.totalHard)} ${circleCircumference}`}
                                    strokeDashoffset={-(
                                        calculateDashArray(data.easySolved, data.totalEasy) +
                                        calculateDashArray(data.mediumSolved, data.totalMedium)
                                    )}
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
                        <div className="text-sm font-medium text-gray-400 mt-2">12 Attempting</div>
                    </div>
                    <div className="ml-8">
                        <div className="bg-gray-800 p-2 rounded-md mb-2">
                            <div className="flex items-center">
                                <span
                                    className="text-sm font-medium mr-2"
                                    style={{ color: "#38B2AC" }} // Easy color
                                >
                                    Easy
                                </span>
                                <span className="text-sm font-medium text-gray-400">
                                    {data.easySolved}/{data.totalEasy}
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-2 rounded-md mb-2">
                            <div className="flex items-center">
                                <span
                                    className="text-sm font-medium mr-2"
                                    style={{ color: "#F59E0B" }} // Medium color
                                >
                                    Med.
                                </span>
                                <span className="text-sm font-medium text-gray-400">
                                    {data.mediumSolved}/{data.totalMedium}
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-2 rounded-md">
                            <div className="flex items-center">
                                <span
                                    className="text-sm font-medium mr-2"
                                    style={{ color: "#E53E3E" }} // Hard color
                                >
                                    Hard
                                </span>
                                <span className="text-sm font-medium text-gray-400">
                                    {data.hardSolved}/{data.totalHard}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
/*=======================================
            Geeks For Geeks
=========================================*/ }
            <div className="bg-gray-900 p-4 rounded-md shadow-md ">
                {/* S.O.C Commented || URL hide Profile link Issue GFG API not working || Date: 29.08.2025  */}
                {/* url: https://www.geeksforgeeks.org/user/ramlakhan79/ 
                target="_blank" 
                */}
                <p><a href="#" title="Visit My Profile" rel="nofollow" className="hover:underline hover:text-blue-600 hover:bg-gray-100 transition duration-300 ease-in-out">Geeks For Geeks</a></p>
                {/* E.O.C Commented || URL hide Profile link Issue GFG API not working || Date: 29.08.2025  */}
                <div className="gap-4 flex flex-col flex-nowrap cs:flex-row ">
                    <div className="bg-gray-900 rounded-md shadow-md p-4 w-60">
                        <div className="flex justify-center items-center mb-4">
                            <div className="rounded-full bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#F59E0B"
                                // stroke="currentColor"
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
                            <h4 className="text-4xl font-bold text-gray-900 pt-6">{newData.userDetails.codingScore}</h4>
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
                                    stroke="#38B2AC"
                                // stroke="currentColor"
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
                            <h4 className="text-4xl font-bold text-gray-900 pt-6">{newData.userDetails.totalProblemsSolved}</h4>
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
                                    stroke="#E53E3E"
                                // stroke="currentColor"
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
                            <h3 className="text-xl font-semibold text-gray-800">Current</h3>
                            <p className="text-lg font-medium text-gray-600">Streak</p>
                            <h4 className="text-4xl font-bold text-gray-900 pt-6">{newData.userDetails.currentStreak}</h4>
                        </div>
                    </div>

                    {/* <div className="bg-gray-900 rounded-md shadow-md p-4 w-60">
                        <div className="flex justify-center items-center mb-4">
                            <div className="rounded-full bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#E53E3E"
                                // stroke="currentColor"
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
                            <h3 className="text-xl font-semibold text-gray-800">Overall Article</h3>
                            <p className="text-lg font-medium text-gray-600">Published</p>
                            <h4 className="text-4xl font-bold text-gray-900 pt-6">4</h4>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* 
/*=======================================
            Coding Ninjas
=========================================*/ }

        </section>
    );
}


