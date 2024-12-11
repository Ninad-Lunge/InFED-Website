// import React, { useState, useEffect } from 'react';
// import { Plus, Edit2, Trash2 } from 'lucide-react';

// const InitiativesCard = () => {
//   const [initiatives, setInitiatives] = useState([]);
//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const [newInitiative, setNewInitiative] = useState({
//     title: '',
//     image: '',
//     description: ''
//   });

//   useEffect(() => {
//     const fetchInitiatives = async () => {
//       try {
//         const response = await fetch('https://infed-website-kkva.onrender.com/api/get-initiatives');
//         const data = await response.json();
//         setInitiatives(data);
//       } catch (error) {
//         console.error('Error fetching initiatives:', error);
//       }
//     };

//     fetchInitiatives();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewInitiative(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://infed-website-kkva.onrender.com/api/add-initiative', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newInitiative),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setInitiatives(prev => [...prev, newInitiative]);
//         setIsAddingNew(false);
//         setNewInitiative({ title: '', image: '', description: '' });
//       }
//     } catch (error) {
//       console.error('Error adding initiative:', error);
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
//       {/* Add New Initiative Button */}
//       {/* <button 
//         onClick={() => setIsAddingNew(!isAddingNew)}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 mb-4 hover:bg-blue-600"
//       >
//         <Plus className="w-4 h-4" />
//         Add New Initiative
//       </button> */}

//       {/* Add New Initiative Form */}
//       {isAddingNew && (
//         <div className="bg-white rounded-lg shadow-md mb-4 p-4">
//           <h3 className="font-semibold mb-4">Add New Initiative</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={newInitiative.title}
//                 onChange={handleInputChange}
//                 required
//                 placeholder="Enter initiative title"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Image URL</label>
//               <input
//                 type="text"
//                 name="image"
//                 value={newInitiative.image}
//                 onChange={handleInputChange}
//                 required
//                 placeholder="Enter image URL"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Description</label>
//               <textarea
//                 name="description"
//                 value={newInitiative.description}
//                 onChange={handleInputChange}
//                 required
//                 placeholder="Enter initiative description"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
//               />
//             </div>
//             <div className="flex space-x-2">
//               <button 
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//               >
//                 Submit
//               </button>
//               <button 
//                 type="button" 
//                 onClick={() => setIsAddingNew(false)}
//                 className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Display Initiatives */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {initiatives.map((initiative, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img 
//               src={initiative.image} 
//               alt={initiative.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg mb-2">{initiative.title}</h3>
//               <p className="text-gray-600 text-sm mb-4">{initiative.description}</p>
//               <div className="flex justify-end space-x-2">
//                 <button className="p-2 hover:bg-gray-100 rounded-md">
//                   <Edit2 className="w-4 h-4" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-md">
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InitiativesCard;