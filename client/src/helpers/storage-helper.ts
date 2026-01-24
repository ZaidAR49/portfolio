
export const saveToCache = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};
export const getFromCache = (key: string) => {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};
export const removeFromCache = (key: string) => {
    sessionStorage.removeItem(key);
};
export const clearCache = () => {
    sessionStorage.clear();
};
export const removeUserData = () => {
    console.log("Removing user data from cache");
    sessionStorage.removeItem("portfolios");
    sessionStorage.removeItem("experiences");
    sessionStorage.removeItem("projects");
    sessionStorage.removeItem("skills");
    sessionStorage.removeItem("user");
};

