const createTextInput = text => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = text;
    return input;
};

export const copyToClipboard = text => {
    const input = createTextInput(text);
    document.body.appendChild(input);
    let isSuccessful;

    try {
        input.select();
        document.execCommand("copy");
        isSuccessful = true;
    }
    catch (err) {
        isSuccessful = false;
    }

    document.body.removeChild(input);
    return isSuccessful;
};
