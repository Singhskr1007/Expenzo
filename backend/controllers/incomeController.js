const xlsx = require("xlsx");
const Income = require("../models/Income");


// Add Income Source
exports.addIncome = async (req,res) =>{
    const userId=req.user.id;

    try
    {
        const { icon,source,amount,date } = req.body;
        
        // Validation Check for missing fields

        if(!source || !amount || !date)
        {
            return res.status(400).json({message: "Please fill in all the fields"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        return res.status(200).json(newIncome);
    } 

    catch(err)
    {
        return res.status(500).json({ message:"Internal Server Error" });
    }
}

// Get all Income Source
exports.getAllIncome = async (req,res) =>{
    const userId = req.user.id;

    try
    {
        const income = await Income.find({userId}).sort({date:-1});
        return res.json(income);
    }
    catch(error)
    {
        return res.status(500).json({ message:"Internal Server Error" });
    }
};

// Delete Income Source
exports.deleteIncome = async (req,res) =>{
    try
    {
        await Income.findByIdAndDelete(req.params.id);
        return res.json({message:"Income Deleted Successfully"});
    }
    catch(error)
    {
        return res.status(500).json({ message:"Internal Server Error" });
    }
};

// Download Income Source Excel file
exports.downloadIncomeExcel = async (req,res) =>{
    const userId=req.user.id;

    try
    {
        const income = await Income.find({userId}).sort({date:-1});

        // Prepare data for excel
        const data = income.map((item) =>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date.toISOString().split('T')[0],
            
        }));
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,'income_details.xlsx');
        res.download('income_details.xlsx');
    }

    catch(error) 
    {
        return res.status(500).json({ message:"Internal Server Error" });
    }
};  