import Dashboard from '@/components/sections/admin/dashboard/Dashboard';
import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';
import AdminLayout from '../AdminLayout';
import AdminRoute from '@/components/wrappers/AdminRoute';

export const metadata = {
  title: 'Admin Dashboard | GYS Technologies',
  description:
    'Discover the story behind GYS Technologies, our mission, and how we deliver exceptional digital solutions globally.',
 
};


const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
        <AdminRoute>
            <PageWrapper>
        <AdminLayout>
        <Dashboard/>
        </AdminLayout>
      </PageWrapper>
      </AdminRoute>
    </div>
  );
};

export default page;


