import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
        const [selectedImage, setSelectedImage] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        profile_picture: null, // New state for profile picture
    });

    const [dragOver, setDragOver] = useState(false); // State to manage drag over effect

    const handleFileChange = (e) => {
        const file = e.target.files[0];
                setSelectedImage(file);
        setData("profile_picture", file);

    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        setSelectedImage(file);
        setData("profile_picture", file);
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);
        formData.append("profile_picture", data.profile_picture); // Append profile picture to FormData
        post(route("register"), formData);
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        {selectedImage && (
                                <div className="mt-2">
                                    {console.log(selectedImage)}
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected Image"
                                        className="w-40 h-40 mx-auto"
                                    />
                                </div>
                            )}
                            <InputError message={errors.profile_picture} className="mt-2" />
                        
                        <div className="mt-4">
                            <label
                                htmlFor="profile_picture"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Profile Picture
                            </label>
                            <div
                                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                                    dragOver ? "border-blue-400" : ""
                                }`}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOver(true);
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                            >
                                <div className="space-y-1 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <input
                                            type="file"
                                            id="profile_picture"
                                            name="profile_picture"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                        />
                                        <label
                                            htmlFor="profile_picture"
                                            className="relative cursor-pointer inline-block"
                                        >
                                            <div className="text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 15l4-4 4 4m0 5l-4 4-4-4"
                                                    />
                                                </svg>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    Drag and drop or{" "}
                                                    <span className="font-medium text-indigo-600">
                                                        click to upload
                                                    </span>
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route("login")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Register
                                </PrimaryButton>
                            </div>
                        </div>

                        {/* Existing form fields */}
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
