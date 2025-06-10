import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';

const RecentTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchRecentTransactions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.RECENT_TRANSACTIONS);
      setTransactions(res.data || []);
    } catch (err) {
      console.error("Error fetching recent transactions:", err);
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  // Format data for chart
  const chartData = transactions.map(txn => ({
    date: moment(txn.date).format('DD MMM'),
    income: txn.type === 'income' ? txn.amount : 0,
    expense: txn.type === 'expense' ? txn.amount : 0
  }));

  return (
    <DashboardLayout activeMenu="Recent">
      <div className="p-5">
        <h2 className="text-2xl font-semibold mb-6">Recent Transactions Overview</h2>

        <div className="bg-white p-4 rounded shadow mb-10">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#4caf50" name="Income" />
              <Line type="monotone" dataKey="expense" stroke="#f44336" name="Expense" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-4">
          {transactions.map(txn => (
            <TransactionInfoCard
              key={txn._id}
              title={txn.type === 'income' ? txn.source : txn.category}
              icon={txn.icon}
              date={moment(txn.date).format('Do MMM YYYY')}
              amount={txn.amount}
              type={txn.type}
              hideDeleteBtn
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecentTransactionsPage;
