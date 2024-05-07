import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { product } from "../../models/product";

export default function FrmProduct(props: frmProductProps){

    const validationSchema = Yup.object({
        title: Yup.string().required('Este campo es requerido'),
        price: Yup.number().required('Este campo es requerido'),
        description: Yup.string().required('Este campo es requerido'),
        category: Yup.string().required('Este campo es requerido'),
        image: Yup.string().required('Este campo es requerido')
    });

    return (
        <Formik initialValues={props.modelo} validationSchema={validationSchema} onSubmit={props.onSubmit}>
            <Form>
                <div className="row">
                    <div className="col-8">
                        <div className="form-group">
                            <label className="form-label" htmlFor="title">Título</label>
                            <Field type="text" id="title" name="title" className="form-control" />
                            <ErrorMessage name="title" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="price">Precio</label>
                            <Field type="number" id="price" name="price" className="form-control" />
                            <ErrorMessage name="price" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="category">Categoría</label>
                            <Field type="text" id="category" name="category" className="form-control" />
                            <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="image">Imagen</label>
                            <Field type="text" id="image" name="image" className="form-control" />
                            <ErrorMessage name="image" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <Field as="textarea" id="description" name="description" className="form-control" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to="/products" className="btn btn-secondary">Cancelar</Link>
                        <button type="submit" className="btn btn-primary ms-2">Guardar</button>
                    </div>
                </div>                
            </Form>
        </Formik>
    );
}

interface frmProductProps{
    modelo: product;
    onSubmit(valores: product, accion: FormikHelpers<product>): void;
}

FrmProduct.defaultProps = {
    modelo: { id: 0, title: '', price: 0, description: '', category: '', image: '', rating: { rate: 0, count: 0 }}
}