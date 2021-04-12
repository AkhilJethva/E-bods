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


function App(props) {
  const {auth} = props 
  console.log("in app",auth)
  return (
    <Router>
        <div className="App">
          <NavbarLayout />
          <Switch>
            <PublicRoute exact path="/login" component={SignIn} />
            <PublicRoute exact path="/donate" component={Donate} />
            <PublicRoute exact path="/signup" component={SignUp} />
            {/* <PublicRoute exact path="/home" component={Home} /> */}
            <PublicRoute exact path="/contactus" component={ContactUs} />
            <PublicRoute exact path="/aboutus" component={AboutUs} />
            <PrivateRoute exact path="/home"><Home /></PrivateRoute>
            <PrivateRoute exact path="/"><Home /></PrivateRoute>
            <PublicRoute exact path="/userRegister" component={UserRegister} />
            <PublicRoute exact path="/userhome/:id" component={UserHome}/>
            <PublicRoute exact path="/donate/:id" component={RequestDetail}/>
            <PublicRoute exact path="/userlogin" component={UserLogin}/>
            <PublicRoute exact path="/admin/hospitalhome" component={HospitalHome}/>
            <PublicRoute exact path="/adminpanel" component={AdminPanel} />
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
