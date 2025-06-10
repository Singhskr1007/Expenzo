import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FF0000", "#4CAF50"];

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {

    const balanceData =[
        {
            name: "Total Balance",
            amount: totalBalance
        },
        {
            name: "Total Expense",
            amount: totalExpense
        },
        {
            name: "Total Income",
            amount: totalIncome
        }
    ];


    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg font-medium'>Financial Overview</h5>
            </div>

            <CustomPieChart 
            data={balanceData}
            label="Total Balance"
            totalAmount={`₹${totalBalance}`}
            colors={COLORS}
            showTextAnchor
            />
        
        </div>
  )

};

export default FinanceOverview
