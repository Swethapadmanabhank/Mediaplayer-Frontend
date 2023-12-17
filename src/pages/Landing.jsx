import React from 'react';
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';




function Landing(){

    // fuction definition
    // redirect from one page to another page we can use useNavigate hook
    const navigate=useNavigate()

    const handleNavigate=()=>{

       navigate('/home')
    }


    return(
        <div>
            <Row className='align-items-center'>
              
              <Col></Col>
              <Col lg={6}>

             <h1> WELCOME TO VIDEOO.COM </h1>
             <p style={{textAlign:'justify'}}>Where user can use their favorite videoos.User can upload any youtube videos by copy and paste their url in to videoo.com will allow to add and remove their uploaded videos and lso arrange them in different categories by dragdrop it is free try it now!!! </p>
             
             <button onClick={handleNavigate} className='btn btn-success'>Click Here to Know More</button>
              </Col>
              <Col lg={5}>

            <img className='img-fluid m-5' width={'150 px'} height={'350px'}  src="https://cdn-icons-png.flaticon.com/512/84/84180.png" alt="No image" />

              </Col>
            </Row>,
        </div>
    )
}
export default Landing