import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";


export default function Header(args) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar fixed="top" color="light" light expand="md" className="App-navbar">
                <NavbarBrand className="nav-brand" href="/">Student info</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" href="/student">view students</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" href="/add-student">Add students</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}