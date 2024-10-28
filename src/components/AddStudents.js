import React, {useEffect, useState} from 'react';
import {Button, Card, Form, FormGroup, Input, Label} from "reactstrap";
import axios, {post} from "axios";
import BASE_URL from "../StudentAPI";
import {Bounce, toast, ToastContainer} from "react-toastify";

function handleForm() {

}

export default function AddStudents(props) {

    const notify = () => toast.success('Student Added successfully.', {
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

    const [addStudent, setAddStudent] = useState([]);

    const postStudentData=(data) =>{
        axios.post(`${BASE_URL}/save`, data)
            .then(response => {
                    console.log(response);
                    notify();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    const handleForm = (e) => {
        e.preventDefault();
        console.log(addStudent);
        postStudentData(addStudent);

    };

    useEffect(() => {
        document.title = 'Add Students';
        //postStudentData(addStudent);
    }, []);
    return (
        <div className="container">
            <h1 align="center">Add new Student</h1>
            <Card>
                <div style={{padding:20}} className="container">
                    <Form onSubmit={handleForm}>
                        <FormGroup>
                            <Label for="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Full name..."
                                type="text"
                                required
                                onChange={(e) => setAddStudent({ ...addStudent, name: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="example@domain.com..."
                                type="email"
                                required
                                onChange={(e) => setAddStudent({ ...addStudent, email: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="age">Age</Label>
                            <Input
                                id="age"
                                name="age"
                                placeholder="Enter age..."
                                type="number"
                                required
                                onChange={(e) => setAddStudent({ ...addStudent, age: e.target.value })}
                            />
                        </FormGroup>
                        <Button type="submit">Add Student</Button>
                    </Form>
                </div>
            </Card>
            <ToastContainer/>
        </div>
    )
}