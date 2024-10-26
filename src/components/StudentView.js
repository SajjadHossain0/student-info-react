import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table} from 'reactstrap';
import { CiMenuKebab } from "react-icons/ci";
import PropTypes from "prop-types";
import {Students} from "../StudentAPI";



export default function StudentView({ direction, ...args }) {

/*
    const studentData = [
        {
            "id": 2,
            "name": "Md. Sajjad Hossain",
            "email": "sajjad@gmail.com",
            "age": 22
        },
        {
            "id": 6,
            "name": "Sajjad Hossain",
            "email": "sajjad@gmail.com",
            "age": 22
        },
        {
            "id": 7,
            "name": "Sajjad Hossain",
            "email": "sajjad@gmail.com",
            "age": 22
        },
        {
            "id": 8,
            "name": "Sajjad Hossain",
            "email": "sajjad@gmail.com",
            "age": 22
        }
    ]
*/

    const [students, setStudents] = useState([]);

    useEffect(() => {
        Students()
            .then((students) => {
            setStudents(students.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);


    return (
        <div className="container">
            <div align="right"><Button className="info"><a style={{textDecoration:"none",color:"white"}} href="/add-student">Add Students</a></Button></div>
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
                {students.map((student,index) =>
                    <tr key={student.id}>
                        <td>{index+1}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>
                            <Button style={{marginRight: 5}} color="info">
                                Edit
                            </Button>
                            <Button style={{marginLeft: 5}} color="danger">
                                Delete
                            </Button>
                        </td>
                    </tr>
                )}
            </tbody>



        </Table>
</div>
)
}
StudentView.propTypes = {
    direction: PropTypes.string,
};