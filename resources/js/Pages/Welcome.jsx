import { Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Home" />
            <div>
                <h2>Welcome to Emajine agency portal</h2>
            </div>
        </>
    );
}
