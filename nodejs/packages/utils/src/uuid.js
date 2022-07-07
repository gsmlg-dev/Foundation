/**
 * UUID generator
 * Use Web Cryptography API
 */
export const uuid = () => crypto.randomUUID();

export default uuid;
