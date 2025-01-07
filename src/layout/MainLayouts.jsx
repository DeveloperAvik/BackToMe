import { Outlet } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

function MainLayouts() {
    return (
        <>
            <div className='mt-5'>
                <Navbar></Navbar>
            </div>
            <div className="max-w-7xl mx-auto mt-10">
                <Outlet></Outlet>
            </div>
            <div className='mt-10'>
                <Footer></Footer>
            </div>
        </>
    )
}

export default MainLayouts