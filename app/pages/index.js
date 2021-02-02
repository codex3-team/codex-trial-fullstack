import Link from 'next/link'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen py-2">
      <main className="flex flex-col justify-center flex-1 px-20 bg-gray-50">
        <div className="min-w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-evenly">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to try NexJS?</span>
            <span className="block text-indigo-600">Check this out</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/cars"><a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Explore cars
              </a></Link>
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}
