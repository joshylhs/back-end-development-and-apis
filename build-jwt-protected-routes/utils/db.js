import path from "path";
import fs from 'fs';
const DB_PATH  = path.join(import.meta.dirname, "../data/users.json");

export const readUsers = () => {
    let res = fs.readFileSync(DB_PATH,'utf-8').trim();
    
    if (res.length === 0) {
        return []
    } else {
        return JSON.parse(res)
    }
}

export function writeUsers(users) {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2))
}

export function findByEmail(email) {
    return readUsers().find((u) => u.email === email) || null;
}

export function findById(id) {
    return readUsers().find((u) => u.id === id) || null;
}