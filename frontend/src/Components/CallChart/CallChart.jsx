import React from 'react';
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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Гистограмма количества звонков',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const apiData = [
    {date: new Date(2012,3,12)},
    {date: new Date(2012,2,23)},
    {date: new Date(2012,4, 23)},
    {date: new Date(2012,4,8)},
    {date: new Date(2012, 2, 14)}
];

function getYearData(){
    const result = apiData.group(({date}) => date);
    // for (let obj of result) {
    //     obj['1'] = obj['January'];
    //     obj['2'] = obj['February'];
    //     obj['3'] = obj['March'];
    //     obj['4'] = obj['April'];
    //     obj['5'] = obj['May'];
    //     obj['6'] = obj['June'];
    //     obj['7'] = obj['July'];
    //     obj['8'] = obj['August'];
    //     obj['9'] = obj['September'];
    //     obj['10'] = obj['October'];
    //     obj['11'] = obj['November'];
    //     obj['12'] = obj['December'];
    // }
    console.log(result);
}

export const data = {
    labels,
    datasets: [
        {
            label: 'Всего',
            data: labels.map(() => Math.random()*1000),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Успешные',
            data: labels.map(() => Math.random()*1000),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Не успешные',
            data: labels.map(() => Math.random()*1000),
            backgroundColor: 'rgba(178, 220, 88, 0.5)',
        }
    ],
};

export default function CallChart() {
    getYearData();
    ChartJS.defaults.font.size=20;
    return <Bar options={options} data={data} />;
}