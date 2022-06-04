import { useState } from 'react';
import {
    Nav,
    Navbar,
    NavbarToggler,
    Collapse,
    NavItem,
    Row,
    Col,
    Container
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* <Container fluid className='header-container'>
                <Row>
                    <Col>
                        <a href='/'>
                            <img
                                src='/images/header.'
                                alt='Super Simple Static Site'
                                className='img-fluid d-block mx-auto'
                            />
                        </a>
                    </Col>
                </Row>
            </Container> */}
            <Navbar dark sticky='top' expand='md'>
                <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
                <Collapse
                    isOpen={menuOpen}
                    navbar
                    className='justify-content-around'
                >
                    <Nav navbar className='justify-content-center'>
                        <NavItem>
                            <NavLink className='nav-link' to='/'>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/about'>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
};

export default Header;
