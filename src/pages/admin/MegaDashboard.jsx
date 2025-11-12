import React from 'react';
export default function AdminDashboard() {
  return (
    <div className='p-10 bg-gradient-to-br from-gray-50 via-white to-emerald-50 min-h-screen'>
      <h1 className='text-4xl font-bold text-emerald-700 mb-4'>ðŸ§‘â€ðŸ’¼ Admin Dashboard</h1>
      <p className='text-slate-600 mb-8'>Manage users, roles, and system configuration.</p>
      <ul className='list-disc pl-6 space-y-2 text-slate-700'>
        <li>User Role Management</li>
        <li>System Configuration Settings</li>
        <li>Audit Logs & Permissions</li>
        <li>Access Control Policy</li>
      </ul>
    </div>
  );
}

