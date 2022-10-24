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
          </div>
        </div>

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
      </div>
    </nav>
  )
}
