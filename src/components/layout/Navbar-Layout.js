import React from 'react'
import { useState,useEffect } from 'react'
import {  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink } from 'reactstrap';
import  './Navbar.css'
import SignInLinks from './SignInLinks';
import SignoutLinks from './SignoutLinks';
import { connect } from 'react-redux'
import firebase from '../../config/fbconfig'
import { Redirect } from 'react-router';

function NavbarLayout(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const {auth} =  props;


    const [Admins, setAdmins] = useState(null)
    
    return (
        <div className="navbar fluid">
            <Navbar dark  expand="md">
                <NavbarBrand href="/home">E-BODS</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/aboutus">About Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contactus">Contact Us</NavLink>
                    </NavItem>

                </Nav>

                {auth.uid? <SignInLinks /> : <SignoutLinks /> }
                
                
                </Collapse>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(NavbarLayout)
