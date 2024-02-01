# The Wild Oasis

Internal React-app for the boutique hotel to manage bookings, cabins and guests

## Features

- Header with user's Name and Avatar;
- Sidebar Navigation;
- Settings page where the app can be adjusted;
- Dark mode for the app (Can be toggled in Header);
- Main Dashboard page;

### Dashboard

- Main dashboard page with stats and charts;
- Basic stats for number of bookings, stays, sales and occupancy rate;
- Today's activity list showing guests that are about to check-in or check-out on the current day;
- Chart graph for total sales & extra sales;
- Chart pie of Stay durations;
- All the data can be filtered;

### Users

- App is restricted to the unauthorized users;
- Users can log in to the app at Login page (dummy@email.com / 123123);
- Users can edit their name, upload a new avatar and update the password;
- New users can be created by authorized users at Users page;
- User can log out from the app using Logout button in the Header;

### Bookings

- List of all recorded bookings;
- Booking page with all the details;
- Check-in page where the booking can be confirmed and checked in (+also Breakfast can be added for additional price);
- Check-out option from the main list and Booking page;
- Booking can be deleted from the Bookings list or Booking page;
- All the bookings data can be filtered and sorted;

### Cabins

- List of all available cabins;
- New cabins can be added to the list;
- Existing cabins can be duplicated, edited or deleted entirely;
- Custom images can be uploaded while adding/editing a Cabin;
- All the cabins data can be filtered and sorted;

## Details

- Routes are handled with React Router library;
- Styles are handled with Styled Components;
- State management is handled by React Query;
- Adding/modifying/deleting cabins and bookings changes the remote state;
- Database is stored at Supabase service;
- Form handled and validated with React Hook Form;
- Data lists are divided and prefetched by React Query library;
- Add/Edit/Delete Cabin form is built as a Modal using Compound Component Pattern;
- React Error Boundary was added to catch render errors;
- The scheme theme initially loads based on user's OS theme (Light/Dark);

## Live version

https://vsbron-course-react2024-wild-oasis.netlify.app
