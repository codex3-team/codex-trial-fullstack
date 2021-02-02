import NavItem from './item'
import NavSeparator from './separator'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPages, getRandomId } from '../../lib/pag'

export default function Nav({ total = 0 }) {
  const router = useRouter()
  const size = Number(process.env.NEXT_PUBLIC_SIZE)
  const p = Number(router.query.p || 1)
  const pageCount = Math.ceil(total / size)

  // tips
  const start = Number((p - 1) * size)
  const end = start + size
  const prev = (p - 1) <= 0 ? 1 : (p - 1)
  const next = (p + 1) >= pageCount ? pageCount : (p + 1)

  const getNavContents = () => {
    return getPages(p, pageCount)
      .map(i => {
        if (!isNaN(Number(i))) {
          return (
            <NavItem key={getRandomId()} page={i} val={i} current={p}></NavItem>
          )
        } else {
          return (
            <NavSeparator key={getRandomId()}></NavSeparator>
          )
        }
      })
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link href={`/cars?p=${encodeURIComponent(+prev)}`}><a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
          Previous
        </a></Link>
        <Link href={`/cars?p=${encodeURIComponent(+next)}`}><a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
          Next
        </a></Link>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing&nbsp;
            <span className="font-medium">{start + 1}</span>
            &nbsp;to&nbsp;
            <span className="font-medium">{end}</span>
            &nbsp;of&nbsp;
            <span className="font-medium">{total}</span>
            &nbsp;results&emsp;
          </p>
        </div>
        <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          <Link href={`/cars?p=${encodeURIComponent(+prev)}`}><a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
          </a></Link>

          {getNavContents()}

          <Link href={`/cars?p=${encodeURIComponent(+next)}`}><a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
          </a></Link>
          </nav>
      </div>
    </div>
  )
}
