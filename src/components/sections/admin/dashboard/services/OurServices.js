"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/services/apis";

const initialForm = {
  id: "",
  hero: {
    title: "",
    subtitle: "",
  },
  intro: {
    title: "",
    description: "",
    imageUrl: "",
  },
  features: {
    title: "",
    items: [{ title: "", description: "" }, { title: "", description: "" }],
  },
  steps: {
    title: "",
    items: [{ title: "", description: "" }, { title: "", description: "" }],
  },
};

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const keys = name.split(".");
    if (keys.length === 2) {
      const [section, field] = keys;
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else if (name.startsWith("features.items")) {
      const [_, __, index, field] = name.split(".");
      const updatedItems = [...formData.features.items];
      updatedItems[index][field] = value;
      setFormData((prev) => ({
        ...prev,
        features: { ...prev.features, items: updatedItems },
      }));
    } else if (name.startsWith("steps.items")) {
      const [_, __, index, field] = name.split(".");
      const updatedItems = [...formData.steps.items];
      updatedItems[index][field] = value;
      setFormData((prev) => ({
        ...prev,
        steps: { ...prev.steps, items: updatedItems },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: [...prev.features.items, { title: "", description: "" }],
      },
    }));
  };

  const handleRemoveFeature = (index) => {
    const updatedItems = [...formData.features.items];
    updatedItems.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, items: updatedItems },
    }));
  };

  const handleAddStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: {
        ...prev.steps,
        items: [...prev.steps.items, { title: "", description: "" }],
      },
    }));
  };

  const handleRemoveStep = (index) => {
    const updatedItems = [...formData.steps.items];
    updatedItems.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      steps: { ...prev.steps, items: updatedItems },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const fd = new FormData();
      fd.append("id", formData.id);
      fd.append("hero", JSON.stringify(formData.hero));
      fd.append("intro", JSON.stringify(formData.intro));
      fd.append("features", JSON.stringify(formData.features));
      fd.append("steps", JSON.stringify(formData.steps));
      if (imageFile) fd.append("image", imageFile);

      if (editingId) {
        await updateService(formData.id, fd);
        setMessage("Service updated successfully.");
      } else {
        await createService(fd);
        setMessage("Service created successfully.");
      }

      resetForm();
      setShowForm(false); // Close form after submission
      fetchServices();
    } catch (err) {
      setMessage(err.message || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (service) => {
    setFormData(service);
    setEditingId(service._id);
    setImagePreview(service.intro?.imageUrl || null);
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this service?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (err) {
        setMessage(err.message);
      }
    }
  };

  const resetForm = () => {
    // Clear image cache if it's a blob URL
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }

    setFormData(initialForm);
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setMessage("");
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="flex flex-col pt-16 lg:flex-row gap-6 p-4 max-w-7xl mx-auto min-h-screen">
      {/* Main Content - Table */}
      <div className={`${showForm ? "lg:w-2/3" : "w-full"}`}>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Manage Services
            </h2>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              Add New Service
            </button>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded ${message.includes("Error")
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
                  : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                }`}
            >
              {message}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-3 border border-gray-200 dark:border-gray-600">ID</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-600">Hero Title</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-600">Intro Image</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-600">Features</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-600">Steps</th>
                  <th className="p-3 border border-gray-200 dark:border-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr
                    key={s._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3 border border-gray-200 dark:border-gray-600">{s.id}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-600">{s.hero?.title}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-600">
                      {s.intro?.imageUrl ? (
                        <img
                          src={s.intro.imageUrl}
                          className="h-10 w-10 object-cover rounded"
                          alt="Service preview"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-3 border border-gray-200 dark:border-gray-600">{s.features?.items?.length || 0}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-600">{s.steps?.items?.length || 0}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-600">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="text-blue-600 border border-blue-600 px-3 py-1 text-sm rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) =>{
                            e.stopPropagation();
                            handleDelete(s._id)
                            }}
                          className="text-red-600 border border-red-600 px-3 py-1 text-sm rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No services found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Form Sidebar - Scrollable */}
      {showForm && (
        <div className="lg:w-1/3 flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)]">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Service ID (slug)
                  </label>
                  <input
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="service-id"
                    required
                    className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Hero Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Hero Section</h4>
                  <div className="space-y-2">
                    {["title", "subtitle"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-300">
                          {field}
                        </label>
                        <input
                          name={`hero.${field}`}
                          value={formData.hero[field]}
                          onChange={handleChange}
                          placeholder={`Enter hero ${field}`}
                          className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intro Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Intro Section</h4>
                  <div className="space-y-2">
                    {["title", "description"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-300">
                          {field}
                        </label>
                        {field === "description" ? (
                          <textarea
                            name={`intro.${field}`}
                            value={formData.intro[field]}
                            onChange={handleChange}
                            placeholder={`Enter intro ${field}`}
                            rows={3}
                            className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                          />
                        ) : (
                          <input
                            name={`intro.${field}`}
                            value={formData.intro[field]}
                            onChange={handleChange}
                            placeholder={`Enter intro ${field}`}
                            className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                          />
                        )}
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Image
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImageFile(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                        className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-24 w-24 object-cover rounded border border-gray-300 dark:border-gray-600"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Features</h4>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Features Title
                    </label>
                    <input
                      name="features.title"
                      value={formData.features.title}
                      onChange={handleChange}
                      placeholder="Enter features title"
                      className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white mb-3"
                    />
                  </div>

                  <div className="space-y-3">
                    {formData.features.items.map((item, i) => (
                      <div
                        key={i}
                        className="border rounded p-3 relative border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(i)}
                          className="absolute top-1 right-1 text-red-500 hover:text-red-700 transition-colors"
                          disabled={formData.features.items.length <= 2}
                        >
                          ×
                        </button>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Title
                            </label>
                            <input
                              name={`features.items.${i}.title`}
                              value={item.title}
                              onChange={handleChange}
                              placeholder={`Feature title ${i + 1}`}
                              className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Description
                            </label>
                            <textarea
                              name={`features.items.${i}.description`}
                              value={item.description}
                              onChange={handleChange}
                              placeholder={`Feature description ${i + 1}`}
                              rows={2}
                              className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
                >
                  + Add Feature
                </button>

                {/* Steps Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Steps</h4>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Steps Title
                    </label>
                    <input
                      name="steps.title"
                      value={formData.steps.title}
                      onChange={handleChange}
                      placeholder="Enter steps title"
                      className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white mb-3"
                    />
                  </div>
                  <div className="space-y-3">
                    {formData.steps.items.map((item, i) => (
                      <div
                        key={i}
                        className="border rounded p-3 relative border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(i)}
                          className="absolute top-1 right-1 text-red-500 hover:text-red-700 transition-colors"
                          disabled={formData.steps.items.length <= 2}
                        >
                          ×
                        </button>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Title
                            </label>
                            <input
                              name={`steps.items.${i}.title`}
                              value={item.title}
                              onChange={handleChange}
                              placeholder={`Step title ${i + 1}`}
                              className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                              Description
                            </label>
                            <textarea
                              name={`steps.items.${i}.description`}
                              value={item.description}
                              onChange={handleChange}
                              placeholder={`Step description ${i + 1}`}
                              rows={2}
                              className="p-2 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
                >
                  + Add Step
                </button>
              </form>
            </div>
            {/* Form Actions - Fixed at bottom */}
            <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loader border-white border-t-transparent border-2 w-4 h-4 rounded-full animate-spin" />
                      {editingId ? "Updating..." : "Creating..."}
                    </>
                  ) : editingId ? "Update Service" : "Create Service"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurServices;