# Portfolio Website

This portfolio website showcases my projects and skills, built with React and Tailwind CSS. It features a responsive design, smooth animations, and a user-friendly interface. The site includes sections for project details, skills, and contact information, providing a comprehensive overview of my work.

Demo: https://zar.onrender.com/

## ✨ Features

- **Responsive Design**: Optimized for all devices and screen sizes.
- **Dark/Light Theme**: Toggle between themes with smooth transitions.
- **Smooth Animations**: Powered by Framer Motion for engaging user experience.
- **Modern UI**: Built with Tailwind CSS and DaisyUI components.
- **TypeScript**: Full type safety and better development experience.
- **Contact Form**: Backend integration with email functionality.
- **Fast Performance**: Optimized with Vite build tool.

### Backend & Data Management
- **Supabase Integration**: Uses Supabase as the primary database for storing user, project, skill, and experience data.
- **Cloudinary Integration**: Manages image uploads and optimization for profile pictures and project assets.
- **Admin Dashboard**: A secure, comprehensive dashboard to manage all portfolio content without touching code.
    - **Multiple Portfolios**: Create and switch between different portfolio profiles to tailor your CV for specific job applications.
    - **CRUD Operations**: Create, Read, Update, and Delete Portfolios, Skills, Projects, and Experiences.
    - **Stats & Analysis**: View real-time statistics about your portfolio data.
- **Browser Caching**: Implements smart caching strategies (localStorage) to minimize API calls and enhance data loading speed.
- **Data Import/Export**: 
    - **Export**: Download your entire portfolio data as a JSON file directly from the dashboard.
    - **Import**: Upload a JSON file to populate the dashboard with data instantly.
- **Security Layer**: Custom middleware (`security-code`) protects API endpoints to prevent unauthorized access.

## 📋 Requirements

To run this project, you will need:

1.  **Node.js** (v18 or higher)
2.  **npm** or **yarn**
3.  **Supabase Account**: For database services.
4.  **Cloudinary Account**: For image hosting.

## 🛠️ Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database (Supabase)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

# Image Hosting (Cloudinary)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# Email Service (Contact Form)
EMAIL=your-email@gmail.com
PASSWORD=your-app-password

# Security
SECURITY_CODE=your_secret_security_code
```

## 🚀 Getting Started

### Installation

1.  **Clone the repository**
    ```bash
    git clone <your-repository-url>
    cd portfolio
    ```

2.  **Install frontend dependencies**
    ```bash
    cd client
    npm install
    ```

3.  **Install backend dependencies**
    ```bash
    cd ../server
    npm install
    ```

### Running the Application

#### Development Mode

1.  **Start the backend server**
    ```bash
    cd server
    npm start
    ```
    The server will run on `http://localhost:3000`

2.  **Start the frontend development server**
    ```bash
    cd client
    npm run dev
    ```
    The application will open on `http://localhost:5173`

## 📦 Static Deployment (Antigravity Branch)

This project supports a special static deployment workflow using the **"antigravity"** branch.

1.  **Generate Data**: Go to your Admin Dashboard in the local application.
2.  **Export JSON**: Use the "Export User Data" feature to download your `portfolio_data.json` containing all your info, projects, and skills.
3.  **Deploy**:
    > **replace "data.json" with your data.json in the "antigravity" branch.**
    
    (Simply placing your generated JSON file in the appropriate location on the `antigravity` branch allows strictly static deployment of your personalized portfolio).

## 🔐 Accessing the Dashboard

The Admin Dashboard is hidden by default. To access it:

1.  Scroll down to the **Contact** section (Footer).
2.  In the "Message" field, type the secret access code:
    > **zaidopendash**
3.  A secure modal will appear. It will automatically send a secondary security code to your email.
4.  Enter the code you received in your email to authenticate and enter the dashboard.

## 📁 Project Structure

```
portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── data/           # Static data and content
│   │   └── App.tsx         # Main application component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Backend Node.js application
│   ├── component/          # Server components
│   ├── config/             # DB & Cloud configurations
│   ├── routes/             # API Routes (User, Project, Skill, etc.)
│   ├── controllers/        # Request handlers
│   └── index.js            # Server entry point
└── README.md               # This file
```

## 👨‍💻 Author

**Zaid Radaideh**

- LinkedIn: [linkedin.com/in/zaid-radaideh](https://linkedin.com/in/zaid-radaideh)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and open a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions or collaboration opportunities, feel free to reach out:
- Email: zaidradaideh.dev@gmail.com

⭐ If you found this project helpful, please give it a star!
