import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
        <h1 className='text-center text-2xl pt-4'> CS 348 Project</h1>
        <div className='pl-10 pt-10 text-xl'> My Introduction</div>
        <div className='pl-10 pt-10 pb-10'> Hello! My name is Shrinivas Venkatesan, and I am a junior studying Computer Science and Data Science.</div>
        <span className='pl-10'> Click here to learn more about me: </span>
        <Link href={"https://shrinivasvenkatesan.com" } className='text-blue-500 hover:underline' target="_blank">My Personal Website</Link>
        <div className='pl-10 pt-10 text-xl'>Some Things I Like:</div>
        <div className='grid grid-cols-3 grid-rows-2 gap-10 pt-10 pl-10 pr-10'>
          <img src='basketball.jpg' className='w-full h-full'></img>
          <img src='programming.webp' className='w-full h-full'></img>
          <img src='gaming.jpg' className='w-full h-full'></img>
          <div className='text-center italic'>Basketball</div>
          <div className='text-center italic'>Programming</div>
          <div className='text-center italic'>Gaming</div>
        </div>
    </>
  )
}
