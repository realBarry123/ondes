import { Link } from "react-router-dom";
import { program, acknowledgements } from "../programNote";

const Program = () => {
    return ( 
        <div className="program" align="center">
            <h1 className="program-title"> Program Note </h1>
            <div className="program-text-container" align="left">
                {program.map((line) => {
                    return (
                        <p>{line}</p>
                    )
                })}
                <hr></hr>
                <p>{acknowledgements}</p>
                <p align="right">Barry Yu, April 28th 2025</p>
            </div>
            <div className="link-container">
                <Link className="link" to={{pathname: "/"}}>back</Link>
            </div>
        </div>
    );
}

export default Program;