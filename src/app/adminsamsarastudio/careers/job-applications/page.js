import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';
import AdminLayout from '../../AdminLayout';
import Career from '@/components/sections/admin/dashboard/job/Career';
import AdminRoute from '@/components/wrappers/AdminRoute';
import JobList from '@/components/sections/admin/dashboard/job/JobList';

export const metadata = {
  title: 'Admin Careers | GYS Technologies',
  description:
    'Discover the story behind GYS Technologies, our mission, and how we deliver exceptional digital solutions globally.',
};


const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <AdminRoute>
        <PageWrapper>
          <AdminLayout>
            <JobList/>
          </AdminLayout>
        </PageWrapper>
      </AdminRoute>
    </div>
  );
};

export default page;


