import ListBlock from "./ListBlock";
import { Plus } from 'lucide-react';

function ListSection() {
    return <div>
        <div className="px-10 py-2 border-b border-white surface-secondary">
            <h1 className="text-2xl text-white font-bold">Front-end</h1>
        </div>
        <div className="px-10 py-2 flex justify-left items-start gap-4 flex-nowrap">
            <ListBlock />
            <ListBlock />
            <ListBlock />
            <div className="flex justify-left items-center gap-1 text-white bg-gray-400 w-70 p-3 rounded-xl">
                <Plus className="h-6"/>
                <h1>Add another List</h1>
            </div>
        </div>
    </div>
}

export default ListSection;