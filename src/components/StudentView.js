import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import PropTypes from "prop-types";
import axios from "axios";
import BASE_URL from "../StudentAPI";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function StudentView({direction, ...args}) {

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
    // toastify
    const notify = (message) => toast.success(message, {
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

    // modal
    const [editModal, setEditModal] = useState(false);
    const toggle = () => {
        setEditModal(!editModal);
        if (editModal) {
            setSelectedStudent({id: "", name: "", email: "", age: ""});  // Reset student data on close
            setEditModal(false);  // Reset edit mode
        }
    };

    // interact with api
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
                notify("Deleted Successfully");
            })
            .catch(error => {
                console.log(error);
            });
    }

    const [selectedStudent, setSelectedStudent] = useState({id: "", name: "", email: "", age: ""});
    const openEditModal = (student) => {
        setSelectedStudent(student);
        setEditModal(true);
        toggle();
    }
    const handleForm = (e) => {
        e.preventDefault();

        if (editModal) {
            axios.put(`${BASE_URL}/update/${selectedStudent.id}`, selectedStudent)
                .then(response => {
                    setStudents(students.map(student =>
                        student.id === selectedStudent.id ? selectedStudent : student
                    ));
                    notify("Updated!!")
                    toggle();
                }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        document.title = "Student View";
        getAllStudents();
    }, []);


    return (
        <div className="container">
            <div align="right"><Button className="info"><a style={{textDecoration: "none", color: "white"}}
                                                           href="/add-student">Add Students</a></Button></div>
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
                {students.map((student, index) => (
                    <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>
                            <Button style={{marginRight: 5}} color="info"
                                    onClick={() => {
                                        openEditModal(student);
                                    }}>Edit</Button>

                            <Button style={{marginLeft: 5}} color="danger"
                                    onClick={() => deleteStudent(student.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </Table>

            <ToastContainer/>
            <Modal isOpen={editModal} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>{editModal ? "Edit Student" : "Add Student"}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleForm}>
                        <FormGroup>
                            <Label for="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Full name..."
                                type="text"
                                value={selectedStudent.name}
                                onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="example@domain.com..."
                                type="email"
                                value={selectedStudent.email}
                                onChange={(e) => setSelectedStudent({...selectedStudent, email: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="age">Age</Label>
                            <Input
                                id="age"
                                name="age"
                                placeholder="Enter age..."
                                type="number"
                                value={selectedStudent.age}
                                onChange={(e) => setSelectedStudent({...selectedStudent, age: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <div align="center">
                            <Button type="submit">{editModal ? "Update Student" : "Add Student"}</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>

        </div>
    )
}
StudentView.propTypes = {
    direction: PropTypes.string,
};