import React from 'react'
import ResponsiveAppBar from "../Components/ResponsiveAppBar/ResponsiveAppBar";
import CallChart from "../Components/CallChart/CallChart";


function StatisticsPage() {
    return (
        <>
            <div className="call-chart">
                <CallChart/>
            </div>
        </>
    );
}

export default StatisticsPage;