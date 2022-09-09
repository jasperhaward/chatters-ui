export function generateId() {
    var arr = new Uint8Array(40 / 2);
    crypto.getRandomValues(arr);

    const dec2hex = (dec: number) => dec.toString(16).padStart(2, "0");

    return Array.from(arr, dec2hex).join("");
}
