import {ReactNode} from "react";
import AdminBackground from "@/app/admin/components/AdminBackground";

const AdminLayout = ({children}: { children: ReactNode }) => {
    return (
        <AdminBackground>
            {children}
        </AdminBackground>
    );
};

export default AdminLayout;
