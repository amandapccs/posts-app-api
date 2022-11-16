export function isJson(obj: any) {
    try {
        JSON.parse(obj);
    } catch (e) {
        return false;
    }
    return true;
}