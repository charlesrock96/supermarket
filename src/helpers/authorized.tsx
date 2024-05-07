import React, { ReactElement, useContext, useEffect } from "react";
import ContextAuthetication from "./contextAuthetication.tsx";

/**
 * Componente que muestra un contenido autorizado o no autorizado
 * dependiendo de las reclamaciones del usuario.
 *
 * @param {authorizedProps} props - Las propiedades del componente.
 * @returns {ReactElement} El contenido autorizado o no autorizado.
 */
export default function Authorized(props: authorizedProps) {
    const [isAutorized, setIsAutorized] = React.useState(false);
    const {claims} = useContext(ContextAuthetication);

    useEffect(() => {
        setIsAutorized(claims.length > 0);
    }, [claims])

    return (
        <>
            {isAutorized ? props.autorized : props.unauthorized}         
        </>
    );
}

interface authorizedProps {
    autorized: ReactElement;
    unauthorized?: ReactElement;
}
