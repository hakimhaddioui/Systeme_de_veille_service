import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';
import logoOncf from '../../assets/img/brand/Logo-oncf.png'; // Importation de l'image

const LoginPage = () => {
  return (
    <MDBContainer fluid>
      <div 
        className="p-5 bg-image" 
        style={{ 
          background: 'linear-gradient(135deg, #ff8c00, #ff4500)',
          height: '300px'
        }}
      ></div>

      <MDBCard 
        className='mx-5 mb-5 p-5 shadow-5' 
        style={{ 
          marginTop: '-100px', 
          background: 'hsla(0, 0%, 100%, 0.8)', 
          backdropFilter: 'blur(30px)' 
        }}
      >
        <MDBCardBody className='p-5 text-center'>
          <img 
            src={logoOncf} 
            alt="ONCF Logo" 
            style={{ width: '200px', marginBottom: '30px' }} // Espacement ajusté ici
          />

          <h2 className="fw-bold mb-5 text-center"> </h2>

          <MDBCol col='12' className='d-flex flex-column align-items-start'>
            <label htmlFor='matricule' className='text-start w-100'>Matricule</label>
            <MDBInput 
              wrapperClass='mb-4 w-100' 
              id='matricule' 
              type='text' 
            />
          </MDBCol>

          <MDBCol col='12' className='d-flex flex-column align-items-start'>
            <label htmlFor='password' className='text-start w-100'>Mot de passe</label>
            <MDBInput 
              wrapperClass='mb-4 w-100' 
              id='password' 
              type='password' 
            />
          </MDBCol>

          {/* Button without logo */}
          <MDBBtn className='mb-4 d-block mx-auto' style={{ width: '20%' }} size='md'>
            Se connecter
          </MDBBtn>

        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginPage;
