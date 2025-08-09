import { Link, useLocation } from '@tanstack/react-router'

export default function Component() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header>
      {isHome ? (
        <div className='font-medium'>Home</div>
      ) : (
        <Link to='/'>Go Home</Link>
      )}
    </header>
  )
}
