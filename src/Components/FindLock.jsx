import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getLockApi, getNumLocks } from '../Api/apiService';



export default function FindLock() {
    const [lockNumber, setLockNumber] = useState(0)
    const [locks, setLocks] = useState({})
    const [lockExists, setLockExists] = useState(false)
    const [numLocks, setNumLocks] = useState(0)
    useEffect(() => NumLocks())

    function NumLocks() {
        getNumLocks()
            .then(response => {
                setNumLocks(response.data)
            })
            .catch(error => console.log(error))
    }

    function retrieveLock(lockNumber) {
        NumLocks()
        getLockApi(lockNumber.lockNumber)
            .then(response => {
                setLocks(response.data)
                if (response.data.lockNumber != null) {
                    setLockExists(true)
                }
                else {
                    setLockExists(false)
                }
            })
            .catch(error => console.log(error))
    }

    function validate(values) {

        let errors = {}
        if (isNaN(values.lockNumber)) {
            errors.lockNumber = 'Please enter a number'
        }
        if (numLocks < values.lockNumber || values.lockNumber <= 0) {
            errors.lockNumber = 'No lock exists for that number'
        }
        return errors
    }

    function showLock() {
        if (lockExists) {
            return (
                <div className='center'>
                    <div className='lock' key={locks.lockNo}>
                        <div className='initials m-1'>
                            <div>
                                {locks.firstInitials}
                            </div>
                            <div className='initial'>
                                {locks.secondInitials}
                            </div>
                        </div>
                        <div>
                            Created
                            <div>{locks.dateCreated}</div>
                        </div>

                        <div className='lockno'>
                            Lock # {locks.lockNumber}
                        </div>
                    </div>
                </div>
            )
        }


    }


    return (
        <div className="container">
            <Link to="/" className="btn but m-2">Return to Locks</Link>
            <Formik initialValues={{ lockNumber }}
                enableReinitialize={true}
                onSubmit={retrieveLock}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                <Form>
                    <ErrorMessage
                        name="lockNumber"
                        component="div"
                        className="alert alert-warning"
                    />

                    <div>Please enter the lock number</div>
                    <Field type='integer' className="form-control smallbox" name="lockNumber"></Field>
                    <button type="submit" className="btn but mt-2">Submit</button>
                </Form>
            </Formik>

            {lockExists && showLock()}
        </div>
    )
}