import React from 'react'
import {Nav,NavItem,NavLink} from 'reactstrap'
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";

function SignInLinks(props) {


    const logout = () => {
        props.signOut()
    }

    return (
        <Nav navbar>
            <NavItem>
                <NavLink href="/components/">Donate</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/userlogin">User Section</NavLink>
            </NavItem>
            <NavItem>
                <NavLink  onClick={logout}>Log Out</NavLink>
            </NavItem>
        </Nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut : () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(SignInLinks)
