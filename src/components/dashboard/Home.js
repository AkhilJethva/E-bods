import React from 'react'
import { Jumbotron, UncontrolledCarousel } from "reactstrap";
import s1 from '../../Images/Slider/s1.jpg'
import s2 from '../../Images/Slider/s2.jpg'
import s3 from '../../Images/Slider/s3.jpg'
import './Home.css'
import Lottie from 'react-lottie';
import A1 from '../../animations/a1.json'

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
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: A1,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };




    return (
        <div className="home">
            <Jumbotron className="home__jumbotron">
                <div>
                <h1 className="display-4">Hello, Welcome to E-BODS! <img src="https://img.icons8.com/nolan/64/ethereum.png" alt="ether"/></h1>
                <p className="lead"> The Futuristic and Digital Secured Donation System. </p>
                </div>
                <div className="home__lotti"><Lottie 
                  options={defaultOptions}
                  height={200}
                  width={200}
                /></div>
            </Jumbotron>
            <div  className="home__slider">
                <UncontrolledCarousel items={items}></UncontrolledCarousel>
            </div>
            <div>
                sdfgusdjb

                {/* <div>
                  <a href="https://firebasestorage.googleapis.com/v0/b/login-4a0ac.appspot.com/o/documents%2FB276F18AdmitCard.pdf?alt=media&token=be882aa0-7a0c-4ef6-b92e-d80093966b0b">helli</a>
                  </div> */}
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
