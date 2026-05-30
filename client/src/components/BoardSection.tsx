import BoardBlock from "./BoardBlock";

function BoardSection() {
    return <div className="flex flex-col justify-start items-start px-40 py-10 w-full">
        <h1 className="text-white text-2xl font-semibold mb-10">Your Boards</h1>
        <div className="flex flex-wrap justify-start items-start gap-5 w-full">
            <BoardBlock />
        </div>
    </div>
}

export default BoardSection;