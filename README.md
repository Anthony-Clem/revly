# revly

## Overview
This project provides developers with a centralized solution for managing feedback and ratings submitted via their applications. By integrating our API into your project's feedback or rating forms, you can collect, manage, and receive real-time notifications for all submissions in one place. Notifications are powered by a Discord bot, ensuring you stay updated instantly.

## Key Features
- **Centralized Feedback Collection**: Collect feedback and ratings from various applications through a single API.
- **Real-Time Notifications**: Receive notifications in Discord when new feedback is submitted.
- **Developer-Friendly API**: Easy-to-integrate API with authentication via API keys.
- **Modern Tech Stack**: Built with cutting-edge technologies for scalability and performance.

## Tech Stack
- **Backend**:
  - Node.js
  - TypeScript
  - MongoDB
  - Discord API
- **Frontend**:
  - Next.js
  - React Query
  - Axios

---

## Getting Started

### Prerequisites
- Node.js (>=14.x)
- MongoDB
- A Discord account with permissions to set up a bot

### Installation

#### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Anthony-Clem/revly
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory and configure the following:
   ```env
   DATABASE_URL=mongodb://localhost:27017/feedback-system
   DISCORD_BOT_TOKEN=your-discord-bot-token
   JWT_SECRET=your-secret-key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the frontend directory and configure the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Usage

### Integrating the API
1. Obtain your API key from the dashboard.
2. Use the API key to make authenticated POST requests to the feedback endpoint:
   ```http
   POST /api/feedback
   ```
3. Example request:
   ```javascript
   const axios = require('axios');

   const feedback = {
     folderName: 'user123',
     rating: 5,
     feedbackContent: 'Great application!'
   };

   axios.post('http://localhost:4000/api/feedback', feedback, {
     headers: {
       'Authorization': 'Bearer YOUR_API_KEY'
     }
   })
   .then(response => console.log('Feedback submitted!', response.data))
   .catch(error => console.error('Error submitting feedback:', error));
   ```

### Real-Time Notifications
Once the Discord bot is set up, you will receive a real-time message in your specified Discord channel whenever feedback is submitted.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add your feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
For questions or support, feel free to reach out:
- **Email**: your-email@example.com
- **Discord**: your-discord-tag

Happy coding!

