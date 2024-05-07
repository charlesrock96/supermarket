import Swal from "sweetalert2";

export default function confirmar(
  onConfirm: any,
  titulo: string = "¿Desea borrar el registro?",
  textoBotonConfirmacion: string = "Borrar"
) {
    Swal.fire({
        title: titulo,
        confirmButtonText: textoBotonConfirmacion,
        icon: 'warning',
        showCancelButton: true
    }).then(result => {
        if (result.isConfirmed){
            onConfirm();
        }
    })
}