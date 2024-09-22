import React, { useState, useEffect } from 'react';
import { getQuestionCount } from "../../api/userApi.js";
import PieChartWithPercentage from "./PieChartWithPercentage.jsx";

const PieChart = () => {
    const [count, setCount] = useState([]);

    const getAll = async () => {
        try {
            const response = await getQuestionCount();
            return response;
        } catch (error) {
            console.error("Error fetching question count:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAll();
            const sortedData = data.result.sort((a, b) => b.completedCount - a.completedCount); // max value
            console.log(sortedData);
            setCount(sortedData);
        };
        console.log(count)

        fetchData();
    }, []);



    return (
        <div className=" flex flex-wrap gap-6">
            {count.map((item, key) => (
                <div key={key}>
                    <PieChartWithPercentage completedCount={item.completedCount} totalCount={item.totalQuestions} sheet={item.sheet}
                    />
                </div>
            ))}
        </div>
    );
};

export default PieChart;
