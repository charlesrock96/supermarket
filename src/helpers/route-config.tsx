import React from "react";
import IndexProduct from "../modules/products/indexProduct.tsx";
import EditProduct from "../modules/products/editProduct.tsx";
import CreateProduct from '../modules/products/createProduct.tsx';
import LstProduct from "../modules/products/lstProducts.tsx";
import EditUser from "../modules/users/editUser.tsx";
import CreateUser from "../modules/users/createUser.tsx";
import IndexUser from "../modules/users/indexUser.tsx";

const rutas = [
    { path: '/', component: <LstProduct />, exact: true },
    { path: '/products', component: <IndexProduct />, authorized: true},
    { path: '/products/create', component: <CreateProduct />, authorized: true},
    { path: '/products/edit/:id', component: <EditProduct />, authorized: true},
    { path: '/users', component: <IndexUser />, authorized: true},
    { path: '/users/edit/:id', component: <EditUser />, authorized: true},
    { path: '/users/create', component: <CreateUser />, authorized: true},
];

export default rutas;