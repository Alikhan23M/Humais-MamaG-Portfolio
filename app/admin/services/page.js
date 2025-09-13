"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../../components/admin/AdminLayout";
import * as FiIcons from "react-icons/fi"; // Feather icons
import * as AiIcons from "react-icons/ai"; // Ant icons
import * as BsIcons from "react-icons/bs"; // Bootstrap icons
import ClientLoader from "@/components/ui/ClientLoader";
import toast from "react-hot-toast";
import ConfirmDialog from "@/components/ui/ConfirmDialog";


export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    features: "",
    isActive: true,
  });
  const [iconSearch, setIconSearch] = useState("");

  const router = useRouter();

  const ALL_ICONS = { ...FiIcons, ...AiIcons, ...BsIcons };


  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }

    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [router]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      icon: "",
      features: "",
      isActive: true,
    });
    setEditingService(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingService ? "PUT" : "POST";
      const url = editingService
        ? `/api/services/${editingService._id}`
        : "/api/services";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          features: form.features.split(",").map((f) => f.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed to save service");

      toast.success(
        editingService ? "Service updated successfully" : "Service created"
      );
      resetForm();
      const updated = await fetch("/api/services").then((r) => r.json());
      setServices(updated);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async()=>{
    try {
      const res = await fetch(`/api/services/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        toast.error('Failed to delte the service')
      }
      toast.success("Service deleted");
      setServices((prev) => prev.filter((s) => s._id !== deleteId));
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete service");
    }
    finally{
      setShowConfirm(false);
      setDeleteId(null);
    }
  }

  const handleEdit = (service) => {
    setEditingService(service);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.join(", "),
      isActive: service.isActive,
    });
  };

  const filteredIcons = Object.keys(ALL_ICONS).filter((iconName) =>
    iconName.toLowerCase().includes(iconSearch.toLowerCase())
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <ClientLoader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <ConfirmDialog
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        message="Are you sure you want to delete this Service? This action cannot be undone."
      />
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
          <p className="text-gray-600 mt-2">
            Add, edit or delete services that appear on your portfolio.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-6 space-y-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {editingService ? "Edit Service" : "Add New Service"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Icon
            </label>
            <input
              type="text"
              placeholder="Search icons..."
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 mb-2"
            />
            <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto border p-2 rounded">
              {filteredIcons.map((iconName) => {
                const IconComponent = ALL_ICONS[iconName];
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setForm({ ...form, icon: iconName })}
                    className={`p-2 rounded border flex justify-center items-center transition ${form.icon === iconName
                        ? "bg-primary-600 text-white border-primary-600"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    <IconComponent size={20} />
                  </button>
                );
              })}
            </div>
            {form.icon && (
              <p className="mt-2 text-sm text-gray-600">
                Selected Icon: <span className="font-medium">{form.icon}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features (comma separated)
            </label>
            <input
              type="text"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="SEO Optimized, Research-based, ..."
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span className="text-sm text-gray-700">Active</span>
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingService
                  ? "Update Service"
                  : "Create Service"}
            </button>
            {editingService && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Services List */}
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const IconComponent = ALL_ICONS[service.icon] || null;
            return (
              <div
                key={service._id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-2 items-center">
                    {IconComponent && <IconComponent size={24} />}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-600 mt-2">
                  {service.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-gray-500">
                  Icon: {service.icon} |{" "}
                  {service.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
