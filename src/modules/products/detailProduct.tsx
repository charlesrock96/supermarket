import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { urlProducts } from '../../utils/endpoints.tsx';
import { product } from '../../models/product';
import Loading from '../../utils/loading.tsx';
import axios from 'axios';

// Establece la referencia a la aplicación para manejar el enfoque de accesibilidad
Modal.setAppElement('#root');

/**
 * Componente de ventana modal.
 * 
 * Este componente renderiza un botón que al hacer clic abre una ventana modal.
 * La ventana modal muestra un título y un contenido personalizado.
 * También incluye un botón para cerrar la ventana modal.
 */
function DetailProduct({ isOpen, closeModal, id }) {
    
    const modalStyle = {
        content: {
          width: 900, // Ancho de la ventana modal
          height: 630, // Altura de la ventana modal
          margin: 'auto' // Centra la ventana modal en la pantalla
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Color de fondo oscuro
        }
      };

    const [producto, setProducto] =useState<product>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`${urlProducts}/${id}`);
                setProducto(respuesta.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false); // Se establece loading en false independientemente del resultado de la solicitud
            }
        };

        fetchData();
    }, [isOpen, id]); // La dependencia vacía asegura que esta solicitud solo se realice una vez al montar el componente

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="DETALLE DE PRODUCTO"
        style={modalStyle}
        >
            {loading ? (
                    <div className="text-center">
                        <Loading />
                    </div>                      
                ) : (
                    <>
                        <div className="row gx-0 flex-between-center">
                            <div className="col-sm-auto d-flex align-items-center">
                                <img className="ms-n2" src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90"/>
                                <div>
                                    <h4 className="text-primary fw-bold mb-0">DETALLE DE PRODUCTO</h4>
                                </div>
                                <img className="ms-n4 d-md-none d-lg-block" src="/assets/img/illustrations/crm-line-chart.png" alt="" width="150"/>
                            </div>
                            <div className="col-md-auto p-3">
                                <button className="btn-close btn-close-white top-0 end-0 mt-2 me-2 bg-light" onClick={closeModal}></button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="position-relative rounded-top overflow-hidden text-center mt-2" style={{ minHeight: 500, minWidth: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img className="d-block img-fluid rounded-top" src={producto?.image} alt="" style={{ maxHeight: 500, maxWidth: 300}} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h5>{producto?.title}</h5><a className="fs-10 mb-2 d-block" href="#!">{producto?.category}</a>
                                    <div className="fs-11 mb-3 d-inline-block text-decoration-none">
                                        <span className="fa fa-star-half-alt text-warning star-icon"></span>
                                        <span className="ms-1 text-600">({producto?.rating?.rate})</span>
                                    </div>
                                    <p className="fs-10">{producto?.description}</p>                            
                                    <h4 className="d-flex align-items-center"><span className="text-warning me-2">${producto?.price}</span>
                                    </h4>
                                    <p className="fs-10 mb-1"> <span>Shipping Cost: </span><strong>$50</strong></p>
                                    <p className="fs-10">Stock: <strong className="text-success">Available</strong></p>                            
                                </div>
                            </div>
                        </div>
                    </>
                )} 
        </Modal>
    );
}

export default DetailProduct;