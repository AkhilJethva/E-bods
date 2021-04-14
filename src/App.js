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
import AdminPanel from './components/admin/AdminPanel';
import AboutUs from './components/dashboard/AboutUs';
import UserHome from './components/user/UserHome';
import UserLogin from './components/user/UserLogin';
import HospitalHome from './components/hospitals/HospitalHome';
import Donate from './components/donation/Donate';
import RequestDetail from './components/donation/RequestDetail';
import UserRequestSec from './components/admin/UserRequestSec';


function App(props) {
  const {auth} = props 
  console.log("in app",auth)
  return (
    <Router>
        <div className="App">
          <NavbarLayout />
          <Switch>
            <PublicRoute exact path="/login"  ><SignIn /></PublicRoute>
            {/* <PrivateRoute exact path="/donate" component={Donate} /> */}
            <PublicRoute exact path="/signup" ><SignUp /></PublicRoute>
            {/* <PublicRoute exact path="/home" component={Home} /> */}
            <PublicRoute exact path="/contactus"><ContactUs /></PublicRoute>
            <PublicRoute exact path="/aboutus"  ><AboutUs /></PublicRoute>
            <PublicRoute exact path="/home"><Home /></PublicRoute>
            <PublicRoute exact path="/"><Home /></PublicRoute>
            <PrivateRoute exact path="/userRegister" ><UserRegister /></PrivateRoute>
            <PrivateRoute exact path="/userhome/:id" ><UserHome /></PrivateRoute>
            <PrivateRoute exact path="/donate/:id" ><RequestDetail /></PrivateRoute>
            <PrivateRoute exact path="/userlogin" ><UserLogin /></PrivateRoute>
            <PrivateRoute exact path="/admin/hospitalhome"><HospitalHome /></PrivateRoute>
            <PrivateRoute exact path="/admin/userRequestSec" ><UserRequestSec /></PrivateRoute>
            <PrivateRoute exact path="/adminpanel"> <AdminPanel /></PrivateRoute>
            <PrivateRoute exact path="/donate"><Donate /></PrivateRoute>
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
