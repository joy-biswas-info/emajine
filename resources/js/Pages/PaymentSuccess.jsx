import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

const PaymentSuccess = ({ order,auth }) => {
    return (
        <Authenticated user={auth.user} >
      <div className="max-w-md mx-auto p-8 border-2 border-green-500 rounded-lg bg-blue-50 mt-24">
        <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for your purchase.</p>
        <Link href="/" className="border p-2 ">Go Back</Link>
      </div>
        </Authenticated>
    );
  };
  
  export default PaymentSuccess;