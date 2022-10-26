import React, {useEffect, useMemo, useState} from 'react';
import axios from "axios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/*const apiData = [
    {month: "March", allCount: 15, failed: 5, successfull: 10},
    {month: "September", allCount: 23, failed: 8, successfull: 15},
    {month: "December", allCount: 8, failed: 2, successfull: 6},
    {month: "November", allCount: 35, failed: 5, successfull: 30},
    {month: "July", allCount: 19, failed: 3, successfull: 16}
];*/

export default function CallChart({period, title}) {

    const [apiData, setApiData] = useState([])

    const getCallsPerYear = (setState) => {
        axios.get(`https://fa65-176-59-54-115.eu.ngrok.io /api/callsper${period}`)
            .then((response) => setState(response.data));
    }

    ChartJS.defaults.font.size=20;
    useEffect(()=>{
        getCallsPerYear(setApiData);
    }, [period, title]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Гистограмма количества звонков ${title}`,
            },
        },
    };

    const data = useMemo( ()  => {
        return {
        labels: apiData.map((item) => item.month ?? item.day ?? item.weekStart ?? item.date),
        datasets: [
            {
                label: 'Всего',
                data: apiData.map((item) => item.failed + item.successful),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Успешные',
                data: apiData.map((item) => item.successful),
                backgroundColor: 'rgba(178, 220, 88, 0.5)',
            },
            {
                label: 'Не успешные',
                data: apiData.map((item) => item.failed),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }
    }, [apiData]);

    return <Bar options={options} data={data} />;
}