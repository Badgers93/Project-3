import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div
      style={{backgroundColor: 'black', width:'100%'}}
       className="flex-row justify-space-between-lg justify-center align-center p-4">
        <div>
          <Link className="text-light" to="/">
            <h1 style={{color:'white'} } className="m-5">The Recipe Forum</h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link style={{backgroundColor: 'black'}} className="btn btn-md btn-info m-2" to="/me">
                {Auth.getProfile().data.username}
              </Link>
              <button style={{backgroundColor: 'black'}} className="btn btn-md btn-info m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link style={{backgroundColor: 'black'}} className="btn btn-md btn-info btn-info m-2" to="/login">
                Login
              </Link>
              <Link style={{backgroundColor: 'black'}} className="btn btn-md btn-info m-2" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;