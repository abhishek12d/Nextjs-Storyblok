import Cookies from "js-cookie";

export const setCookies = (token, expiresAt) => {
    const expiresAtDate = new Date(expiresAt); 
    Cookies.set("token", token, { expires: expiresAtDate });
}

export const getCookies = () => {
    return Cookies.get("token");
}

export const removeCookies = () => {
    return Cookies.remove("token");
}
