function errors(message,code){
    let e = new Error(message);
    if(code){
        e.status = code;
    }
    return e;
}


module.exports = errors;