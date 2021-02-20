import { BrowserRouter as Router,Switch,} from 'react-router-dom';
import './App.css';
import  SignIn  from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/dashboard/Home';
import Footer from './components/layout/Footer';
import NavbarLayout from './components/layout/Navbar-Layout';
import { PublicRoute } from "react-private-public-route";
import { connect } from "react-redux";
import ContactUs from './components/dashboard/ContactUs';
import PrivateRoute from './helper/PrivateRoute'
import UserRegister from './components/user/UserRegister'


function App(props) {
  const {auth} = props 
  console.log("in app",auth)
  return (
    <Router>
        <div className="App">
          <NavbarLayout />
          <Switch>
            <PublicRoute exact path="/login" component={SignIn} />
            <PublicRoute exact path="/signup" component={SignUp} />
            {/* <PublicRoute exact path="/home" component={Home} /> */}
            <PublicRoute exact path="/contactus" component={ContactUs} />
            <PrivateRoute exact path="/home"><Home /></PrivateRoute>
            <PrivateRoute exact path="/"><Home /></PrivateRoute>
            <PublicRoute exact path="/userRegister" component={UserRegister} />
          </Switch>
          <Footer />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return{
    auth : state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);
