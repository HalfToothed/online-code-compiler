# 🌐 Online Code Compiler 🚀

An intuitive, web-based code compiler that lets you write, compile, and run code in multiple programming languages right from your browser! Built with React, TypeScript, and Vite on the frontend, and powered by Judge0 API for code execution, this app provides real-time feedback with a simple, responsive interface.

---

## 🎯 Features

- 🌍 **Multilingual Support**: Write and execute code in various programming languages.
- ⚡ **Real-time Execution**: See output instantly for a seamless coding experience.
- 🎨 **Syntax Highlighting**: Enhanced readability with syntax-highlighted code.
- 🛠️ **Detailed Error Reporting**: Debug effectively with clear error messages.
- 📱 **Responsive Design**: Use it smoothly across devices, whether desktop or mobile.

---

## 🛠️ Technologies Used

- **Frontend**: React, Vite, and TypeScript
- **Backend**: Judge0 API
- **Styling**: Tailwind CSS & Shadcn UI

---

## 🚀 Quick Start Guide

To run this project locally:

### 1. 📂 Clone the Repository

```bash
git clone https://github.com/HalfToothed/online-code-compiler.git
cd online-code-compiler
```

### 2. 📦 Install Dependencies

```bash
npm install
```

### 3. 🔑 Set Up Judge0 API Access

- **Get your API Key**: Register on [Judge0’s RapidAPI page](https://rapidapi.com/judge0-official/api/judge0-ce/) and subscribe to their free or paid plan based on your needs.
- **Create a `.env` file**: In the project root, create a `.env` file and add the following:

  ```plaintext
  VITE_RAPIDAPI_KEY=your_api_key_here
  VITE_RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
  ```

  Replace `your_api_key_here` with your actual Judge0 API key.

### 4. ▶️ Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start coding! 💻

---

## 📝 Usage

1. **Select a Language**: Choose the programming language from the dropdown.
2. **Write Code**: Type your code in the editor with syntax highlighting.
3. **Provide Input (Optional)**: If your code requires input, add it in the input field.
4. **Run Code**: Click the "Run" button to compile and execute your code. Output and error messages will appear below.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to help this project.
