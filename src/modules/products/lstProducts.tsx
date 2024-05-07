// Importar las dependencias necesarias
import React, { useEffect, useState } from "react";
import { urlProducts } from "../../utils/endpoints.tsx";
import Loading from "../../utils/loading.tsx";
import { product } from "../../models/product";
import DetailProduct from "./detailProduct.tsx";
import axios from "axios";

// Definir el componente LstProduct
export default function LstProduct() {
    // Definir los estados necesarios
    const [searchTerm, setSearchTerm] = useState('');
    const [productos, setProductos] = useState<product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null); // Estado para almacenar el ID

    // Obtener los productos al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(urlProducts);
                setProductos(respuesta.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false); // Se establece loading en false independientemente del resultado de la solicitud
            }
        };

        fetchData();
    }, []); // La dependencia vacía asegura que esta solicitud solo se realice una vez al montar el componente

    // Filtrar los productos según el término de búsqueda
    const filteredProducts = productos.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Abrir el modal con el ID del producto seleccionado
    const openModal = (id) => {
        setModalId(id); // Guardar el ID en el estado
        setModalIsOpen(true);
    }

    // Cerrar el modal y restablecer el ID
    const closeModal = () => {
        setModalId(null); // Restablecer el ID al cerrar el modal
        setModalIsOpen(false);
    }

    // Renderizar el componente
    return (
        <>
        <div className="card bg-100 shadow-none border">
            <div className="row gx-0 flex-between-center">
                <div className="col-sm-auto d-flex align-items-center">
                    <img className="ms-n2" src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90"/>
                    <div>
                        <h6 className="text-primary fs--1 mb-0">Listado de</h6>
                        <h4 className="text-primary fw-bold mb-0">PRODUCTOS</h4>
                    </div>
                    <img className="ms-n4 d-md-none d-lg-block" src="/assets/img/illustrations/crm-line-chart.png" alt="" width="150"/>
                </div>
                <div className="col-md-auto p-3">
                    <input className="form-control search-input fuzzy-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Buscar productos" aria-label="Search"/>
                </div>     
            </div>
        </div>
        <div className="card mt-2">
            <div className="card-body">
              <div className="row">
              {loading ? (
                    <div className="text-center">
                        <Loading />
                    </div>                      
                ) : (
                    filteredProducts.map(producto => (
                        <div className="mb-4 col-md-6 col-lg-4">
                            <div className="border rounded-1 h-100 d-flex flex-column justify-content-between pb-3">
                                <div className="overflow-hidden">
                                    <div className="position-relative rounded-top overflow-hidden text-center mt-2" style={{ minHeight: 500, minWidth: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <a className="d-block" href="#" onClick={() => openModal(producto.id)}>
                                            <img className="img-fluid rounded-top" src={producto.image} alt="" style={{ maxHeight: 500, maxWidth: 300}} />
                                        </a>
                                    </div>
                                    <div className="p-3">
                                        <h5 className="fs-9"><a className="text-1100" href="#" onClick={() => openModal(producto.id)}>{producto.title}</a></h5>
                                        <p className="fs-10 mb-3"><a className="text-500" href="#!">{producto.category}</a></p>
                                        <h5 className="fs-md-7 text-warning mb-0 d-flex align-items-center mb-3"> ${producto.price}
                                        </h5>
                                        <p className="fs-10 mb-1">Costo de envio: <strong>$50</strong></p>
                                        <p className="fs-10 mb-1">Stock: <strong className="text-success">Disponible</strong></p>
                                    </div>
                                </div>
                                <div className="d-flex flex-between-center px-3">
                                    <div>
                                        <span className="fa fa-star text-warning"></span>
                                        <span className="fa fa-star text-warning"></span>
                                        <span className="fa fa-star text-warning"></span>
                                        <span className="fa fa-star text-warning"></span>
                                        <span className="fa fa-star text-300"></span>
                                        <span className="ms-1">({producto.rating.count})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}    
              </div>
            </div>
          </div>
          <DetailProduct isOpen={modalIsOpen} closeModal={closeModal} id={modalId} />         
        </>        
    );
}

// Definir el componente ColumnFilter
function ColumnFilter({ column }) {
    const { filterValue, setFilter } = column;

    return (
        <input className="form-control"
            value={filterValue || ''}
            onChange={e => setFilter(e.target.value)}
            placeholder={`Filtrar ${column.Header}`}
        />
    );
}