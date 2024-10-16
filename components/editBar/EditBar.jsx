import React from 'react'
import Link from 'next/link'

export default function EditBar() {
  return (
    <div className='flex justify-center' >
        <div className='flex text-black md:w-[50vw] w-[90vw]  h-[6vh] justify-center gap-10 font-bold rounded-xl shadow-xl  '>
            <Link href='/editProfile/gallery' className='' >Gallery</Link>
            <Link href='/editProfile/profile' className='' >Profile</Link>
            <Link href='/editProfile/service' className='' >Service</Link>
            
        </div>
    </div>
  )
}
