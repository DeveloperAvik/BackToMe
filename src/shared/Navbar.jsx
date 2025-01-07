import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import AuthContext from "../context/AuthContext"

function Navbar() {

    const { user, singOutUser } = useContext(AuthContext)

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allItems">Lost & Found Items</NavLink></li>
        <li><NavLink to="/allRecoverd">My Recoverd</NavLink></li>
        <li><NavLink to="/myItems">My Items</NavLink></li>
        <li><NavLink to="/addItems">Add Items</NavLink></li>
    </>

    const handelSingOut = () => {
        singOutUser()
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Back2Me</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    {
                        user ? <>
                            <Link onClick={handelSingOut} to="/singin"><button className="btn">Log Out</button></Link>
                        </> : <>
                            <Link to="/register">Register</Link>
                            <Link to="/singin"><button className="btn">Sing In</button></Link>
                        </>
                    }

                </div>
            </div>
        </>
    )
}

export default Navbar