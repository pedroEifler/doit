import axios from "axios";

export const listarTodos = parametro => {
    return axios.get("http://localhost:3000/doits", {
        parametro: parametro
    })
};

export const listarPorId = parametro => {
    return axios.get("http://localhost:3000/doits/".concat(parametro), {
        parametro: parametro
    })
};

export const adicionar = parametro => {
    return axios.post("http://localhost:3000/doits", parametro).then(res => res.data);
};

export const editar = parametro => {
    return axios.put("http://localhost:3000/doits/".concat(parametro.id), parametro).then(res => res.data)
};

export const deletar = parametro => {
    return axios.delete("http://localhost:3000/doits/".concat(parametro.id))
};