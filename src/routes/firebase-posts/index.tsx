import { createFileRoute } from '@tanstack/react-router'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '~/lib/firebase'
import type { Post } from './-types'

export const Route = createFileRoute('/firebase-posts/')({
  component: RouteComponent,
  loader: async () => {
    // Read posts from Firestore
    const snapshot = await getDocs(collection(db, 'posts'))
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },
})

function RouteComponent() {
  const posts: Post[] = Route.useLoaderData()

  return (
    <>
      <h1>Firebase Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={`post-${index}`}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
