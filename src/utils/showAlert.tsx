import Swal from "sweetalert2";

const ShowAlert = (props: showAlertProps) => {
    Swal.fire({
      title: props.title,
      text: props.text,
      icon: props.icon,
      confirmButtonText: 'Aceptar'
    });
  };

  interface showAlertProps{
    title: string;
    text: string;
    icon: 'warning' | 'error' | 'success' | 'info' | 'question';
    }

    ShowAlert.defaultProps = {
        title: 'Alerta',
        text: 'Este es un mensaje de alerta con SweetAlert.',
        icon: 'warning'
    }
    
  export default ShowAlert;