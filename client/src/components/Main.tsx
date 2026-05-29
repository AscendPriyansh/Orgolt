import Organization from "./Organization";

function Main() {
    return <div className="flex flex-col justify-start items-start px-40 py-10">
        <h1 className="text-white text-2xl font-semibold mb-10">Your Organization</h1>
        <Organization />
    </div>
}

export default Main;