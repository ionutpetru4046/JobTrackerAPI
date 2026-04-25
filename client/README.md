# JobTracker API Frontend

This is the frontend website for the **JobTracker API** project, a modern web application designed to help users log, track, and manage job applications efficiently.

## Overview

The JobTracker frontend is built using **React** and powered by **Vite** for rapid development and optimal performance. It connects to the JobTracker API backend to offer a seamless experience for job seekers and career managers.

## Features

- User authentication (sign up, login, logout)
- Dashboard for visualizing and managing job applications
- Forms for adding, editing, and deleting job records
- Real-time updates and interactive UI
- Search and filter functionalities
- Responsive design for mobile and desktop devices

## Project Structure

```
client/
│
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/         # Page-level components (Dashboard, Login, etc.)
│   ├── services/      # API utilities for server communication
│   ├── assets/        # Static files and images
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Entry point
│
├── public/            # Static assets
├── .env               # Environment variables (API URLs, etc.)
├── package.json       # Dependencies and scripts
└── README.md          # Documentation (this file)
```

## Getting Started

1. **Install Dependencies**

   ```
   npm install
   ```

2. **Set up Environment Variables**

   Create a `.env` file at the root and define:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run the Development Server**

   ```
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

## Build for Production

```
npm run build
```

The output will be in the `dist/` directory.

## Customization and Configuration

- Adjust API URL and other settings in the `.env` file as needed.
- To customize styles, edit files in `src/assets` or your CSS framework of choice.

## Contributing

Contributions and feedback are welcome! Please open an issue or submit a pull request.

## License

MIT (or specify your license here)

## Contact

For questions or issues, please open an issue in this repository.
