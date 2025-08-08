import { createFileRoute, Link } from '@tanstack/react-router'

// -----

// * Route
export const Route = createFileRoute('/')({
  component: Home,
})

// * Route Component
function Home() {
  return (
    <>
      <h1 className='text-2xl font-bold'>Home</h1>
      <ul>
        <li>
          <Link to='/counter'>Counter</Link>
        </li>
      </ul>
    </>
  )
}
