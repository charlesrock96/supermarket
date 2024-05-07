// Importaciones necesarias
import React, { useContext } from 'react';
import ShowAlert from '../../utils/showAlert.tsx';
import { credential } from '../../models/credential';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { urlLogin } from '../../utils/endpoints.tsx';
import ContextAuthetication from '../../helpers/contextAuthetication.tsx';
import axios from 'axios';

// Componente Login
const Login = () => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/icons/spot-illustrations/half-circle.png)`
  };

  let navigate = useNavigate();
  const {update} = useContext(ContextAuthetication);
  const credenciales = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Este campo es requerido'),
    password: Yup.string().required('Este campo es requerido')
  });

  const handleSubmit = async (credenciales: credential) => {
    try{
    const response = await axios.post(urlLogin, credenciales);
    if(response.data.token){
      localStorage.setItem('token', response.data.token);
      update([{name: 'user', value : credenciales.username}]);
      navigate('/');
    }
    else{
      ShowAlert({title: 'Lo Sentimos', text: 'Usuario o contraseña incorrectos', icon: 'error'} );
    }
    } catch (error) {
    console.error('Error en la petición:', error);
    }      
  };

  return (
    <div className="row min-vh-100 flex-center g-0">
      <div className="col-lg-8 col-xxl-6 py-3 position-relative"><img className="bg-auth-circle-shape" src="/assets/img/icons/spot-illustrations/bg-shape.png" alt="" width="250"/><img className="bg-auth-circle-shape-2" src="/assets/img/icons/spot-illustrations/shape-1.png" alt="" width="150"/>
      <div className="card overflow-hidden z-1">
        <div className="card-body p-0">
        <div className="row g-0 h-100">
          <div className="col-md-5 text-center bg-card-gradient">
          <div className="position-relative p-4 pt-md-5 pb-md-7" data-bs-theme="light">
            <div className="bg-holder bg-auth-card-shape" style={divStyle}>
            </div>

            <div className="z-1 position-relative"><span className="link-light mb-4 font-sans-serif fs-5 d-inline-block fw-bolder">falcon</span>
            <p className="opacity-75 text-white">With the power of Falcon, you can now focus only on functionaries for your digital products, while leaving the UI design on us!</p>
            </div>
          </div>
          <div className="mt-3 mb-4 mt-md-4 mb-md-5" data-bs-theme="light"> 
            <p className="text-white">No tienes una cuenta?<br/><button className="btn btn-link text-decoration-underline link-light" onClick={() => ShowAlert({title: 'Lo Sentimos', text: 'No tenemos personal disponible para procesar tu solicitud', icon: 'error'} )}>Empezar!</button></p>
          </div>
          </div>
          <div className="col-md-7 d-flex flex-center">
          <div className="p-4 p-md-5 flex-grow-1">
            <div className="row flex-between-center">
            <div className="col-auto">
              <h3>Ingreso</h3>
            </div>
            </div>
            <Formik initialValues={credenciales} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <div className="mb-3">                            
              <label className="form-label">Email</label>
              <Field type="text" id="username" name="username" className="form-control" />
              <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label">Password</label>
              </div>
              <Field type="password" id="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <div className="row flex-between-center">
              <div className="col-auto"><button className="btn btn-link fs-10" onClick={() => ShowAlert({title: 'Lo Sentimos', text: 'Lamentamos tu perdida', icon: 'error'} )}>perdiste tu contraseña?</button></div>
              </div>
              <div className="mb-3">
              <button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Iniciar sesión</button>
              </div>
            </Form>
            </Formik>
            <div className="position-relative mt-2 text-center">
            o inicia sesión con
            </div>
            <div className="row g-2 mt-2">
            <div className="col-sm-6"><button className="btn btn-outline-google-plus btn-sm d-block w-100"  onClick={() => ShowAlert({title: 'Lo Sentimos', text: 'G+ ya no existe', icon: 'error'} )}><span className="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</button></div>
            <div className="col-sm-6"><button className="btn btn-outline-facebook btn-sm d-block w-100"  onClick={() => ShowAlert({title: 'Lo Sentimos', text: 'El componente ya no funciona', icon: 'error'} )}><span className="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</button></div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>      
  );
};

export default Login;