import {AuthContextType} from "../../libraries/utils/types.ts";
import {createContext, useContext} from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
export default useAuth;