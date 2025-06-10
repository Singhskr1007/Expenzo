import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-toastify';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';


const Income = () => {

  useUserAuth();

  const [incomeData,setIncomeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const [ openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // get all income details

  const fetchIncomeDetails = async () =>{
      if(loading) return;
      setLoading(true);

      try 
      {
          const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
          if(response.data)
          {
            setIncomeData(response.data);
          }
      } 

      catch(error)
      {
          console.log("Something Went Wrong. Please Try Again.", error);
      }
      finally
      {
          setLoading(false);
      }
  };

  // Handle Add Income

  const handleAddIncome = async (income) =>{
      const {source, amount, date, icon } = income;

      // Validation Checks
      if(!source.trim())
      {
          toast.error("Source Is Required.");
          return;
      }
      if(!amount || isNaN(amount) || Number(amount)<=0)
      {
          toast.error("Amount Should Be A Valid Number Greater Than 0.");
          return;
      }
      if(!date)
      {
        toast.error("Date Is Required.");
        return;
      }

      try 
      {
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
          source,
          amount,
          date,
          icon,
        });
          setOpenAddIncomeModal(false);
          toast.success("Income Added Successfully.");
          fetchIncomeDetails();
      }

      catch(error) 
      {
        console.error("Error Adding Income : ", error.response?.data?.message || error.message);
      }
  };

  // Delete Income

  const deleteIncome = async (id) =>{
    
    try 
    {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income Deleted Successfully.");
      fetchIncomeDetails();
    } 

    catch(error) 
    {
      console.error("Error Deleting Income : ", error.response?.data?.message || error.message);
    }

  };

  // handle download income details using excel

  const handleDownloadIncomeDetails = async () =>{

      try 
      {
        const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
          responseType: "blob",

        });

        // Create a URL for the blob

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download","income_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

      } 

      catch(error)
      {
        console.error("Error Downloading Income Details : ", error);
        toast.error("Failed To Download Income Details. Please Try Again Later.");
      }


  };

  useEffect(()=>{
      
      fetchIncomeDetails();
      
      return () =>{};

  },[]);


  return (
    <div>
      <DashboardLayout activeMenu="Income">
        <div className='my-5 mx-auto'> 
          
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <IncomeOverview 
              transactions={incomeData}
              onAddIncome={()=>setOpenAddIncomeModal(true)}
              />

            </div>

            <IncomeList 
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            />

          </div>

          <Modal 
          isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          title="Add Income"
          >

          <AddIncomeForm 
          onAddIncome={handleAddIncome}
          />

          </Modal>

          <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>setOpenDeleteAlert({ show: false,data: null })}
          title="Delete Income"
          >

            <DeleteAlert 
            content="Are You Sure, You Want To Delete This Income Detail?"
            onDelete={() =>deleteIncome(openDeleteAlert.data)}
            />

          </Modal>

        </div>
      </DashboardLayout>
    </div>
  )
}

export default Income
