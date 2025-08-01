# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript,Tailwind CSS and node js. This project showcases professional work, skills, and experience with a beautiful, animated interface.
Demo: https://zar.onrender.com/
## ✨ Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Modern UI**: Built with Tailwind CSS and DaisyUI components
- **TypeScript**: Full type safety and better development experience
- **Contact Form**: Backend integration with email functionality
- **Fast Performance**: Optimized with Vite build tool



## 📁 Project Structure

```
portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── data/          # Static data and content
│   │   └── App.tsx        # Main application component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── component/         # Server components
│   └── index.js          # Server entry point
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The application will open on `http://localhost:5173`


### Components
- **Header**: Navigation with theme toggle
- **Hero**: Landing section with call-to-action
- **About**: Personal information and skills
- **Projects**: Portfolio showcase with filtering
- **Experience**: Work history and achievements
- **Capabilities**: Skills and technologies
- **Footer**: Contact information and social links

### Pages
- **Home**: Main landing page with all sections
- **About**: Detailed about page



### Environment Variables
Create a `.env` file in the server directory:
```env

EMAIL=your-email@gmail.com
PASSWORD=your-app-password 

those used for contact us section
```

### Customization
- Update personal information in `client/src/data/about-data.tsx`
- Modify styling in `client/src/index.css`
- Add new projects in `client/src/data/projects-data.ts`

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Zaid Radaideh**

- LinkedIn: linkedin.com/in/zaid-radaideh

## 🤝 Contributing

Contributions are welcome and appreciated! Here are a few features I’d love help with:

1. **User Dashboard**  
   Allow users to edit their profile information through a dashboard UI — no need to modify code manually.

2. **AI Resume Scanning**  
   Enable users to upload their resume and extract relevant data automatically to populate their profile.

### How to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions or collaboration opportunities, feel free to reach out:
- Email: zaidradaideh.dev@gmail.com

⭐ If you found this project helpful, please give it a star! 


