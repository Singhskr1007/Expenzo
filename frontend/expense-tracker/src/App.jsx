import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import RecentTransactionsPage from './pages/Transactions/RecentTransactionsPage';
import UserProvider from './context/UserContext';


const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
          <Route path="/recent-transactions" element={<RecentTransactionsPage />} />
        </Routes>
      </Router>

      {/* Toast container globally visible across all routes */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

    </div>
    </UserProvider>
  )
}

export default App;

const Root=()=>{
  //Check if token exists in localStorage
  const isAuthenticated=!!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ?(
    <Navigate to="/dashboard" />
  ) :
  (
    <Navigate to="/login"/>
  );

};
