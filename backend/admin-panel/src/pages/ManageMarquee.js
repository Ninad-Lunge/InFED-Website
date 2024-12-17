import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

const MarqueeManager = () => {
    const [marquees, setMarquees] = useState([]);
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Fetch all marquee entries
    const fetchMarquees = async () => {
        try {
            const response = await axios.get('https://infed-website-kkva.onrender.com/api/admin/marquee');
            setMarquees(response.data);
        } catch (error) {
            console.error('Error fetching marquees:', error);
        }
    };

    // Add or update marquee
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text || !link) return alert('Both text and link are required');

        try {
            if (editingId) {
                // Update existing marquee
                await axios.put(`https://infed-website-kkva.onrender.com/api/admin/marquee/${editingId}`, { text, link });
            } else {
                // Add new marquee
                await axios.post('https://infed-website-kkva.onrender.com/api/admin/marquee', { text, link });
            }
            setText('');
            setLink('');
            setEditingId(null);
            fetchMarquees();
        } catch (error) {
            console.error('Error saving marquee:', error);
        }
    };

    // Edit a marquee
    const handleEdit = (id) => {
        const marquee = marquees.find((marquee) => marquee._id === id);
        setText(marquee.text);
        setLink(marquee.link);
        setEditingId(id);
    };

    // Delete a marquee
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://infed-website-kkva.onrender.com/api/admin/marquee/${id}`);
            fetchMarquees();
        } catch (error) {
            console.error('Error deleting marquee:', error);
        }
    };

    useEffect(() => {
        fetchMarquees();
    }, []);

    return (
        <div className="mx-auto p-4">
            <h1 className="text-xl font-bold mb-2">Marquee Manager</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 mb-6"
            >
                <input
                    type="text"
                    placeholder="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                    type="url"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    <PlusCircle className="w-5 h-5" />
                    {editingId ? 'Update' : 'Add'}
                </button>
            </form>

            {/* List */}
            <ul className="space-y-4">
                {marquees.map((marquee) => (
                    <li
                        key={marquee._id}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm"
                    >
                        <div>
                            <p className="text-lg font-medium">{marquee.text}</p>
                            <a
                                href={marquee.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                {marquee.link}
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleEdit(marquee._id)}
                                className="text-green-500 hover:text-green-600"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(marquee._id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MarqueeManager;