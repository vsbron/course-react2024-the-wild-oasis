# The Wild Oasis [Server]

**The Wild Oasis** is an internal React-based app designed for a boutique hotel to manage bookings, cabins, and guest information seamlessly.

> **Note:** Please click the "Upload ALL" button on the bottom left before using the app.

## Features

### Personalized Interface

- **Header** with user name and avatar.
- **Sidebar Navigation** for easy access to app sections.
- **Settings** page to adjust app preferences.
- **Dark Mode** toggle in the header for comfortable viewing.

### Dashboard Overview

- **Main Dashboard** with essential statistics and charts.
- **Today's Activity List** for guests checking in and out.
- Filterable data with visualized charts for insights on:
  - Total and extra sales.
  - Stay durations.
  - Occupancy rate, sales, and booking stats.

### User Management

- Restricted access for unauthorized users.
- **Login** for authorized access (use credentials: `dummy@email.com / 123123`).
- Editable user profiles (name, avatar, password).
- **New User Creation** by authorized users.
- **Logout** button for easy session management.

### Bookings Management

- List and manage all bookings.
- **Check-in** page for confirming bookings and adding extras (e.g., breakfast).
- **Check-out** option accessible in the main list and individual bookings.
- **Delete Booking** option from the list or specific booking page.
- Sort and filter bookings data for easy access.

### Cabin Management

- View, add, edit, and delete cabins.
- **Custom Image Upload** for each cabin.
- Cabin data can be sorted and filtered for optimal navigation.

## Technical Overview

- **Framework**: Built with **React** and partial **TypeScript** support for type safety.
- **Routing**: Managed with **React Router**.
- **Styling**: **Styled Components** for maintainable, dynamic styles.
- **State Management**: Powered by **React Query** for remote data handling.
- **Database**: Hosted on **Supabase**.
- **Forms**: Controlled and validated with **React Hook Form**.
- **Optimized Lists**: Paginated and pre-fetched lists through React Query.
- **Error Handling**: Implemented with **React Error Boundary**.
- **Theme Mode**: Initial load matches user OS theme (Light/Dark).

## Additional Details

- **Cabin Management UI**: Built as a modal using the Compound Component pattern for flexibility and reusability.

## Live version

https://vsbron-course-react2024-wild-oasis.vercel.app
