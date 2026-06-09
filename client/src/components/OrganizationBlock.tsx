interface OrganizationBlockProps {
    name: string;
    description: string;
    visibility: string;
}

function OrganizationBlock({ name, description, visibility }: OrganizationBlockProps) {
    return <div className="w-full border border-t-white border-b-white p-2">
        <p className="text-white font-bold text-xl p-2">{name}</p>
        <p className="text-secondary text-md p-2">{description}</p>
        <p className="text-gray-400 text-sm p-2">Visibility: {visibility}</p>
    </div>
}

export default OrganizationBlock;