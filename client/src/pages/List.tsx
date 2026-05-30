import ListSection from "../components/ListSection";
import Navbar from "../components/Navbar";

function List() {
    return <div className="bg-linear-to-b from-[#4A00E0] to-[#8E2DE2] h-screen w-full">
        <Navbar />
        <ListSection />
    </div>
}

export default List;