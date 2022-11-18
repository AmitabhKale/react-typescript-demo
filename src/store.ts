import { createContext } from "react";

const initialState = {
    first: "John",
    last:"Doe"
}

export type UserState = typeof initialState

const context = createContext<typeof initialState>(initialState)

export default context