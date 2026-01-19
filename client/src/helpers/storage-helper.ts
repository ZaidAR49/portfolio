
export const saveToCache = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};
export const getFromCache = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};