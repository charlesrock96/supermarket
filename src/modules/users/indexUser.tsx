import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFilters, useSortBy, useTable } from "react-table/dist/react-table.development.js";
import { urlUsers } from "../../utils/endpoints.tsx";
import Loading from "../../utils/loading.tsx";
import confirmar from "../../utils/confirmar.tsx";
import ShowAlert from "../../utils/showAlert.tsx";
import DetailProduct from "./detailUser.tsx";
import axios from "axios";

export default function IndexUser() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null); // Estado para almacenar el ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(urlUsers);
                setUsuarios(respuesta.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false); // Se establece loading en false independientemente del resultado de la solicitud
            }
        };

        fetchData();
    }, []); // La dependencia vacía asegura que esta solicitud solo se realice una vez al montar el componente


    const data = React.useMemo(
        () => usuarios,
        [usuarios]
    );

    const columns = React.useMemo(
        () => [            
            {
                Header: 'EMAIL',
                accessor: 'email',
                Filter: ColumnFilter,
            },
            {
                Header: 'USUARIO',
                accessor: 'username',
                Filter: ColumnFilter,
            },       
            {
                Header: 'TELÉFONO',
                accessor: 'phone',
                Filter: ColumnFilter,
                className: 'text-center',
            },
            {
                Header: ' ',
                Cell: ({ row }) => (
                    <div style={{ width: '150px', display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn btn-info" onClick={() => openModal(row.original.id)}><i className="fas fa-eye" /></button> &nbsp;
                        <Link to={`/users/edit/${row.original.id}`} className="btn btn-primary"><i className="fas fa-edit" /></Link> &nbsp;
                        <button className="btn btn-danger" onClick={() => confirmar(() => handleDelete(row.original.id))}><i className="fas fa-trash" /></button>
                    </div>
                ),
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useFilters, useSortBy);

    const openModal = (id) => {
        setModalId(id); // Guardar el ID en el estado
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalId(null); // Restablecer el ID al cerrar el modal
        setModalIsOpen(false);
    }

    const handleDelete = async (id: number) => {
        try {
            const respuesta = await axios.delete(`${urlUsers}/${id}`);
            ShowAlert({title: 'Atención', text: 'Registro eliminado.', icon: 'success'} );
        } catch (error) {
            console.error('Error al cargar datos:', error);
        } finally {
            setLoading(false); // Se establece loading en false independientemente del resultado de la solicitud
        }
    };

    return (
        <>
        <div className="card bg-100 shadow-none border">
            <div className="row gx-0 flex-between-center">
                <div className="col-sm-auto d-flex align-items-center">
                    <img className="ms-n2" src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90"/>
                    <div>
                        <h6 className="text-primary fs--1 mb-0">Listado de</h6>
                        <h4 className="text-primary fw-bold mb-0">USUARIOS</h4>
                    </div>
                    <img className="ms-n4 d-md-none d-lg-block" src="/assets/img/illustrations/crm-line-chart.png" alt="" width="150"/>
                </div>

                <div className="col-md-auto p-3">
                    <Link to="/users/create" className="btn btn-primary"><i className="fas fa-plus" /> Nuevo usuario</Link>
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
                    <table {...getTableProps()} className="table table-hover table-striped overflow-hidden">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                            {column.render('Header')}
                                            <span className="sw-bold">
                                                {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                                            </span>
                                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()} className={cell.column.id}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                
            </div>
        </div>
        <DetailProduct isOpen={modalIsOpen} closeModal={closeModal} id={modalId} />            
        </>        
    );
}

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