import React, {Component} from "react";
import {Container, Col, Row} from "react-bootstrap";
import EmployeeInfo from "./EmployeeInfo";
import API from "../utils/API";
import "../styles/DirectoryContainer.css";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSort: "A-Z",
            search: "",
            employees: [], 
            searchResults: [],
        };
    };

    componentDidMount() {
        API.getEmployee().then((res) => {
            const sortedEmployees = this.sortByName(res.results, "A-Z");
            this.setState({employees: sortedEmployees, searchResults: sortedEmployees});
        });
    };

    sortByName(employees, sort) {
        let completed = false;

        while (completed === false) {
            completed = true;

            for (let i = 0; i < employees.length - 1; i++) {
                let current = employees[i];
                let next = employees[i + 1];

                if (current.name.last[0] > next.name.last[0] && sort === "A-Z") {
                    completed = false;
                    let temporary = next;
                    employees[i + 1] = current;
                    employees[i] = temporary;
                } else if (current.name.last[0] < next.name.last[0] && sort === "Z-A") {
                    completed = false;
                    let temporary = next;
                    employees[i + 1] = current;
                    employees[i] = temporary;
                }
            }
        }

        return employees;
    }

    alphabeticalSort = () => {
        if (this.state.currentSort === "A-Z") {
            let AZSort = this.sortByName(this.state.searchResults, "Z-A");
            this.setState({searchResults: AZSort, currentSort: "Z-A"});
        } else if (this.state.currentSort === "Z-A") {
            let ZASort = this.sortByName(this.state.searchResults, "A-Z");
            this.setState({searchResults: ZASort, currentSort: "A-Z"});
        };
    };

    handleQuery = (event) => {
        const search = event.target.value;
        const currentEmployees = [...this.state.employees];
        const filterEmployees = currentEmployees.filter((user) => {
            if (
                user.name.first.includes(search) ||
                user.name.last.includes(search) ||
                user.email.includes(search) ||
                user.cell.includes(search)
            ) {
                return user;
            };
        });
        this.setState({search, searchResults: filterEmployees});
    };

    render() {
        const {searchResults} = this.state;
        return (
            <main>
                <h3 className="searchTitle">Search Employees by Name</h3>
                <Container fluid className="text-center">
                    <input type="text" placeholder="Search Employees" onChange={this.handleQuery} />
                </Container>

                <Container fluid="lg" className="mt-3 border">
                    <Row className="border-bottom">
                        <Col sm md="2">
                            <strong>Picture</strong>
                        </Col>
                        <Col sm md="3">
                            <strong>Name </strong>
                            <em type="button" onClick={this.alphabeticalSort} class="btn btn-sm btn-outline-dark">({this.state.currentSort})</em>
                        </Col>
                        <Col sm md="4">
                            <strong>E-mail</strong>
                        </Col>
                        <Col sm md="3">
                            <strong>Cell Phone</strong>
                        </Col>
                    </Row>
                    {searchResults.map((employee) => (
                        <EmployeeInfo
                            key={employee.cell}
                            picture={employee.picture.thumbnail}
                            firstName={employee.name.first}
                            lastName={employee.name.last}
                            email={employee.email}
                            cell={employee.cell}
                        />
                    ))}
                </Container>
            </main>
        );
    };
};

export default Body;
