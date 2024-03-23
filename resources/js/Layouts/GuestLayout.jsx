import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <>
            <header className=' px-12 flex justify-between items-center'>
            <ApplicationLogo className="w-48 fill-current text-gray-500 p2" />
            <div className='flex align-middle justify-end gap-12 text-xl'>
                <Link href='/services'>Services</Link>
                <Link href="/register"> Register</Link>
                <Link href='/login'>login</Link>
            </div>
            </header>
            <>
                {children}
            </>
</>
    );
}
