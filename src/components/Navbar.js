import React from 'react'
import book_logo from '../images/book_logo.png'
import coding_class from '../images/coding_class.png'
import LogIn from './LogIn'
import SignUp from './SignUp'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* <-- Collapsible wrapper --> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
        {/* <!-- Collapsible wrapper --> */}

        {/* <!-- Right elements --> */}
        <div className='d-flex align-items-center'>
          <LogIn />
          <SignUp />
        </div>
        {/* <!-- Right elements --> */}
      </div>
      {/* <!-- Container wrapper --> */}
    </nav>
  )
}
