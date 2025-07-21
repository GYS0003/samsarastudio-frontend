'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    updateProjectInCategory,
    deleteProjectFromCategory,
    addProjectToCategory,
} from '@/services/apis';
import { X, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const initialProject = {
    title: '',
    description: '',
    techLink: '',
    marketingLink: '',
    image: null,
};

const Portfolio = () => {
    const [categories, setCategories] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [panelMode, setPanelMode] = useState('create-category');
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeProject, setActiveProject] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [projectForm, setProjectForm] = useState(initialProject);
    const [imagePreview, setImagePreview] = useState(null); // Added for image preview

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await getAllCategories();
            setCategories(data);
        } finally {
            setLoading(false);
        }
    };

    const toggleCategory = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const openCreateCategory = () => {
        setCategoryName('');
        setPanelMode('create-category');
        setShowPanel(true);
    };

    const openEditCategory = (cat) => {
        setActiveCategory(cat);
        setCategoryName(cat.name);
        setPanelMode('edit-category');
        setShowPanel(true);
    };

    const openCreateProject = (cat) => {
        setActiveCategory(cat);
        setProjectForm(initialProject);
        setImagePreview(null); // Reset preview
        setPanelMode('create-project');
        setShowPanel(true);
    };

    const openEditProject = (cat, proj) => {
        setActiveCategory(cat);
        setActiveProject(proj);
        setProjectForm({
            title: proj.title,
            description: proj.description,
            techLink: proj.techLink,
            marketingLink: proj.marketingLink,
            image: null,
        });
        setImagePreview(proj.imageUrl); // Set existing image as preview
        setPanelMode('edit-project');
        setShowPanel(true);
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (panelMode === 'create-category') {
                await createCategory({ name: categoryName });
            } else {
                await updateCategory(activeCategory._id, { name: categoryName });
            }
            await fetchCategories();
            setShowPanel(false);
        } finally {
            setLoading(false);
        }
    };

    // Handle image selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        
        // Update form state
        setProjectForm(prev => ({ ...prev, image: file }));
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', projectForm.title);
        formData.append('description', projectForm.description);
        formData.append('techLink', projectForm.techLink);
        formData.append('marketingLink', projectForm.marketingLink);
        if (projectForm.image) formData.append('image', projectForm.image);

        try {
            if (panelMode === 'create-project') {
                await addProjectToCategory(activeCategory._id, formData);
            } else {
                await updateProjectInCategory(activeCategory._id, activeProject._id, formData);
            }
            await fetchCategories();
            setShowPanel(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="pt-16 px-4 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Portfolio</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center"
                    onClick={openCreateCategory}
                >
                    <Plus size={16} className="mr-2" />
                    Create Category
                </button>
            </div>

            {loading && (
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
            )}

            <div className="space-y-4">
                {categories.map((cat) => (
                    <div key={cat._id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-md bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                        <div className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleCategory(cat._id)}
                        >
                            <h3 className="font-semibold select-none text-lg">
                                {cat.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openCreateProject(cat)
                                    }}
                                >
                                    + Add Project
                                </button>
                                <button
                                    className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEditCategory(cat)
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteCategory(cat._id).then(fetchCategories)
                                    }}
                                >
                                    Delete
                                </button>
                                {expanded[cat._id] ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>

                        {expanded[cat._id] && cat.projects && (
                            <div className="mt-4 overflow-auto">
                                <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm text-left">
                                    <thead className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                        <tr>
                                            <th className="p-2 border border-gray-300 dark:border-gray-700">Project Title</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-700">Description</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-700">Marketing Link</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-700">Tech Link</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-700">Image</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-700">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                        {cat.projects.map((proj) => (
                                            <tr key={proj._id}>
                                                <td className="p-2 border border-gray-300 dark:border-gray-700">{proj.title}</td>
                                                <td className="p-2 border border-gray-300 dark:border-gray-700">{proj.description}</td>
                                                <td className="p-2 border border-gray-300 dark:border-gray-700 break-words">
                                                    {proj?.marketingLink ? (
                                                        <a
                                                            href={proj.marketingLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            Link
                                                        </a>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                                <td className="p-2 border border-gray-300 dark:border-gray-700 break-words">
                                                    {proj?.techLink ? (
                                                        <a
                                                            href={proj.techLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline"
                                                        >
                                                            Link
                                                        </a>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>

                                                <td className="p-2 border border-gray-300 dark:border-gray-700">
                                                    {proj.imageUrl && (
                                                        <Image
                                                            src={proj.imageUrl}
                                                            alt={proj.title}
                                                            width={100}
                                                            height={80}
                                                            className="rounded"
                                                        />
                                                    )}
                                                </td>
                                                <td className="p-2 border border-gray-300 dark:border-gray-700">
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                                            onClick={() => openEditProject(cat, proj)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                            onClick={() =>
                                                                deleteProjectFromCategory(cat._id, proj._id).then(fetchCategories)
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showPanel && (
                <div className="fixed top-0 mt-16 right-0 h-full w-full sm:w-[500px] bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700 shadow-xl p-4 z-50 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold capitalize">
                            {panelMode.replace('-', ' ')}
                        </h3>
                        <X 
                            className="cursor-pointer" 
                            onClick={() => {
                                setShowPanel(false);
                                setImagePreview(null); // Reset preview on close
                            }} 
                        />
                    </div>

                    {panelMode.includes('category') ? (
                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                                placeholder="Category Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Category'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleProjectSubmit} className="space-y-4">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                                placeholder="Title"
                                value={projectForm.title}
                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                required
                            />
                            <textarea
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                                placeholder="Description"
                                value={projectForm.description}
                                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                rows={3}
                            />
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                                placeholder="Tech Link"
                                value={projectForm.techLink}
                                onChange={(e) => setProjectForm({ ...projectForm, techLink: e.target.value })}
                            />
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                                placeholder="Marketing Link"
                                value={projectForm.marketingLink}
                                onChange={(e) => setProjectForm({ ...projectForm, marketingLink: e.target.value })}
                            />
                            
                            {/* Image upload section */}
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Project Image
                                </label>
                                <input
                                    type="file"
                                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white"
                                    onChange={handleImageChange}
                                    required={panelMode === 'create-project' && !imagePreview}
                                />
                                
                                {/* Image preview */}
                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm mb-2">Preview:</p>
                                        <div className="relative w-40 h-32 border rounded overflow-hidden">
                                            <Image
                                                src={imagePreview}
                                                alt="Project preview"
                                                fill
                                                className="object-contain"
                                                onLoad={() => {
                                                    // Revoke the object URL to avoid memory leaks
                                                    if (imagePreview.startsWith('blob:')) {
                                                        URL.revokeObjectURL(imagePreview);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 mb-30 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Project'}
                            </button>
                            
                        </form>
                    )}
                </div>
            )}
        </section>
    );
};

export default Portfolio;