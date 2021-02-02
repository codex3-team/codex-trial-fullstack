import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Menu() {
    const paths = ['/cars', '/new']
    const router = useRouter()
    const isActiveList = paths[0] === router.pathname
    const isActiveNew = paths[1] === router.pathname

    return (
        <nav className="bg-gray-800 main-menu">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" className="h-8 w-auto small-truck">
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block ml-12">
                  <div className="flex space-x-4">
                    <Link href={paths[0]}><a className={"px-3 py-2 rounded-md text-sm font-medium "
                    + (isActiveList ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white')}>List of cars</a></Link>
                    <Link href={paths[1]}><a className={"px-3 py-2 rounded-md text-sm font-medium "
                    + (isActiveNew ? 'bg-gray-900 text-white ' : 'text-gray-300 hover:bg-gray-700 hover:text-white')}>Add a new car</a></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
    )
}
