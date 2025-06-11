# Expenzo

Expenzo is a sleek, full-stack expense tracker that helps users manage their income and expenses in a visual and intuitive way. Designed with a clean UI and built using modern technologies, Expenzo allows users to:

      Add and track income/expenses
      
      View recent transactions
      
      Analyze financial trends with dynamic charts
      
      Maintain a clear overview of monthly cash flow

Whether you're budgeting your day-to-day spending or monitoring your financial health, Expenzo offers a fast, interactive, and user-friendly experience.

      📥 Add Income/Expense: Input transactions with category, amount, and description.
      
      📊 Visual Analytics: Get real-time insights via line charts and summary cards.
      
      🧾 Recent Transactions Page: A dedicated view to quickly monitor your latest activity.
      
      🧠 Smart UI/UX: Clean interface optimized for clarity and responsiveness.
      
      🔁 Persistent Data: Backend APIs with database integration for saving and retrieving transactions.
      
      📱 Mobile Responsive: Designed to work seamlessly across devices.

🛠️ Tech Stack
        Frontend: React.js, Tailwind CSS
        
        Backend: Node.js, Express.js
        
        Database: MongoDB

Other Tools:

        Charting: recharts for analytics
        
        State Management: React hooks
        
        RESTful API architecture

🧑‍💻 Getting Started with Expenzo
Follow these steps to set up and run Expenzo locally:

⚙️ 1. Clone the Repository
            git clone https://github.com/your-username/expenzo.git
            cd expenzo
📁 2. Install Dependencies
            🔹 Backend Setup (Node.js + Express + Nodemon)
                  cd backend
                  npm init -y (Node.js package.json)
                  npm i express jsonwebtoken mongoose dotenv cors bcryptjs multer xlsx (xlsx-Excel Download)
                  create server.js (or app.js or index.js)
                  
                  In package.json :
                  Rename "main" as "server.js"
                  
                        In "scripts" :
      
                              "start": "node server.js"
                              "dev": "nodemon server.js"
                  
                  Install Nodemon : 
                        npm i nodemon --save-dev
                  
            
            🔹 Frontend Setup (React + Vite)
                  cd ../frontend
                  npm create vite@latest
                  npm install


🔧 3. Set Up Environment Variables
Create a .env file in the backend folder with the following:
            
            PORT=8000
            MONGO_URI=your_mongodb_connection_string
            JWT_SECRET = Create a random 64 bits hashed value using command, node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
            Replace your_mongodb_connection_string with your actual MongoDB connection.
            

▶️ 4. Run the Application
      Start the Backend Server (with Nodemon):
      cd backend
      npm run dev  (or nodemon)
      Make sure your package.json in backend has this script:
      
      
      cd ../frontend
      npm run dev
      
      Vite will show a local development server URL, usually:
      🌐 http://localhost:5173

Live Website Link - https://expenzo-frontend-j7sw.onrender.com





