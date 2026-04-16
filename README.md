AutoFleet – Vehicle and Service Management App

AutoFleet is a frontend web application built as a test assignment. It allows users to log in, manage vehicles, track service records, and browse a public list of vehicles with filtering and pagination.

The project was built with a focus on clean structure, good user experience, and practical frontend engineering practices.

Live Features

After logging in, users can access a dashboard where they can manage their vehicle data and service history. There is also a public page where anyone can browse vehicles without needing authentication.

Core Functionality
Authentication

Users can log in using a mock authentication system. Once logged in, access to private routes is protected. Logging out clears the session and redirects back to the login page.

Vehicle Management

Users can add new vehicles by providing make, model, and year. They can also edit or delete existing vehicles. Each vehicle is displayed in a structured table for clarity and ease of management.

Service Records

Each vehicle can have service records attached to it. Users can add service details such as description, price in euros, and service type (regular or repair). Service records can also be edited or deleted.

Public Vehicle Listing

A separate public page displays all vehicles without requiring login. This page includes search functionality, filtering by year, pagination, and a responsive grid layout for better viewing across devices.

UX Improvements

Several improvements were made to enhance user experience and make the app feel more professional.

Loading states were added using skeleton screens so users see a visual indicator while data is being fetched.

Error states were also implemented to handle API or data issues gracefully.

Empty states were designed to guide users when no data is available instead of showing blank screens.

Toast notifications were added to provide instant feedback when actions such as filtering, login, or updates occur.

Form Validation

Form validation was implemented using React Hook Form and Zod. This ensures that all vehicle inputs are properly validated before submission, improving data quality and preventing invalid entries.

State Management

Zustand was used for global state management. It handles authentication state, vehicle data, and service records in a simple and scalable way without unnecessary complexity.

Data Fetching

React Query (TanStack Query) was used for handling API calls. It manages loading states, caching, and error handling for the public vehicle list.

Project Structure

The project is organized in a clear and scalable way:

src contains all application code

api handles data fetching logic

components contains reusable UI components

pages contains all route pages like Login, Dashboard, Vehicles, and Public Vehicles

store handles global state using Zustand

utils contains helper functions such as filtering logic and notifications

validation contains Zod schemas for form validation

UI and Design Approach

The interface follows a simple SaaS-style layout with card-based navigation, consistent spacing, and responsive design.

The dashboard uses a grid layout for quick access to core features, while other pages maintain a clean and structured layout for readability.

Technologies Used

React with Vite
React Router
Zustand
React Hook Form
Zod
TanStack Query
Tailwind CSS
React Hot Toast


This project was built with attention to both functionality and user experience. It demonstrates component-based architecture, state management, form validation, and modern frontend patterns commonly used in production applications.
