const xlsx = require("xlsx");
const Expense = require("../models/Expense");


// Add Expense Source
exports.addExpense = async (req,res) =>{
    const userId=req.user.id;

    try
    {
        const { icon,category,amount,date } = req.body;
        
        // Validation Check for missing fields

        if(!category || !amount || !date)
        {
            return res.status(400).json({message: "Please fill in all the fields"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        return res.status(200).json(newExpense);
    } 

    catch(err)
    {
        return res.status(500).json({ message:"Internal Server Error" });
    }
}

// Get all Expense Source
exports.getAllExpense = async (req,res) =>{
    const userId = req.user.id;

    try
    {
        const expense = await Expense.find({userId}).sort({date:-1});
        return res.json(expense);
    }
    catch(error)
    {
        return res.status(500).json({ message:"Internal Server Error" });
    }
};

// Delete Expense Source
exports.deleteExpense = async (req,res) =>{
    try
    {
        await Expense.findByIdAndDelete(req.params.id);
        return res.json({message:"Expense Deleted Successfully"});
    }
    catch(error)
    {
        return res.status(500).json({ message:"Internal Server Error" });
    }
};

// Download Expense Source Excel file
exports.downloadExpenseExcel = async (req,res) =>{
    const userId=req.user.id;

    try
    {
        const expense = await Expense.find({userId}).sort({date:-1});

        // Prepare data for excel
        const data = expense.map((item) =>({
            Category:item.category,
            Amount:item.amount,
            Date:item.date.toISOString().split('T')[0],
            
        }));
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb,'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }

    catch(error) 
    {
        return res.status(500).json({ message:"Internal Server Error" });
    }
};  