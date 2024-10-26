import './App.css';
import StudentView from "./components/StudentView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Button} from "reactstrap";
import AddStudents from "./components/AddStudents";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>

                <Routes>
                    <Route path="/student" element={<StudentView/>}/>
                </Routes>

                <Routes>
                    <Route path="/add-student" element={<AddStudents/>}/>
                </Routes>

                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
