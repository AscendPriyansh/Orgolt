import BoardBlock from "./BoardBlock";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BoardSection() {
    const { orgId } = useParams();
    const [boards, setBoards] = useState([]);

    const getBoards = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/org/v1/${orgId}/boards`,
                {
                    withCredentials: true,
                }
            );

            setBoards(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBoards();
    }, [orgId]);

    return (
        <div className="flex flex-col justify-start items-start px-40 py-10 w-full">
            <h1 className="text-white text-2xl font-semibold mb-10">
                Your Boards
            </h1>

            <div className="flex flex-wrap justify-start items-start gap-5 w-full">
                {boards.map((board: any) => (
                    <BoardBlock
                        key={board.id}
                        board={board}
                    />
                ))}
            </div>
        </div>
    );
}

export default BoardSection;