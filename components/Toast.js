import { showSuccessToast, showErrorToast, showWarningToast } from "../utils/helpers";
/**
 * Show success toast
 * @param {any} props 
 */
export const SuccessToast = (props) => {
    if (props.visible) {
      showSuccessToast(props.message, props.duration)
      return null;
    }
    return null;
}
/**
 * Show error toast
 * @param {any} props 
 */
export const ErrorToast = (props) => {
    if (props.visible) {
      showErrorToast(props.message, props.duration)
      return null;
    }
    return null;
}
/**
 * Show warning toast
 * @param {any} props 
 */
export const WarningToast = (props) => {
    if (props.visible) {
      showWarningToast(props.message, props.duration)
      return null;
    }
    return null;
}