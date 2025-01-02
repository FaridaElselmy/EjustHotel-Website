# EJUST Hotel Booking Website

The EJUST Hotel Booking Website is designed to provide students and staff of the Egypt-Japan University of Science and Technology (EJUST) with an easy-to-use platform for booking rooms, services, and food bundles at the EJUST hotel. The system offers seamless booking functionality, user authentication, and personalized features to enhance the stay experience.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [OOP Integration](#oop-integration)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [License](#license)

## Features

The EJUST Hotel Booking Website offers a wide range of features to ensure a comprehensive and personalized experience for users:

### User Authentication
1. **Login** – Secure login functionality using JWT (JSON Web Tokens) for authentication.
2. **Register** – User registration system to create an account with necessary details.
3. **Logout** – Secure logout functionality to end the session and ensure account security.
4. **Password validity** – must be of certain length and characters.

### User Profile Management
5. **User Profile** – View and edit personal details, including name, email, and contact information.
6. **Booking History** – View a history of all past bookings with details like dates and room types.


### Room Booking
7. **Single Room Booking** – Book a single room with available dates, amenities, and pricing.
8. **Double Room Booking** – Book a double room with customized features like bed configuration and view preferences.
9. **Room Images** –  Gallery of images for each room, allowing users to view different angles and amenities of the room.
10. **Booking Confirmation** – Confirmation message displayed after a successful booking with details of the room and booking ID.
11.**Dates validity**- Check out date cannot be before check in date.

### Additional Services Booking
12. **Food Bundle Booking** – Option to book a food bundle (breakfast, lunch, dinner) during the stay, with multiple meal options.
13. **Gym Booking** – Reserve time slots for gym usage during the stay.
14. **Court Booking** – Book courts (e.g., tennis, basketball) for recreational activities.


### User Notifications
15. **Price Confirmation** – Gives a message to the user with the price
16. **Booking Cancellation** – Option to cancel a booking and receive confirmation of cancellation.
17. **Email Notifications** – Receive email confirmations for bookings, cancellations, and profile updates.

### Administrative Features
18. **Admin Dashboard** – Admins can view all users, their bookings, and manage bookings and services.
19. **Booking Management** – Admins can manually cancel bookings in case of issues.


### Miscellaneous Features
20. **Contact Us Page** – Contact form for users to reach the support team for inquiries or assistance.
21. **Terms and Conditions** – Page displaying the hotel’s terms and conditions for users before booking.
22. **FAQ Section** – Frequently Asked Questions section to help users with common issues and information.
23. **Responsive Design** – Fully responsive website that works seamlessly on mobile and desktop devices.

## Technologies

This project is built using the following technologies:

- **Frontend:**
  - **React.js** – A JavaScript library for building the user interface (UI).
  - **Material-UI** – A React UI framework for creating modern, responsive design components.

- **Backend:**
  - **Node.js** – JavaScript runtime for the backend, handling API requests and server-side logic.
  - **Express.js** – Web framework for Node.js, used for creating RESTful APIs.

- **Database:**
  - **MongoDB Atlas** – Cloud-based NoSQL database for storing user data, room details, bookings, and more.
  
- **Authentication:**
  - **JWT (JSON Web Tokens)** – Used for secure user authentication and maintaining user sessions.

- **Other:**
  - **Axios** – For making HTTP requests from the frontend.
  - **Bcrypt.js** – For hashing passwords securely before saving them to the database.
##Images of the Website:
![image](https://github.com/user-attachments/assets/c923880b-966e-482c-b801-3e63df73ce17)
![image](https://github.com/user-attachments/assets/f9bcde9b-fa84-4629-94f7-4835c2047ca9)
![image](https://github.com/user-attachments/assets/be28b80f-8216-4493-b502-81aacbad40b3)
![image](https://github.com/user-attachments/assets/fba72e5f-08da-41ba-9461-3d7de292da0a)
![image](https://github.com/user-attachments/assets/f7062a8b-5960-4314-bbbb-b4e77f2a1c48)
![image](https://github.com/user-attachments/assets/267ab25e-3b4c-4ada-b056-47fbcf03cd9e)
![image](https://github.com/user-attachments/assets/c349928a-c64e-4fae-aa1b-20314c4a7454)








## OOP Integration

The website follows Object-Oriented Programming (OOP) principles to create a structured and maintainable codebase. Here’s how we’ve integrated OOP concepts:

- **Classes and Objects:**
  - **User Class**: Represents the user with properties such as name, email, and password. It also includes methods for updating user profile and handling bookings.
  - **Booking Class**: Handles booking-related data such as room type, user ID, booking dates, and booking status.
  - **Room Class**: Defines properties for different room types, such as room number, type, amenities, and availability.
  
- **Inheritance:**
  - The `Admin` class inherits from the `User` class, but with additional permissions for managing rooms and bookings, ensuring code reuse and modularity.
  
- **Encapsulation:**
  - Sensitive data such as passwords and personal details are encapsulated within classes. Public methods are provided to access and update user data in a controlled way.
  
- **Polymorphism:**
  - The system can handle various types of bookings, such as **Room Bookings** and **Service Bookings**. These bookings share common methods (e.g., confirming a booking) but implement different functionalities, ensuring code reusability and flexibility.

## Installation

To get started with the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ejust-hotel-booking.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ejust-hotel-booking
   ```

3. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

5. Set up MongoDB Atlas and configure your database connection in the backend code.

6. Run the application:
   - Start the backend:
     ```bash
     npm run dev
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

7. The website should now be accessible at `http://localhost:3000`.

## API Endpoints

### Authentication
- **POST /api/register** – Register a new user.
- **POST /api/login** – Log in a user and receive a JWT token.
- **POST /api/logout** – Log out the current user.

### User Profile
- **GET /api/user** – Get the details of the logged-in user.


### Booking
- **POST /api/bookings** – Create a new booking (room, food bundle, etc.).
- **GET /api/bookings** – Get all bookings for the logged-in user.
- **DELETE /api/bookings/:id** – Cancel a booking.

### Admin
- **GET /api/admin/bookings** – Get a list of all bookings for admin.
- **PUT /api/admin/rooms** – Add, update, or remove rooms from availability.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
