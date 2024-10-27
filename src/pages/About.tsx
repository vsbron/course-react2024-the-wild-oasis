import { Link } from "react-router-dom";

import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const List = styled.ul`
  padding-left: 20px;
  list-style-type: disc;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  margin-top: -20px;
  margin-bottom: 20px;
`;
const Copyrights = styled.p`
  font-size: 14px;

  a {
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }
`;

function About() {
  // Returned JSX
  return (
    <>
      <Heading as="h1">About the App</Heading>

      <Row>
        <Paragraph>
          Internal React-app for the boutique hotel to manage bookings, cabins
          and guests.
          <br />- Please, click "Upload ALL" button on the bottom left{" "}
          <u>before</u> using.
        </Paragraph>

        <Heading as="h2">Features:</Heading>
        <List>
          <li>Header with user's Name and Avatar;</li>
          <li>
            Sidebar Navigation; Settings page where the app can be adjusted;
          </li>
          <li>Dark mode for the app (Can be toggled in Header);</li>
          <li>Main Dashboard page;</li>
          <li>About the App page;</li>
        </List>

        <Heading as="h3">Dashboard:</Heading>
        <List>
          <li>Main dashboard page with stats and charts;</li>
          <li>
            Basic stats for number of bookings, stays, sales and occupancy rate;
          </li>
          <li>
            Today's activity list showing guests that are about to check-in or
            check-out on the current day;
          </li>
          <li>Chart graph for total sales & extra sales;</li>
          <li>Chart pie of Stay durations;</li>
          <li>All the data can be filtered;</li>
        </List>

        <Heading as="h3">Users:</Heading>
        <List>
          <li>App is restricted to the unauthorized users;</li>
          <li>
            Users can log in to the app at Login page (dummy@email.com /
            123123);
          </li>
          <li>
            Users can edit their name, upload a new avatar and update the
            password;
          </li>
          <li>New users can be created by authorized users at Users page;</li>
          <li>
            User can log out from the app using Logout button in the Header;
          </li>
        </List>

        <Heading as="h3">Bookings:</Heading>
        <List>
          <li>List of all recorded bookings;</li>
          <li>Booking page with all the details;</li>
          <li>
            Check-in page where the booking can be confirmed and checked in
            (+also Breakfast can be added for additional price);
          </li>
          <li>Check-out option from the main list and Booking page;</li>
          <li>
            Booking can be deleted from the Bookings list or Booking page;
          </li>
          <li>All the bookings data can be filtered and sorted;</li>
        </List>

        <Heading as="h3">Cabins:</Heading>
        <List>
          <li>List of all available cabins;</li>
          <li>New cabins can be added to the list;</li>
          <li>
            Existing cabins can be duplicated, edited or deleted entirely;
          </li>
          <li>Custom images can be uploaded while adding/editing a Cabin;</li>
          <li>All the cabins data can be filtered and sorted;</li>
        </List>
      </Row>

      <Row>
        <Heading as="h2">Copyrights:</Heading>
        <Copyrights>
          Built by VSBroN as a part of the React online learning course.
          <br />
          This project is available on{" "}
          <Link
            to="https://github.com/vsbron/course-react2024-the-wild-oasis"
            target="_blank"
          >
            GitHub
          </Link>
          .
          <br />
          ©2024. All rights reserved.
        </Copyrights>
      </Row>
    </>
  );
}

export default About;
