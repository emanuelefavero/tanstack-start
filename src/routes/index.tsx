import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <h1>TanStack Start</h1>
      <ul>
        <li>
          <Link to='/test'>Test</Link>
        </li>
        <li>
          <Link to='/counter'>Counter</Link>
        </li>
        <li>
          <Link to='/firebase-posts'>Firebase Posts</Link>
        </li>
        <li>
          <Link to='/shopping-cart'>Shopping Cart</Link>
        </li>
      </ul>
    </>
  )
}
