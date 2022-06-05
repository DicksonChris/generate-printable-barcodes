import { useState } from "react"
import { Nav, Navbar, NavbarToggler, Collapse, NavItem } from "reactstrap"
import { NavLink } from "react-router-dom"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <Navbar dark sticky='top' expand='md'>
                <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
                <Collapse isOpen={menuOpen} navbar className='justify-content-around'>
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
    )
}

export default Header
