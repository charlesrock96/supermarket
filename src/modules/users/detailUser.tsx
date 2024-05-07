import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { urlUsers } from '../../utils/endpoints.tsx';
import { user } from '../../models/user';
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
function DetailUser({ isOpen, closeModal, id }) {
    const modalStyle = {
        content: {
          width: 600, // Ancho de la ventana modal
          height: 400, // Altura de la ventana modal
          margin: 'auto' // Centra la ventana modal en la pantalla
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Color de fondo oscuro
        }
      };

    const [usuario, setUsuario] =useState<user>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`${urlUsers}/${id}`);
                setUsuario(respuesta.data);
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
        contentLabel="DETALLE DE USUARIO"
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
                                    <h4 className="text-primary fw-bold mb-0">DETALLE DE USUARIO</h4>
                                </div>
                                <img className="ms-n4 d-md-none d-lg-block" src="/assets/img/illustrations/crm-line-chart.png" alt="" width="150"/>
                            </div>
                            <div className="col-md-auto p-3">
                                <button className="btn-close btn-close-white top-0 end-0 mt-2 me-2 bg-light" onClick={closeModal}></button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <table className='table table-hover table-striped overflow-hidden'>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{usuario?.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Nombre de Usuario:</td>
                                        <td>{usuario?.username}</td>
                                    </tr>
                                    <tr>
                                        <td>Nombre Completo:</td>
                                        <td>{usuario?.name.firstname} {usuario?.name.lastname}</td>
                                    </tr>
                                    <tr>
                                        <td>Teléfono:</td>
                                        <td>{usuario?.phone}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>Dirección:</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            Ciudad: {usuario?.address.city}<br/>
                                            Calle: {usuario?.address.street}<br/>
                                            Número: {usuario?.address.number}<br/>
                                            Código Postal: {usuario?.address.zipcode}<br/>
                                            Geolocalización: Latitud: {usuario?.address.geolocation.lat}, Longitud: {usuario?.address.geolocation.long}
                                        </td>
                                    </tr>
                                </table>
                                </div>
                            </div>
                        </div>
                    </>
                )} 
        </Modal>
    );
}

export default DetailUser;