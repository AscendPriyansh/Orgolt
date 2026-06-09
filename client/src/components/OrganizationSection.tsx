import { Plus } from "lucide-react";
import OrganizationBlock from "./OrganizationBlock";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const navigate = useNavigate();

function OrganizationSection() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [orgName, setOrgName] = useState("");
    const [orgDescription, setOrgDescription] = useState("");

    const [visibility, setVisibility] = useState("");

    const [orgs, setOrgs] = useState([]);

    const fetchOrgs = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const response = await axios.get("http://localhost:5000/org/v1", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrgs(response.data.organizations || []);
        } catch {
            // not logged in
        }
    };

    useEffect(() => { fetchOrgs(); }, []);

    const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
        e.preventDefault();

        if (!orgName.trim()) {
            alert("Org name required");
            return;
        }
        if (!visibility) {
            alert("Visibility selection required");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/org/v1/",
                {
                    name: orgName,
                    description: orgDescription,
                    visibility: visibility.toLowerCase(),
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }
            );
        } catch (error) {
            alert(error);
            return;
        }

        setOrgName("");
        setOrgDescription("");
        setVisibility("");
        setIsModalOpen(false);
        fetchOrgs();
    }

    return <div className="flex flex-col justify-start items-start px-40 py-10 w-full">
        <h1 className="text-white text-2xl font-semibold mb-10">Your Organization</h1>
        <div className="flex flex-wrap justify-start items-start gap-5 w-full">
            {orgs.map((org: { id: number; name: string; description: string; visibility: string }) => (
                <Link to={`/org/v1/${org.id}/boards`}>
                    <OrganizationBlock key={org.id} name={org.name} description={org.description} visibility={org.visibility} />
                </Link>
            ))}
            <button onClick={() => {
                setIsModalOpen(true)
            }} className="flex justify-left items-center gap-1 text-white bg-gray-700 w-70 p-3 rounded-xl active:scale-99">
                <Plus className="h-6" />
                <h1>Create Organization</h1>
            </button>
        </div>


        {/* pop up */}

        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="text-white bg-purple-900 rounded-xl p-6 w-1/3">
                    <h1 className="text-2xl font-bold mb-4 mt-4">CREATE AN ORGANIZATION</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label>Name </label>
                                <input value={orgName} onChange={(e) => {
                                    setOrgName(e.target.value);
                                }} type="text" placeholder="Name" className="p-2 border rounded-lg" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Description </label>
                                <input value={orgDescription} onChange={(e) => {
                                    setOrgDescription(e.target.value);
                                }} type="text" placeholder="Description" className="p-2 border rounded-lg" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Visibility </label>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => {
                                        setVisibility("Public");
                                    }} className="w-full bg-amber-950 rounded-lg p-2">Public</button>
                                    <button type="button" onClick={() => {
                                        setVisibility("Private");
                                    }} className="w-full bg-amber-950 rounded-lg p-2">Private</button>
                                    <button type="button" onClick={() => {
                                        setVisibility("Unlisted");
                                    }} className="w-full bg-amber-950 rounded-lg p-2">Unlisted</button>
                                </div>
                            </div>
                            <div>
                                <button type="button" className="flex gap-1">
                                    <Plus className="h-5" />
                                    <p>Add member</p>
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" className="w-1/2 bg-amber-950 p-2 rounded-lg text-xl font-bold">Create Org</button>
                                <button onClick={() => {
                                    setIsModalOpen(false);
                                }} className="w-1/2 bg-amber-950 p-2 rounded-lg text-xl font-bold">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
}

export default OrganizationSection;