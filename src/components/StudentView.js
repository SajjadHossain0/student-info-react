import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table} from 'reactstrap';
import { CiMenuKebab } from "react-icons/ci";
import PropTypes from "prop-types";



export default function StudentView({ direction, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="container">
            <Table responsive>
                <thead>
                <tr>
                    <th>S/L</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">
                        1
                    </th>
                    <td>
                        Table cell
                    </td>
                    <td>
                        Table cell
                    </td>
                    <td>
                        Table cell
                    </td>
                    <td>
                        <Button style={{marginRight:5}} color="info">
                            Edit
                        </Button>
                        <Button style={{marginLeft:5}} color="danger">
                            Delete
                        </Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}
StudentView.propTypes = {
    direction: PropTypes.string,
};