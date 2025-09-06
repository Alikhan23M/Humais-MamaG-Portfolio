'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import AdminLayout from '../../../components/admin/AdminLayout'
import DashboardStats from '../../../components/admin/DashboardStats'
import QuickActions from '../../../components/admin/QuickActions'
import Link from "next/link";
import ClientLoader from '@/components/ui/ClientLoader'

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return <AdminLayout>
    <ClientLoader/>
    </AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your portfolio.</p>
        </div>

        <DashboardStats />
        <QuickActions />

        {/* <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <ul className="space-y-4">
            <li><Link href="/admin/profile">Manage Profile</Link></li>
            <li><Link href="/admin/projects">Manage Projects</Link></li>
            <li><Link href="/admin/services">Manage Services</Link></li>
            <li><Link href="/admin/testimonials">Manage Testimonials</Link></li>
            <li><Link href="/admin/contact">View Contacts</Link></li>
          </ul>
        </div> */}
      </div>
    </AdminLayout>
  )
}