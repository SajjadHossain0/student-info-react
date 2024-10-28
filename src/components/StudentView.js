import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Table} from 'reactstrap';
import PropTypes from "prop-types";
import axios from "axios";
import BASE_URL from "../StudentAPI";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

/*    const [students, setStudents] = useState([]);

    //
    useEffect(() => {
        document.title = "Student View";
        Students()
            .then((students) => {
            setStudents(students.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);*/
    const notify = () => toast.success('Delete successfully.', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    const [students, setStudents] = useState([]);

    const getAllStudents = () => {
        axios.get(`${BASE_URL}`)
            .then(response => {
                console.log(response);
                setStudents(response.data);
            },
                (error) => {
                console.log(error);
                }
            );
    }

    const deleteStudent = (id) => {
        axios.delete(`${BASE_URL}/delete/${id}`)
            .then(() => {
                setStudents(students.filter(student => student.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        document.title = "Student View";
        getAllStudents();
    }, []);


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
                {students.map((student,index)=> (
                    <tr key={student.id}>
                        <td>{index+1}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>
                            <Button style={{marginRight: 5}} color="info">
                                Edit
                            </Button>
                            <Button style={{marginLeft: 5}} color="danger"
                            onClick={() => {
                                deleteStudent(student.id)
                                notify()
                            }}>Delete</Button>
                        </td>
                    </tr>
                ))}

                </tbody>


            </Table>
            <ToastContainer/>
        </div>
    )
}
StudentView.propTypes = {
    direction: PropTypes.string,
};