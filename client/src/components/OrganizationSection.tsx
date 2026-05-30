import OrganizationBlock from "./OrganizationBlock";

function OrganizationSection() {
    return <div className="flex flex-col justify-start items-start px-40 py-10 w-full">
        <h1 className="text-white text-2xl font-semibold mb-10">Your Organization</h1>
        <div className="flex flex-wrap justify-start items-start gap-5 w-full">
            <OrganizationBlock />
        </div>
    </div>
}

export default OrganizationSection;