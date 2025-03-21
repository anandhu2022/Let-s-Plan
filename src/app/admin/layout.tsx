import {ReactNode} from "react";
import AdminBackground from "@/app/admin/components/AdminBackground";
import AdminAuthProvider from "@/app/admin/context/auth/AuthContext";

const AdminLayout = ({children}: { children: ReactNode }) => {
    return (
        <AdminAuthProvider>
            <AdminBackground>
                {children}
            </AdminBackground>
        </AdminAuthProvider>
    );
};

export default AdminLayout;
