import { Bell, Search, CirclePlus, User } from 'lucide-react';

function Navbar() {
    return <div>
        <div className='w-full text-white flex justify-between items-center py-4 px-8 border-b border-gray-900'>
            <div className='flex justify-left items-center w-1/3 gap-4'>
                <h1 className='text-2xl font-bold'>ORGOLT</h1>
                <div className='text-3xl'>I</div>
                <div className='text-gray-400 text-md'>PAGE NAME</div>
            </div>
            <div className='flex justify-end items-center w-1/3 gap-6'>
                <div className='flex justifify-center items-center rounded-lg'>
                    <Search className='h-4'/>
                    <p className='text-sm'>ctrl + k</p>
                </div>
                <div className='flex justify-center items-center gap-1 py-2 px-3 rounded-lg surface-secondary'>
                    <CirclePlus className='h-5'/>
                    <p>Create</p>
                </div>
                <div>
                    <Bell className='h-5'/>
                </div>
                <div>
                    <User className='h-5'/>
                </div>
            </div>
        </div>
    </div>
}

export default Navbar;