import React,{useState,useEffect} from 'react'
import {Nav,NavItem,NavLink} from 'reactstrap'
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";
import { Redirect } from 'react-router-dom';

import firebase from '../../config/fbconfig'

function SignInLinks(props) {
    const {auth} =  props;
    const [flagAdminJump, setflagAdminJump] = useState(null)
    const logout = () => {
        props.signOut()
    }

    useEffect(async() => {
    
        var docRef = firebase.firestore().collection(`Admins`).doc(`${auth.email}`);
    
        docRef.get().then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
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
    }, [auth])

    
    if(auth.uid  && flagAdminJump !== null && flagAdminJump.Value == 0)
    {
        return (
            <Nav navbar>
                <NavItem>
                    <NavLink href="/adminpanel">AdminPanel</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink  onClick={logout}>Log Out</NavLink>
                </NavItem>
            </Nav>
        )
    }

    return (
        <Nav navbar>
            <NavItem>
                <NavLink href="/donate">Donate</NavLink>
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
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInLinks)
