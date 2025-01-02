"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {sidebarLinks} from '@/constants'
import { usePathname,useRouter } from 'next/navigation'
import { SignedIn, SignOutButton } from '@clerk/nextjs'

const LeftSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6"
      key={sidebarLinks}
      >
        {
          sidebarLinks.map((link) => {
            // here we will check ki konsas link active hai
         const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
         
            
            return(
            
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-[#1E3A8A]' } leftsidebar_link`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
            
            
          )})
        }
        
        </div>
        <div className='mt-10 px-10 flex gap-6 '>
         
        <SignedIn>
            <SignOutButton 
            signOutOptions={() => {
              router.push('/onboarding')
            }}
            >
              <div className='flex cursor-pointer'>
                <Image
                  src="/assets/logout.svg"
                  alt="Logout"
                  width={24}
                  height={24}
                />
              </div>
        
          
          </SignOutButton>
          <p className="text-light-1 max-lg:hidden">LogOut</p>
          </SignedIn>
        </div>

            </section>
  )
}

export default LeftSideBar
LeftSideBar