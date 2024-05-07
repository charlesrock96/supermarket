import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { user } from '../../models/user';

export default function FrmUser(props: frmUserProps){

    const validationSchema = Yup.object({
        email: Yup.string().email('Formato de correo incorrecto').required('Este campo es requerido'),
        username: Yup.string().required('Este campo es requerido'),
        password: Yup.string().required('Este campo es requerido'),
        name: Yup.object({
            firstname: Yup.string().required('Este campo es requerido'),
            lastname: Yup.string().required('Este campo es requerido')
        }),
        phone: Yup.string().required('Este campo es requerido'),
        address: Yup.object({
            city: Yup.string().required('Este campo es requerido'),
            street: Yup.string().required('Este campo es requerido'),
            number: Yup.number().required('Este campo es requerido'),
            zipcode: Yup.string().required('Este campo es requerido'),
            geolocation: Yup.object({
                lat: Yup.string().required('Este campo es requerido'),
                long: Yup.string().required('Este campo es requerido')
            })
        })
    });

    return (
        <Formik initialValues={props.modelo} validationSchema={validationSchema} onSubmit={props.onSubmit}>
            <Form>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <Field type="email" id="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="username">Usuario</label>
                            <Field type="text" id="username" name="username" className="form-control" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <Field type="password" id="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="name.firstname">Nombre</label>
                            <Field type="text" id="name.firstname" name="name.firstname" className="form-control" />
                            <ErrorMessage name="name.firstname" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="name.lastname">Apellido</label>
                            <Field type="text" id="name.lastname" name="name.lastname" className="form-control" />
                            <ErrorMessage name="name.lastname" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="address.city">Ciudad</label>
                            <Field type="text" id="address.city" name="address.city" className="form-control" />
                            <ErrorMessage name="address.city" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="address.street">Calle</label>
                            <Field type="text" id="address.street" name="address.street" className="form-control" />
                            <ErrorMessage name="address.street" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="address.number">Número</label>
                            <Field type="number" id="address.number" name="address.number" className="form-control" />
                            <ErrorMessage name="address.number" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="address.zipcode">Código Postal</label>
                            <Field type="text" id="address.zipcode" name="address.zipcode" className="form-control" />
                            <ErrorMessage name="address.zipcode" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="address.geolocation.lat">Latitud</label>
                            <Field type="text" id="address.geolocation.lat" name="address.geolocation.lat" className="form-control" />
                            <ErrorMessage name="address.geolocation.lat" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="address.geolocation.long">Longitud</label>
                            <Field type="text" id="address.geolocation.long" name="address.geolocation.long" className="form-control" />
                            <ErrorMessage name="address.geolocation.long" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row mb-3">                    
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <Field type="text" id="phone" name="phone" className="form-control" />
                            <ErrorMessage name="phone" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Link to="/users" className="btn btn-secondary">Cancelar</Link>
                        <button type="submit" className="btn btn-primary ms-2">Guardar</button>
                    </div>
                </div>                
            </Form>
        </Formik>
    );
}

interface frmUserProps{
    modelo: user;
    onSubmit(valores: user, accion: FormikHelpers<user>): void;
}

FrmUser.defaultProps = {
   module: {
        id: 0,
        email: '',
        username: '',
        password: '',
        name: {
            firstname: '',
            lastname: ''
        },
        phone: '',
        address: {
            geolocation: {
                lat: '',
                long: ''
            },
            city: '',
            street: '',
            number: 0,
            zipcode: ''
        }
    }
}