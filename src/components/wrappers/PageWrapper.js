'use client'

import Footer from '@/components/layout/footer/Footer'
import { usePathname } from 'next/navigation'

const PageWrapper = ({ children }) => {
  const pathname = usePathname()

  return (
    < div className='scrollbar-hide '>
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-white dark:bg-black bg-gradient-dark-figma " />
      </div>

      <main className="min-h-screen bg-white dark:bg-black/80  scrollbar-hide">{children}</main>
    </div>
  )
}

export default PageWrapper