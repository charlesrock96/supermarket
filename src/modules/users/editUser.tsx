// Importar las dependencias necesarias
import { useEffect, useState } from "react";
import React from "react";
import { urlUsers } from "../../utils/endpoints.tsx";
import { useNavigate, useParams } from "react-router-dom";
import ShowAlert from "../../utils/showAlert.tsx";
import Loading from "../../utils/loading.tsx";
import { user } from "../../models/user";
import FrmUser from "./frmUser.tsx";
import axios from "axios";

// Definir el componente EditUser
export default function EditUser() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [usuario, setUsuario] = useState<user>();
    const [loading, setLoading] = useState(true);
    const [errores, setErrores] = useState<string[]>([]);

    // Obtener los datos del usuario al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`${urlUsers}/${id}`);
                setUsuario(respuesta.data);
                console.log(respuesta.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false); // Se establece loading en false independientemente del resultado de la solicitud
            }
        };

        fetchData();
    }, [id]); // La dependencia vacía asegura que esta solicitud solo se realice una vez al montar el componente

    
    // Función para editar el usuario
    const edit = async (user: user) => {
        try {
            // Realizar solicitud HTTP aquí
            const response = await axios.put(`${urlUsers}/${user.id}`, user);
            ShowAlert({title: 'Atención', text: 'Usuario editado correctamente', icon: 'success'} );
            navigate('/users');        
        } catch (error) {
            // Manejar errores, si los hay
            setErrores(error.response.data);
        }
    }

    return (
        <>
            {/* Encabezado del componente */}
            <div className="card bg-100 shadow-none border">
                <div className="row gx-0 flex-between-center">
                    <div className="col-sm-auto d-flex align-items-center">
                        <img className="ms-n2" src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90"/>
                        <div>
                            <h4 className="text-primary fw-bold mb-0">EDITAR USUARIO</h4>
                        </div>
                        <img className="ms-n4 d-md-none d-lg-block" src="/assets/img/illustrations/crm-line-chart.png" alt="" width="150"/>
                    </div>
                </div>
            </div>
            {/* Cuerpo del componente */}
            <div className="card overflow-hidden mt-3">
                <div className="card-body">
                    {loading ? (
                        // Mostrar el componente de carga si loading es true
                        <div className="text-center">
                            <Loading />
                        </div> 
                    ) : (
                        // Mostrar el formulario de usuario si loading es false y usuario existe
                        <>
                            {usuario && <FrmUser modelo={usuario} onSubmit={async valores => { await edit(valores); }} />}
                        </>
                    )} 
                </div>
            </div>           
        </>
    );
}