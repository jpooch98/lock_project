import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CreateLock from './CreateLock'
import Locks from './Locks'
import FindLock from './FindLock'

export default function LockApp(){


    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Locks></Locks>}></Route>
                    <Route path='/CreateLock' element={< CreateLock />}></Route>
                    <Route path='/FindLock' element={<FindLock/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}