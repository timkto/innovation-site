import React, { useContext, useMemo, useState } from 'react';
import { default as BootstrapNav } from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../Auth/AuthProvider';
import { IAuth } from '../../interfaces/IAuth';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../enums/RouterPath';
import UpdatePageVisited from '../../graphql/UpdatePageVisited';

const Navbar = () => {
  const auth: IAuth = useContext(AuthContext);
  const { updatePageVisited } = UpdatePageVisited();
  useState(() => updatePageVisited());

  const linkStyles = {
    color: '#E87722',
    fontFamily: 'FWDCircularWeb Medium',
    fontSize: '18px',
    textDecoration: 'none',
    marginRight: '2em',
  };

  return (
    <React.Fragment>
      <BootstrapNav bg='white' expand='sm'>
        <Container fluid>
          <BootstrapNav.Brand href='#'>
            <img
              alt='Logo for FWD Innovation'
              src='https://d35y6yt0mxh4p7.cloudfront.net/icons/FWDLogo.png'
              style={{ height: '90px' }}
            />
          </BootstrapNav.Brand>
          <BootstrapNav.Toggle aria-controls='navbar-toggle' />
          <BootstrapNav.Collapse id='navbar-toggle'>
            <Link to={RouterPath.Springboard} style={linkStyles}>
              Springboard
            </Link>
            {/* <Link to={RouterPath.Home} style={linkStyles}>
              Innovation Team
            </Link>
            <Link to={RouterPath.Home} style={linkStyles}>
              About
            </Link>
            <Link to={RouterPath.Home} style={linkStyles}>
              Ignite Innovation
            </Link>
            <Link to={RouterPath.Home} style={linkStyles}>
              Champions & Community
            </Link> */}
            <Link to={RouterPath.Initiative} style={linkStyles}>
              Initiatives
            </Link>
            <Link to={RouterPath.InitiativeAdd} style={linkStyles}>
              Initiative
            </Link>
            <Link to={RouterPath.Topic} style={linkStyles}>
              Ideas
            </Link>
            <Link to={RouterPath.Reports} style={linkStyles}>
              Reports
            </Link>
            <div style={{ flex: '1 1 auto' }}></div>
            {!auth.isReady && (
              <Button
                className='m-1 me-4 btn-sm'
                variant='primary'
                disabled
                onClick={() => auth.loginWithRedirect()}>
                Loading
              </Button>
            )}
            {auth.isReady && !auth.isAuthenticated && (
              <Button className='m-1 me-4 btn-sm' variant='primary' onClick={() => auth.loginWithRedirect()}>
                Login
              </Button>
            )}
            {auth.isReady && auth.isAuthenticated && (
              <Button className='m-1 me-4 btn-sm' variant='danger' onClick={() => auth.logout()}>
                Logout
              </Button>
            )}
          </BootstrapNav.Collapse>
        </Container>
      </BootstrapNav>
    </React.Fragment>
  );
};

export default Navbar;
