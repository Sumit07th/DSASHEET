import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import Navbar from "../Navbar.jsx";

Chart.register(ArcElement, Tooltip, Legend);

const PieChartWithPercentage = ({ totalCount, completedCount, sheet }) => {
    // Calculate the percentage of completed tasks
    const completedPercentage = ((completedCount / totalCount) * 100).toFixed(1);

    const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [completedCount, totalCount - completedCount], // completed and remaining
                backgroundColor: ['#0437F2', '#e0e0e0'], // Colors for completed and remaining sections
                borderWidth: 0, // Removes border from the chart
            },
        ],
    };

    const options = {
        cutout: '70%', // To make it appear more like a pie/doughnut chart with a hollow center
        plugins: {
            tooltip: {
                enabled: false, // Disable the tooltip
            },
            legend: {
                display: false, // Hide the legend
            },
        },
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
                <Doughnut data={data} options={options} />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-lg font-bold">
                        {completedPercentage}%
                    </div>
                </div>
            </div>

            {/* Centered Link below the Pie Chart */}
            <Link to={`/${sheet}`} className="flex items-center text-blue-500 hover:underline mt-4">
                <FaLink className="mr-1" /> {/* Link icon */}
                {sheet}
            </Link>
        </div>
    );
};

export default PieChartWithPercentage;
