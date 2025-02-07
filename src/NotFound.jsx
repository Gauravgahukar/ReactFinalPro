import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound(){

    const navigate= useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            navigate("/home")
        },10000)

    }, [navigate]);

    return(
        <>
        <h1 className="not-found">404 Page Not Found!<img src="errort.jpg" alt=""/></h1>
        </>
    )
}

export default NotFound;