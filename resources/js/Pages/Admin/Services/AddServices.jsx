import ServiceDescriptionEditor from '@/Components/ServiceDescriptionEditor';
import ServiceShortDescriptionEditor from '@/Components/ServiceShortDescriptionEditor';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const CreateService = ({ auth }) => {
      const [description, setDescription] = useState("");
      const [shortDescription, setShortDescription] = useState("");

    const [success, setSuccess] = useState(null);
    const [errors, setErrors] = useState({
        title: "",
        short_description: "",
        description: "",
        price: "",
        thumb: "",
    });

    const [formData, setFormData] = useState({
        title: "",
        short_description: "",
        description: "",
        price: "",
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
                [`${name}_preview`]: reader.result,
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
        if (type === "file") {
            handleFileChange(name, e.target.files);
        } else {
            setFormData({ ...formData, [name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
            formDataToSend.append("description", description);
            formDataToSend.append("short_description", shortDescription);
        try {
            const response = await axios.post(
                "/admin/add-services",
                formDataToSend
            );
            setFormData({
                title: "",
                short_description: "",
                description: "",
                price: "",
                thumb: null,
                thumb_preview: null,
            });
            setSuccess(response);
        } catch (error) {
            const { data } = error.response;
            setErrors(data.errors);
        }
    };

    return (
        <AdminLayout user={auth.user} success={success}>
            <Head title="Add Service"></Head>
            <div className="">
                <h2 className="text-3xl mb-4 text-black font-bold">
                    Add service
                </h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="max-w-5xl  bg-white p-8 mt-10 rounded"
            >
                <label className="block mb-4">
                    <span className="text-gray-700">Title</span>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input mt-1 block w-full border"
                    />
                    {errors?.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </p>
                    )}
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">Short Description</span>
                    <ServiceShortDescriptionEditor
                        shortDescription={shortDescription}
                        setShortDescription={setShortDescription}
                    />
                    {errors?.short_description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.short_description}
                        </p>
                    )}
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">Description</span>
                    <ServiceDescriptionEditor
                        description={description}
                        setDescription={setDescription}
                    />
                    {errors?.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </p>
                    )}
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">Price</span>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-input mt-1 block w-full"
                    />
                    {errors?.price && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.price}
                        </p>
                    )}
                </label>

                <label
                    className="block mb-4 border-dashed border-2 p-4 cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "thumb")}
                >
                    <span className="text-gray-700">Thumb (Image):</span>
                    <input
                        type="file"
                        name="thumb"
                        onChange={handleChange}
                        className="hidden"
                    />
                    {formData?.thumb_preview && (
                        <img
                            src={formData.thumb_preview}
                            alt="Thumb Preview"
                            className="mt-2 max-w-full"
                        />
                    )}
                    <p className="text-sm text-gray-500">
                        Drag & Drop or Choose File
                    </p>
                    {errors?.thumb && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.thumb}
                        </p>
                    )}
                </label>
                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </AdminLayout>
    );
};

export default CreateService;