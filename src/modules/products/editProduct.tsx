import { useEffect, useState } from "react";
import React from "react";
import { product } from "../../models/product";
import { urlProducts } from "../../utils/endpoints.tsx";
import FrmProduct from "./frmProduct.tsx";
import { useNavigate, useParams } from "react-router-dom";
import ShowAlert from "../../utils/showAlert.tsx";
import Loading from "../../utils/loading.tsx";
import axios from "axios";

export default function EditProduct() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [producto, setProducto] =useState<product>();
    const [loading, setLoading] = useState(true);
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`${urlProducts}/${id}`);
                setProducto(respuesta.data);
                console.log(respuesta.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false); // Se establece loading en false independientemente del resultado de la solicitud
            }
        };

        fetchData();
    }, [id]); // La dependencia vacía asegura que esta solicitud solo se realice una vez al montar el componente

    
    const edit = async (producto: product) => {
      try {
        // Realizar solicitud HTTP aquí
        const response = await axios.put(`${urlProducts}/${producto.id}`, producto);
        ShowAlert({title: 'Atención', text: 'Producto editado correctamente', icon: 'success'} );
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
                    <h4 className="text-primary fw-bold mb-0">EDITAR PRODUCTO</h4>
                </div>
                <img className="ms-n4 d-md-none d-lg-block" src="/assets/img/illustrations/crm-line-chart.png" alt="" width="150"/>
                </div>
            </div>
        </div>
        <div className="card overflow-hidden mt-3">
            <div className="card-body">
                {loading ? (
                    <div className="text-center">
                        <Loading />
                    </div> 
                ) : (
                    <>
                        <FrmProduct modelo={producto} onSubmit={async valores => { await edit(valores); }} />
                    </>
                )} 
            </div>
        </div>           
      </>
    );
}