import { useEffect, useState } from 'react'
import '../CSS/lock.css'
import moment from 'moment'
import { retrieveAllLocksApi } from '../Api/apiService'
import {Link} from 'react-router-dom'


export default function Locks(){
    const [locks, setLocks] = useState([])
    useEffect(() => refreshLcoks(), []) 

    function refreshLcoks() {
        
        retrieveAllLocksApi()
        .then(response => {
            setLocks(response.data)
            console.log(response.data)
        }).catch(error => console.log(error))}

    return(<>
        <div>
            <Link to="/CreateLock" className="but btn m-5">Create Lock</Link>
            <Link to="https://en.wikipedia.org/wiki/Love_lock" className="but btn m-5">Inspiration for the project</Link>
            <Link to="/FindLock" className='but btn m-5'>Find a lock</Link>
        </div>
        <div className="container">

            {
                locks.map(
                    locks =>(
                        <div className='center'>
                            <div className='lock'key={locks.lockNo}>
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
                )
            }
        </div>
        </>
    )
}