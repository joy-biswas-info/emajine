import Authenticated from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';

const CreateService = ({auth}) => {
    const [formData, setFormData] = useState({
        title: '',
        short_description: '',
        description: '',
        price: '',
        thumb: null,
        thumb_preview: null,
      });
    
      const handleFileChange = (name, files) => {
        const file = files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setFormData({
            ...formData,
            [name]: file,
            [`${name}_preview`]: reader.result
          });
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e, name) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFileChange(name, files);
      };
    
      const handleChange = (e) => {
        const { name, type } = e.target;
    
        if (type === 'file') {
          handleFileChange(name, e.target.files);
        } else {
          setFormData({ ...formData, [name]: e.target.value });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
    
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
    
        try {
          const response = await axios.post('http://emajine.test/add-services', formDataToSend);
    
          console.log('Form data sent successfully!', response.data);
          // Handle success, e.g., redirect or display a success message
        } catch (error) {
          console.error('Error sending form data:', error);
          // Handle error, e.g., display an error message
        }
      };

    return (
        <Authenticated user={auth.user}>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md">
      <label className="block mb-4">
        <span className="text-gray-700">Title:</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Short Description:</span>
        <input
          type="text"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Description:</span>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Price:</span>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>

      <label
        className="block mb-4 border-dashed border-2 p-4 cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'thumb')}
      >
        <span className="text-gray-700">Thumb (Image):</span>
        <input
          type="file"
          name="thumb"
          onChange={handleChange}
          className="hidden"
        />
        {formData.thumb_preview && (
          <img src={formData.thumb_preview} alt="Thumb Preview" className="mt-2 max-w-full" />
        )}
        <p className="text-sm text-gray-500">Drag & Drop or Choose File</p>
      </label>




      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Submit
      </button>
    </form>
        </Authenticated>
    );
};

export default CreateService;