import React, { useState } from "react";
import FrmProduct from './frmProduct.tsx';
import { urlProducts } from "../../utils/endpoints.tsx";
import { product } from "../../models/product";
import ShowAlert from "../../utils/showAlert.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
    let navigate = useNavigate();
    const [errores, setErrores] = useState<string[]>([]);
    
    const create = async (producto: product) => {
      try {
        // Realizar solicitud HTTP aquí
        const response = await axios.post(urlProducts, producto);
        ShowAlert({title: 'Atención', text: 'Producto creado correctamente', icon: 'success'} );
        navigate('/products');        
      } catch (error) {
        // Manejar errores, si los hay
        setErrores(error.response.data);
      }
    }

    return (
      <>
        <div className="card bg-100 shadow-none border">
            <div className="row gx-0 flex-between-center">
                <div className="col-sm-auto d-flex align-items-center">
                    <img className="ms-n2" src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90"/>
                    <div>
                        <h4 className="text-primary fw-bold mb-0">CREAR PRODUCTO</h4>
                    </div>
                    <img className="ms-n4 d-md-none d-lg-block" src="/assets/img/illustrations/crm-line-chart.png" alt="" width="150"/>
                </div>
            </div>
        </div>
        <div className="card overflow-hidden mt-3">
          <div className="card-body">
            <FrmProduct modelo={{ id: 0, title: '', price: 0, description: '', category: '', image: '', rating: { rate: 0, count: 0 }}} onSubmit={async valores => { await create(valores); }} />
          </div>
        </div>        
      </>
    );
}
  
  export default CreateProduct;