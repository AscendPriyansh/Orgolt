function BoardBlock() {
    return <div className="flex flex-col gap-3 text-white bg-amber-950 w-60 p-2 rounded-lg">
        <img src="https://plus.unsplash.com/premium_photo-1779734561555-7b1ee1729427?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="board-img" className="rounded-lg"/>
        <div>
            <h1 className="text-2xl font-bold">Frontend</h1>
            <p className="text-sm text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <div className="flex justify-between items-center border-t border-b py-1">
            <p>Role : <span className="font-bold">Admin</span></p>
            <div className="text-xl">I</div>
            <p>Members : <span className="font-bold">11</span></p>
        </div>
        <button className="font-bold bg-amber-300 rounded-lg p-2">View Board</button>
    </div>
}

export default BoardBlock;