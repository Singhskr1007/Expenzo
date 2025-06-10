import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
const COLORS = ["#875CF5", "#FF0000", "#4CAF50"];


const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));
        setChartData(dataArr);
    }

    useEffect(() => {
        prepareChartData();

        return () => { };
    }, [data]);

    return (

        <div className="card p-4">
            <h5 className='text-lg font-medium mb-4'>Last 60 Days Income</h5>
            <div className="w-full h-[380px]">
                <CustomPieChart
                    data={chartData}
                    label="Total Income"
                    totalAmount={`₹${totalIncome}`}
                    showTextAnchor
                    colors={COLORS}
                />
            </div>
        </div>
    )
}

export default RecentIncomeWithChart
