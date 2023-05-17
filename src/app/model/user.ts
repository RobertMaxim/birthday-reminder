import { Friend } from "./interface/friend";

export interface User {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    friends?: Friend[];
}
