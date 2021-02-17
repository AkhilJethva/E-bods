import React from 'react'
import {Nav,NavItem,NavLink} from 'reactstrap'

function SignoutLinks() {
    return (
        <Nav navbar>
            <NavItem>
                <NavLink href="/signup">SignUp</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/login">LogIn</NavLink>
            </NavItem>
        </Nav>
    )
}

export default SignoutLinks

