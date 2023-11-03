import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from "react"
import { createLockApi } from "../Api/apiService"
import "../CSS/CreateLock.css"
import { useNavigate, Link } from "react-router-dom";



export default function CreateLock(){
    const [firstInitials, setFirstInitials] = useState('')
    const [secondInitials, setSecondInitials] = useState('')   
    const navigate = useNavigate(); 

    function onSubmit(values){
        console.log(values)
        const lock = {
            firstInitials:values.firstInitials,
            secondInitials:values.secondInitials
        }
        createLockApi(lock).then(response => {
            
        })
        .catch(error => console.log(error))
        navigate("/")
    }

    function validate(values) {
        let errors = {}
        if(values.firstInitials.length>3 || values.firstInitials <= 1) {
            errors.firstInitials = 'Please enter two or three initials for the first initials'
        }

        if(values.secondInitials.length>3 || values.secondInitials <= 1) {
            errors.secondInitials = 'Please enter two or three initials for the second initials'
        }
        console.log(errors)
        return errors
    }

    return(
        <div className="container">
        <Link to ="/" className="btn but m-2">Return to Locks</Link>
        <Formik initialValues={{firstInitials, secondInitials}}
                enableReinitialize = {true}
                onSubmit={onSubmit}
                validate = {validate}
                validateOnChange = {false}
                validateOnBlur = {false}
>
            <Form>
            <ErrorMessage 
                name="firstInitials"
                component="div"
                className = "alert alert-warning"
            />
                            
            <ErrorMessage 
                name="secondInitials"
                component="div"
                className = "alert alert-warning"
            />
                <div>Please enter the first initials</div>
                <Field type="text" className="form-control" name="firstInitials"></Field>
                <div>Please Enter second initials</div>
                <Field type="text" className="form-control" name="secondInitials"></Field>
                <button type="submit" className="btn but mt-2">Submit</button>
            </Form>

            </Formik>
        </div>
    )
}

