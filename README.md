# The Wild Oasis

Internal React-app for the boutique hotel to manage bookings, cabins and guests

## Features

- Login page (the app is not accessible without logging in (dummy@email.com / 123123));
- Sidebar Navigation;
- All lists can be Filtered and Sorted;
- Settings page where the app can be adjusted;

### Bookings

- List of all recorded bookings;
- Booking page with all the details;
- Check-in page where the booking can be confirmed and checked in (+also Breakfast can be added for additional price);
- Check-out option from the main list and Booking page;
- Booking can be deleted from the Bookings list or Booking page;

### Cabins

- List of all available cabins;
- New cabins can be added to the list;
- Existing cabins can be duplicated, edited or deleted entirely;
- Custom images can be uploaded while adding/editing a Cabin;

## Details

- Routes are handled with React Router library;
- Styles are handled with Styled Components;
- State management is handled by React Query;
- Adding/modifying/deleting cabins and bookings changes the remote state;
- Database is stored at Supabase service;
- Form handled and validated with React Hook Form;
- Data lists are divided and prefetched by React Query library;
- Add/Edit/Delete Cabin form is built as a Modal using Compound Component Pattern;

## Live version

https://vsbron-course-react2024-wild-oasis.netlify.app
