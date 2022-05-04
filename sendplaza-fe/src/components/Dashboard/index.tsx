import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import {
  LabelsContainer,
  OpenOrdersContainer,
} from "pages/App/containers/dashboard";

function Dashboard({ logoutAction, selectedTab, setReduxKey }) {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto" defaultActiveKey="open-orders">
          <Nav.Link
            eventKey="open-orders"
            onClick={() => setReduxKey("selectedTab", "open-orders")}
          >
            Open Orders
          </Nav.Link>
          <Nav.Link
            eventKey="labels"
            onClick={() => setReduxKey("selectedTab", "labels")}
          >
            Labels
          </Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-light" onClick={() => logoutAction()}>
            Logout
          </Button>
        </Form>
      </Navbar>
      <Container fluid className="pt-3">
        {selectedTab === "open-orders" ? (
          <OpenOrdersContainer />
        ) : (
          <LabelsContainer />
        )}
      </Container>
    </>
  );
}

export default Dashboard;
