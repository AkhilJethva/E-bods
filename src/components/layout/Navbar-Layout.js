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
    const [flagAdminJump, setflagAdminJump] = useState(null)
    const toggle = () => setIsOpen(!isOpen);
    const {auth} =  props;


    const [Admins, setAdmins] = useState(null)
    console.log("COme BAby")
    useEffect(async() => {
        
                // const markers = [];
                // await firebase.firestore().collection('Admins').get()
                //         .then(querySnapshot => {
                //         querySnapshot.docs.forEach(doc => {
                //         markers.push(doc.data());
                //         });
                //     });
                // console.log("Admins List from Fb",markers)
                // setAdmins(markers)

                var docRef = firebase.firestore().collection(`Admins`).doc(`${auth.email}`);
            
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        // setData(doc.data())
                        setflagAdminJump(doc.data())
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });

                
                

        return () => {
        
        }
    }, [])

    console.log("Bhai Bhai",flagAdminJump)
    if( flagAdminJump !== null && flagAdminJump.Value == 0){
        console.log(flagAdminJump.value)
        return <Redirect  to="/adminpanel"/>
    }
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
    console.log(state);
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(NavbarLayout)
