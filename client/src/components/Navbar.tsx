import { Bell, Search, CirclePlus, User } from 'lucide-react';

function Navbar() {
    return <div className='w-full'>
        <div className='w-full text-white flex justify-between items-center py-2 px-8'>
            <div className='flex justify-between items-center w-1/3'>
                <h1 className='text-2xl font-bold'>ORGOLT</h1>
                <div className='flex justifify-center items-center gap-2'>
                    <input type="text" placeholder="Search" />
                    <Search />
                </div>
            </div>
            <div className='py-2 px-4 bg-gray-500 rounded-2xl '>PAGE NAME</div>
            <div className='flex justify-between items-center w-1/3 '>
                <div className='flex justifify-center items-center gap-2'>
                    <CirclePlus />
                    Create
                </div>
                <div>
                    <Bell />
                </div>
                <div>
                    <User />
                </div>
            </div>
        </div>
    </div>
}

export default Navbar;