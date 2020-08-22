import React from "react";
import {Col, Row} from "react-bootstrap";
import "../styles/EmployeeInfo.css";

const employeeRow = (props) => {
  const {picture, firstName, lastName, email, cell} = props;
  const fullName = `${firstName} ${lastName}`;
  return (
    <div>
      <Row className="border-bottom">
        <Col sm lg="2">
          <img src={picture} alt={fullName + "profile"} />
        </Col>
        <Col sm lg="3" className="employeeText">
          <span>{fullName}</span>
        </Col>
        <Col sm lg="4" className="employeeText">
          <span>{email}</span>
        </Col>
        <Col sm lg="3" className="employeeText">
          <span>{cell}</span>
        </Col>
      </Row>
    </div>
  );
};

export default employeeRow;