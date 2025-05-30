# University Attendance System

The **University Attendance System** is a robust backend application designed to manage class attendance for universities using QR code-based verification. It allows administrators, instructors, and students to manage classes, sections, and attendance records efficiently. The system supports features like class and section management, QR code generation for attendance tracking, manual attendance recording, and exporting attendance data to Excel.

This project is built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, ensuring scalability, type safety, and efficient data handling.

This backend system was collaboratively developed by [**Mohamed Mansour**](https://github.com/MohamedManosur) and [**Ahmed Harby**](https://github.com/ahmedharby13).

## Table of Contents

- Features
- Technologies
- Prerequisites
- Installation
- Environment Variables
- Running the Application
- API Endpoints
- Folder Structure
- Testing
- Contributing
- License

## Features

- **User Authentication**: Secure registration, login, and password management using JWT.
- **Class Management**: Create, update, delete classes, and manage student enrollment (admin and instructor roles).
- **Section Management**: Create, update, delete sections within classes, and assign students to sections.
- **QR Code Attendance**: Generate QR codes for sections, verify student attendance with geolocation, and prevent duplicate entries using device fingerprints.
- **Manual Attendance**: Record or update attendance manually (admin and instructor roles).
- **Attendance Statistics**: View detailed attendance statistics per class, including present, absent, and late counts.
- **Excel Export**: Export attendance data to Excel with formatted student and daily attendance details.
- **Role-Based Access**: Supports admin, instructor, and student roles with appropriate permissions.
- **Logging**: Comprehensive logging for debugging and monitoring using a custom logger.
- **Security**: Includes helmet, CORS, rate limiting, and input validation for enhanced security.

## Technologies

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod for request validation
- **QR Code Generation**: `qrcode` library
- **Geolocation**: `geolib` for location-based attendance verification
- **Excel Export**: `exceljs` for generating Excel files
- **Logging**: Custom logger utility
- **Security**: Helmet, CORS, express-rate-limit
- **Other Libraries**: `uuid`, `dotenv`

## Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas)
- **Git**: For cloning the repository
- **Postman**: For API testing (optional)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ahmedharby13/FCI-Tanta-University-Attendance-System.git
   cd FCI-Tanta-University-Attendance-System
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up MongoDB**:

   - Ensure MongoDB is running locally or provide a MongoDB Atlas connection string.
   - Update the `MONGODB_URI` in the `.env` file (see Environment Variables).

4. **Create Environment File**:

   - Create a `.env` file in the root directory based on the `.env.example` template (see below).

## Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
API_BASE_URL=http://localhost:3000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/university-attendance

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1h

# QR Code Configuration
QR_CODE_INTERVAL_SECONDS=60
LOCATION_RADIUS=50
DEFAULT_LOCATION_NAME=University

# CORS
CORS_ORIGIN=*

# Optional: Email Configuration (for password reset, not implemented in current code)
# EMAIL=your-email@gmail.com
# GMAIL_CLIENT_ID=your-client-id
# GMAIL_CLIENT_SECRET=your-client-secret
# GMAIL_REFRESH_TOKEN=your-refresh-token
# GMAIL_APP_PASSWORD=your-app-password
```

- **JWT_SECRET**: A strong secret key for JWT signing.
- **QR_CODE_INTERVAL_SECONDS**: Interval for QR code refresh (default: 60 seconds).
- **LOCATION_RADIUS**: Radius in meters for geolocation verification (default: 50).
- **CORS_ORIGIN**: Allowed origins for CORS (e.g., `http://localhost:3000` for production).

## Running the Application

1. **Build TypeScript**:

   ```bash
   npm run build
   ```

2. **Start the Server**:

   ```bash
   npm start
   ```

   - The server will run on `http://localhost:3000` (or the specified `PORT`).

3. **Development Mode** (with hot reload):

   ```bash
   npm run dev
   ```

4. **Access the API**:

   - Default route: `GET /` returns "University Attendance System is running!"
   - API routes are prefixed with `/api` (e.g., `/api/auth`, `/api/class`).

## API Endpoints

The API is organized into several modules. Below is a summary of the main endpoints. For detailed documentation, refer to the API Documentation.

### Authentication (`/api/auth`)

- `POST /register`: Register a new user (admin, instructor, or student).
- `POST /login`: Authenticate and receive a JWT token.
- `PATCH /update-password`: Update user password.
- `GET /me`: Get authenticated user details.

### Class Management (`/api/class`)

- `POST /create`: Create a new class (admin/instructor).
- `POST /add-students`: Add students to a class.
- `DELETE /remove-students`: Remove students from a class.
- `PATCH /update`: Update class details.
- `DELETE /delete`: Delete a class (admin only).
- `GET /my-classes`: Get classes based on user role.

### Section Management (`/api/attendance`)

- `POST /section/create`: Create a new section.
- `PATCH /section/update`: Update section details.
- `DELETE /section/delete`: Delete a section.
- `POST /section/add-students`: Add students to a section.
- `DELETE /section/remove-students`: Remove students from a section.

### QR Code and Attendance (`/api/attendance`)

- `POST /generate`: Generate a QR code for a section (instructor only).
- `POST /close`: Close QR code generation and record absences.
- `POST /verify/:code`: Verify student attendance via QR code.
- `PATCH /manual`: Record manual attendance.
- `GET /`: Get attendance records (admin/instructor).
- `GET /student`: Get student’s attendance.
- `GET /statistics`: Get attendance statistics.

### Export (`/api/export`)

- `GET /`: Export attendance data to Excel.

## Folder Structure

```plaintext
├── src
│   ├── config
│   │   └── db.ts               # MongoDB connection
│   ├── controllers
│   │   ├── auth.ts             # Authentication logic
│   │   ├── class.ts            # Class management
│   │   ├── section.ts          # Section management
│   │   ├── attendance.ts       # Attendance and QR code logic
│   │   ├── qrCode.ts           # QR code generation
│   │   ├── studentSection.ts   # Student-section management
│   │   └── export.ts           # Excel export
│   ├── middlewares
│   │   ├── auth.ts             # JWT protection and role-based access
│   │   ├── errorHandler.ts     # Global error handling
│   │   └── validate.ts         # Request validation
│   ├── models
│   │   ├── user.ts             # User schema
│   │   ├── class.ts            # Class schema
│   │   ├── section.ts          # Section schema
│   │   ├── attendance.ts       # Attendance schema
│   │   └── code.ts             # QR code schema
│   ├── routes
│   │   ├── auth.ts             # Auth routes
│   │   ├── class.ts            # Class routes
│   │   ├── attendance.ts       # Attendance and section routes
│   │   └── export.ts           # Export routes
│   ├── types
│   │   └── AuthRequest.ts      # Custom request type
│   ├── utils
│   │   ├── asyncHandler.ts     # Async error handling
│   │   ├── appError.ts         # Custom error class
│   │   ├── logger.ts           # Logging utility
│   │   └── cleanup.ts          # Cleanup job for old data
│   ├── validation
│   │   ├── attendance.ts       # validation
│   │   ├── auth.ts             # validation
│   │   ├── class.ts            # validation
│   │   └── export.ts           # validation
│   └── server.ts               # Express app setup
├── .env.example                # Example environment variables
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Testing

To test the API, use **Postman** or a similar tool. Follow these steps:

1. **Set Up Users**:
   - Register users (`POST /api/auth/register`) with roles: admin, instructor, student.
   - Log in (`POST /api/auth/login`) to obtain JWT tokens.
2. **Test Class Management**:
   - Create a class (`POST /api/class/create`).
   - Add students (`POST /api/class/add-students`).
3. **Test Section Management**:
   - Create a section (`POST /api/attendance/section/create`).
   - Add students to the section (`POST /api/attendance/section/add-students`). 4 \* **Test Attendance**:
   - Generate a QR code (`POST /api/attendance/generate`).
   - Verify attendance as a student (`POST /api/attendance/verify/:code`).
   - Record manual attendance (`PATCH /api/attendance/manual`).
4. **Test Export**:
   - Export attendance data (`GET /api/export?classId=<classId>&format=excel`).
5. **Check Logs**:
   - Monitor logs in the console or log files for debugging.

For detailed Postman collection, refer to the Postman Testing Guide.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a clear description.

Please follow the coding style, add tests for new features, and update documentation as needed.

## License

## This project is licensed under the MIT License. See the LICENSE file for details.

⭐ Don't forget to star this repository if you find it helpful!
