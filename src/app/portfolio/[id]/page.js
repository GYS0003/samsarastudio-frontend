import React from 'react'
import PageWrapper from '@/components/wrappers/PageWrapper';
import Portfolio from '@/components/sections/portfolio/Portfolio';
import FeaturedProjects from '@/components/sections/portfolio/FeaturedProjects'



const page = () => {
  return (
     <div className="font-[family-name:var(--font-geist-sans)]">
      <PageWrapper>
        <FeaturedProjects  />
      </PageWrapper>
    </div>
  )
}

export default page
