import { TOKEN, LP_USER } from "constants/"

export const isUserLoggedIn = () => localStorage.getItem(LP_USER)

export const setToken = (token) => localStorage.setItem(TOKEN, token)

export const removeToken = () => localStorage.removeItem(TOKEN)

export const getToken = () => localStorage.getItem(TOKEN)

export const setUser = (user) => localStorage.setItem(LP_USER, JSON.stringify(user))

export const getUser = () => isUserLoggedIn() && JSON.parse(localStorage.getItem(LP_USER))

export const removeUser = () => localStorage.removeItem(LP_USER)

export const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    if (e?.fileList?.length > 0) {
        let res = e.fileList;
        e.fileList[0].status = "done"

        return res;
    }

    return e?.fileList;
};
