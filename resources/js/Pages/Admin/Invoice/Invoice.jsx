import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

const Invoice = ({auth,users}) => {
    const [formData, setFormData] = useState({
        user_id: '',
        price: '',
        service: '',
        currency:'cad',
      });
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('/admin/create-invoice',{
            ...formData
        }).then(
            res=>console.log(res),
            setFormData({user_id: '',
            price: '',
            service: '',
            currency:'cad',})
        )
      
    }
    return (
        <Authenticated user={auth.user}>
            <div className="container mx-auto">

            <form onSubmit={handleSubmit}>
                <input type="text" name='service' placeholder='service' value={formData.service} onChange={handleChange}/>
                <input type="number" name='price' placeholder='amount' value={formData.price} onChange={handleChange}/>
                <select name="currency" id="" value={formData.currency} onChange={handleChange}>
                    <option value=''>Select currency</option>
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                </select>
                <select name="user_id" id="" onChange={handleChange} value={formData.user_id}>
                    <option value="">Please Select a user</option>
                    {users.map(u=> <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
                
                
                <input type="submit" value="Send Invoice" className=' border border-black-500 p-2 cursor-pointer'/>
            </form>
            </div>
        </Authenticated>
    );
};

export default Invoice;