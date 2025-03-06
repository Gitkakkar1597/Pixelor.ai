# Pixelor.ai - AI Image Scraping Automation

## 🚀 Project Overview
Pixelor.ai is a **Python Full-Stack Generative** project built with **FastAPI (Backend)** and **Next.js (Frontend)**. Unlike traditional AI image generation methods that require powerful GPUs and expensive hardware, Pixelor.ai takes a **smart approach** by leveraging **web automation & scraping** to generate images using existing AI platforms.

🔹 **Frontend:** Next.js (React), Tailwind CSS, ShadCN, Framer Motion
🔹 **Backend:** FastAPI, Selenium, Undetected ChromeDriver
🔹 **Automation:** Scrapes images from an AI model/vendor using smart automation (bypassing hardware limitations)

## 🎯 Motive Behind the Project
Since high-end GPUs required for **Stable Diffusion** and other AI models were unavailable to me, I decided to take a **smart workaround** by **scraping AI-generated images** instead of directly generating them. This allows users to access AI-powered images **without requiring any expensive hardware**.

## 🛠️ Tech Stack
### **Frontend**
- [Next.js](https://nextjs.org/) - React Framework for SSR & SSG
- [Framer Motion](https://www.framer.com/motion/) - UI animations
- [Tailwind CSS](https://tailwindcss.com/) - Responsive styling
- [ShadCN](https://ui.shadcn.com/) - Modern UI components

### **Backend**
- [FastAPI](https://fastapi.tiangolo.com/) - Fast & async API framework
- [Selenium](https://www.selenium.dev/) - Web automation for image scraping
- [Undetected ChromeDriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) - Bypassing bot detection
- JSON for session management (cookies handling)

## 🏗️ How It Works
1. The user enters a **text prompt** in the frontend.
2. The request is sent to the **FastAPI backend**.
3. The backend **automates a web browser** using Selenium to log in and enter the prompt on an AI image-generation platform.
4. The script extracts the **generated image URL** and returns it to the frontend.
5. The frontend **displays the AI-generated image** with an option to **download** it.

## 📦 Deployment Guide
### **1️⃣ Running Locally**
#### **Prerequisites:**
- Python 3.12+
- Node.js 21+

I am currently using **Python** - v3.12.9 and **Next.JS** - v15.1

## 📌 Setup Instructions  

#### **Clone the Repository**  
```bash
git clone https://github.com/Gitkakkar1597/Pixelor.ai
cd pixelor.ai
```

#### **Backend (FastAPI + Selenium)**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

#### **Create a .env File**
Inside the backend directory, create a .env file and add your ChatGPT credentials:-

```bash
EMAIL=your_email@example.com
PASSWORD=your_secure_password
```

##### ⚠️ Important: Never share your .env file or commit it to Git. Add .env to .gitignore file.

#### **Frontend (Next.js)**
```bash
cd frontend
npm install  # or yarn install
npm run dev  # Starts frontend on localhost:3000
```

## 📩 Contact & Contribution
Feel free to contribute! If you have ideas or improvements, create a pull request or open an issue.

👨‍💻 Developed by **SIDDHARTH KAKKAR**

