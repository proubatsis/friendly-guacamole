export const SHOW_MESSAGE_BOX = "show message box";
export const HIDE_MESSAGE_BOX = "hide message box";

export const MESSAGE_TYPE_SUCCESS = "success";
export const MESSAGE_TYPE_INFO = "info";
export const MESSAGE_TYPE_WARNING = "warning";
export const MESSAGE_TYPE_ERROR = "error";

export const DURATION_SHORT = 1000;
export const DURATION_MEDIUM = 2000;
export const DURATION_LONG = 3000;

export const showMessageBox = (content, type) => ({
    type: SHOW_MESSAGE_BOX,
    message: { content, type }
});

export const hideMessageBox = () => ({
    type: HIDE_MESSAGE_BOX
});

export const showAndHideMessageBox = (content, type, duration, dispatch) => {
    dispatch(showMessageBox(content, type));
    setTimeout(() => dispatch(hideMessageBox()), duration);
};
