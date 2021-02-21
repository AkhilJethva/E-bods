import React from 'react'
import { Jumbotron, UncontrolledCarousel } from "reactstrap";
import s1 from '../../Images/Slider/s1.jpg'
import s2 from '../../Images/Slider/s2.jpg'
import s3 from '../../Images/Slider/s3.jpg'
import './Home.css'

function Home() {

    const items = [
        {
          src: s1,
          altText: 'Slide 1',
          caption: 'Slide 1',
          header: 'Slide 1 Header',
          key: '1'
        },
        {
          src: s2,
          altText: 'Slide 2',
          caption: 'Slide 2',
          header: 'Slide 2 Header',
          key: '2'
        },
        {
          src: s3,
          altText: 'Slide 3',
          caption: 'Slide 3',
          header: 'Slide 3 Header',
          key: '3'
        }
      ];




    return (
        <div className="home">
            <Jumbotron>
                <h1 className="display-4">Hello, Welcome to E-BODS! <img src="https://img.icons8.com/nolan/64/ethereum.png" alt="ether"/></h1>
                <p className="lead"> The Futuristic and Digital Secured Donation System. </p>
            </Jumbotron>
            <div  className="home__slider">
                <UncontrolledCarousel items={items}></UncontrolledCarousel>
            </div>
            <div>
                sdfgusdjb







                dfd
                for(let sdf
                dsf
                sd
                
                
                <br></br>
                <br></br>
                
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                sfdf
                
                fsf
                 in object) {
                    
                }
                
            </div>

        </div>
    )
}

export default Home
