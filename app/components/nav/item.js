import Link from 'next/link'

export default function NavItem({ val, page, current }) {
    return (
        <Link href={`/cars?p=${encodeURIComponent(page)}`}><a className={"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium "
        + (page === current ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-50')}>{ val }</a></Link>
    )
}
