import React, {useEffect} from "react";
import {Button} from "reactstrap";

export default function Home() {
    useEffect(() => {
        document.title = "Student info";
    }, []);
    return (
        <div>
            <h1>Welcome to Student service</h1>

        </div>
    )
}