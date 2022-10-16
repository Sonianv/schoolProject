import React from 'react'
import book_logo from '../images/book_logo.png'
import coding_class from '../images/coding_class.png'
import LogIn from './LogIn'
import SignUp from './SignUp'
import LogOut from './LogOut'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { currentUser, logOut } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div>
          <a href="#">
            <img
              src={book_logo}
              height="80"
              alt="Coding class LOGO"
              loading="lazy"
            />
            <img
              src={coding_class}
              height="80"
              alt="Coding class"
              loading="lazy"
            />
          </a>
          <div>
            {/* <!-- Left links --> */}
            {/* <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Projects</a>
              </li>
            </ul> */}
            {/* <!-- Left links --> */}
          </div>
        </div>

        {/* <!-- Right elements --> */}
        <div className='d-flex align-items-center'>
          {currentUser ? (
            <>
              <div className='me-3 mx-2'>
                {currentUser.email}
              </div>
              <div>
                <LogOut />
              </div>
            </>
          ) : (
            <>
              <LogIn />
              <SignUp />
            </>
          )}
        </div>
        {/* <!-- Right elements --> */}
      </div>
      {/* <!-- Container wrapper --> */}
    </nav>
  )
}
