"use client"
import { sidebarLinks } from '@/constants'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {/* we have bottom bar for mobile navagation tooooo */}
        {
          sidebarLinks.map((link) => {
            // here we will check ki konsas link active hai
         const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
         
            
            return(
            
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && 'bg-[#1E3A8A]' } leftsidebar_link`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={30}
                height={30}
              />
              <p className="text-subtle-medium
              text-light-1 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
            </Link>
            
            
          )})
        }
        </div>  
      
    </section>
  )
}

export default BottomBar
