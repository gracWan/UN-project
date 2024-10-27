import api from "./api";

export async function register_user(email, password) {
    try {
        const response = await api.post("/register", { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export async function login_user(email, password) {
    try {
        const response = await api.post("/login", { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}