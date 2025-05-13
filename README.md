🛒 Daraz Product Review Sentiment Analyzer - Chrome Extension
This Chrome Extension allows users to instantly perform sentiment analysis on Daraz product reviews with a single click. It fetches all user reviews for a product, analyzes them using AI, and provides a smart summary that highlights key positives, negatives, and an overall recommendation — both in English and Urdu.

🚀 Features
🔍 One-click sentiment analysis on Daraz product pages

📊 Summary of positive vs. negative review percentages

✅ List of Pros and ❌ Common Cons mentioned by users

🤖 AI-generated product recommendation

🌐 Bilingual output (English & Urdu)

⚡ Fast and lightweight – uses API for backend analysis
🔧 Installation
Clone or download this repo.

Open Chrome and go to chrome://extensions/.

Enable Developer mode (top right).

Click Load unpacked.

Select the project directory.

The extension should now appear in your Chrome toolbar.

🧠 Backend API
This extension uses a Python-based API (FastAPI or Flask) which:

Scrapes reviews from Daraz

Performs sentiment analysis using TextBlob or a Transformer model

Generates a structured summary

Make sure the backend is running locally or deployed online, and update the API URL in the extension's source code (popup.js or background.js).

🗂 Project Structure
pgsql
Copy
Edit
📦 daraz-sentiment-extension/
├── manifest.json
├── content
├── styles.css
└── icons/
📌 Requirements
Google Chrome (latest version)

Daraz product URLs (standard format)

Working backend API for sentiment analysis

📫 Contact
Made with ❤️ by Muhammad Attiq

📧 attiqmuhammad51@gmail.com

📃 License
MIT License — feel free to use, improve, and share.

