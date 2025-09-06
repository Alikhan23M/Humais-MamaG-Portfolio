"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../../components/admin/AdminLayout";
import ClientLoader from "@/components/ui/ClientLoader";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState({ search: "", status: "all" });
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) return router.push("/admin");

    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [router]);

  const toggleRead = async (id, current) => {
    setSaving(true);
    try {
      await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !current }),
      });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, isRead: !current } : msg
        )
      );
    } catch (err) {
      console.error("Error updating message:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setSaving(true);
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    } finally {
      setSaving(false);
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        msg.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        msg.email.toLowerCase().includes(filter.search.toLowerCase()) ||
        msg.subject.toLowerCase().includes(filter.search.toLowerCase());
      const matchesStatus =
        filter.status === "all" ||
        (filter.status === "read" && msg.isRead) ||
        (filter.status === "unread" && !msg.isRead);
      return matchesSearch && matchesStatus;
    });
  }, [messages, filter]);

  if (isLoading) {
    return (
      <AdminLayout>
          <ClientLoader/>
          </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Messages</h1>
          <p className="text-gray-600 mt-2">
            View, mark as read/unread, delete, or filter messages.
          </p>
        </div>

        {/* Filter/Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
        </div>

        {/* Messages Table */}
        <div className="bg-white shadow rounded-xl border border-gray-200 overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-6 text-gray-500">
                    No messages found.
                  </td>
                </tr>
              )}
              {filteredMessages.map((msg) => (
                <tr
                  key={msg._id}
                  className={`border-b transition-colors ${
                    msg.isRead ? "bg-gray-50" : "bg-yellow-50 hover:bg-yellow-100"
                  }`}
                >
                  <td className="p-3 border">{msg.name}</td>
                  <td className="p-3 border">{msg.email}</td>
                  <td className="p-3 border">{msg.subject}</td>
                  <td className="p-3 border">{msg.message}</td>
                  <td className="p-3 border">
                    {msg.isRead ? (
                      <span className="text-green-600 font-semibold">Read</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Unread</span>
                    )}
                  </td>
                  <td className="p-3 border flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleRead(msg._id, msg.isRead)}
                      disabled={saving}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      {msg.isRead ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      disabled={saving}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
