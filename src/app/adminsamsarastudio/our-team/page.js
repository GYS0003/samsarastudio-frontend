import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';
import AdminLayout from '../AdminLayout';
import Career from '@/components/sections/admin/dashboard/job/Career';
import AdminRoute from '@/components/wrappers/AdminRoute';
import TeamMembers from '@/components/sections/admin/dashboard/teammembers/TeamMembers';

export const metadata = {
  title: 'Admin Our Team | GYS Technologies',
  description:
    'Discover the story behind GYS Technologies, our mission, and how we deliver exceptional digital solutions globally.',
};


const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <AdminRoute>
        <PageWrapper>
          <AdminLayout>
            <TeamMembers/>
          </AdminLayout>
        </PageWrapper>
      </AdminRoute>
    </div>
  );
};

export default page;


