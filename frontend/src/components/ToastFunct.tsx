import {toast} from "react-toastify";

function ToastFunct(props) {
    switch (props.type) {
        case "WARN":

            toast.warn(`${props.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
            break;
        case "SUCCESS":

            toast.success(`${props.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
            break;
        case "INFO":

            toast.info(`${props.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
            break;

        case "ERROR":
            toast.error(`${props.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
            break;
    }

}

export default ToastFunct;