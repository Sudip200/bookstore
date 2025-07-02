import path from "path";
import UuidSingeltonService from "../services/UuidService";
import { readData, writeData } from "../utils/data";

const USERS_PATH = path.join(__dirname,'..','data/users.json')
const uuidService = new UuidSingeltonService();
const uuidInstance = uuidService.getInstance();
class User {
    public id: string;
    public name: string;
    public email: string;
    public password: string;

    constructor(name: string, email: string, password: string) {
        this.id = uuidInstance.generateId();
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async save(): Promise<void> {
        const users = await readData<User>(USERS_PATH);
        await writeData<User>(USERS_PATH, [...users, this]);
    }

    static async findById(userId: string): Promise<User | undefined> {
        const users = await readData<User>(USERS_PATH);
        return users.find(user => user.id === userId);
    }
    static async find(email: string): Promise<User> {
        let users = await readData<User>(USERS_PATH);
        return users.find((user) => user.email == email) as User;
    }
}

export default User;