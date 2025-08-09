import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <h1 className='text-2xl font-bold'>TanStack Start</h1>
      <ul>
        <li>
          <Link to='/counter'>Counter</Link>
        </li>
      </ul>
    </>
  )
}
