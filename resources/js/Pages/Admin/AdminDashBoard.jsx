import AdminLayout from '@/Layouts/AdminLayout';

const AdminDashBoard = (auth) => {
    return (
        <AdminLayout user={auth.user} >
            Admin Dashboard
        </AdminLayout>
    );
};

export default AdminDashBoard;