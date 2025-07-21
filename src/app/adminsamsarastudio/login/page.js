import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';

import Login from '@/components/sections/admin/login/Login';
export const metadata = {
  title: 'Admin Login | GYS Technologies',
  description:
    'Discover the story behind GYS Technologies, our mission, and how we deliver exceptional digital solutions globally.',
 
};


const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PageWrapper>
        <Login/>
      </PageWrapper>
    </div>
  );
};

export default page;


