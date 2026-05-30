import { Ellipsis, Plus } from "lucide-react";

function ListBlock() {
    return <div className="bg-black text-white min-w-70 p-3 rounded-xl">
        <div className="flex justify-between items-center mb-4">
            <h1>NameList</h1>
            <Ellipsis />
        </div>
        <div className="flex justify-left items-center gap-1 text-gray-500">
            <Plus className="h-6"/>
            <h1>Add a card</h1>
        </div>
    </div>
}

export default ListBlock;