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
          <b>The Wild Oasis</b> is an internal React-based app designed for a
          boutique hotel to manage bookings, cabins, and guest information
          seamlessly.
          <br />
          <u>Note:</u> Please click the "Upload ALL" button on the bottom left
          before using the app.
        </Paragraph>

        <Heading as="h2">Features</Heading>

        <Heading as="h3">Personalized Interface</Heading>
        <List>
          <li>
            <b>Header</b> with user name and avatar.
          </li>
          <li>
            <b>Sidebar Navigation</b> for easy access to app sections.
          </li>
          <li>
            <b>Settings</b> page to adjust app preferences.
          </li>
          <li>
            <b>Dark Mode</b> toggle in the header for comfortable viewing.
          </li>
        </List>

        <Heading as="h3">Dashboard Overview</Heading>
        <List>
          <li>
            <b>Main Dashboard</b> with essential statistics and charts.
          </li>
          <li>
            <b>Today's Activity List</b> for guests checking in and out.
          </li>
          <li>
            Filterable data with visualized charts for insights on:
            <ul>
              <li>Total and extra sales.</li>
              <li>Stay durations.</li>
              <li>Occupancy rate, sales, and booking stats.</li>
            </ul>
          </li>
        </List>

        <Heading as="h3">User Management</Heading>
        <List>
          <li>Restricted access for unauthorized users.</li>
          <li>
            <b>Login</b> for authorized access (use credentials:{" "}
            <code>dummy@email.com / 123123</code>).
          </li>
          <li>Editable user profiles (name, avatar, password).</li>
          <li>
            <b>New User Creation</b> by authorized users.
          </li>
          <li>
            <b>Logout</b> button for easy session management.
          </li>
        </List>

        <Heading as="h3">Bookings Management</Heading>
        <List>
          <li>List and manage all bookings.</li>
          <li>
            <b>Check-in</b> page for confirming bookings and adding extras
            (e.g., breakfast).
          </li>
          <li>
            <b>Check-out</b> option accessible in the main list and individual
            bookings.
          </li>
          <li>
            <b>Delete Booking</b> option from the list or specific booking page.
          </li>
          <li>Sort and filter bookings data for easy access.</li>
        </List>

        <Heading as="h3">Cabin Management</Heading>
        <List>
          <li>View, add, edit, and delete cabins.</li>
          <li>
            <b>Custom Image Upload</b> for each cabin.
          </li>
          <li>Cabin data can be sorted and filtered for optimal navigation.</li>
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
