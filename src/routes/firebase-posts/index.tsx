import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { useState } from 'react'
import Button from '~/components/shared/Button'
import { db } from '~/lib/firebase'
import type { Post } from './-types'

// Create new post
const createPost = createServerFn({ method: 'POST' })
  .validator((data: Post) => data)
  .handler(async ({ data }) => {
    const { title, content } = data

    const docRef = await addDoc(collection(db, 'posts'), { title, content })
    return { id: docRef.id, title, content }
  })

// Delete post by title
const deletePost = createServerFn({ method: 'POST' })
  .validator((data: { title: string }) => data)
  .handler(async ({ data }) => {
    const { title } = data
    const postsRef = collection(db, 'posts')
    const q = query(postsRef, where('title', '==', title))
    const snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    })
    return { success: true }
  })

export const Route = createFileRoute('/firebase-posts/')({
  component: RouteComponent,
  loader: async () => {
    // Read posts from Firestore
    const snapshot = await getDocs(collection(db, 'posts'))
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },
})

// TODO fix: new posts not added to the top but random order
// TODO refactor into separate components/files

function RouteComponent() {
  const router = useRouter()
  const posts: Post[] = Route.useLoaderData()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createPost({ data: { title, content } })
      router.invalidate()
    } catch (error) {
      setError('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Firebase Posts</h1>
      {/* Create new post */}
      <form
        onSubmit={handleSubmit}
        className='mt-4 flex max-w-80 flex-col gap-2'
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required
          className='rounded-full border px-4 py-2'
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
          required
          className='rounded-2xl border px-4 py-2'
        />
        <Button type='submit' disabled={loading}>
          {loading ? 'Posting...' : 'Add Post'}
        </Button>

        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>

      {/* Posts */}
      <ul className='mt-8 flex flex-col gap-2'>
        {posts.map((post, index) => (
          <li key={`post-${index}`}>
            <h2 className='text-xl font-bold'>{post.title}</h2>
            <p className='text-slate-600 dark:text-slate-400'>{post.content}</p>
            <Button
              className='mt-2'
              onClick={async () => {
                await deletePost({ data: { title: post.title } })
                router.invalidate()
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}
