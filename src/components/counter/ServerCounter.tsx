import { useLoaderData, useRouter } from '@tanstack/react-router'
import Button from '~/components/shared/Button'
import { updateCount } from '~/server/count'

export default function ClientCounter() {
  const router = useRouter()
  const { count } = useLoaderData({ from: '/counter/' })

  return (
    <>
      <p className='mt-2'>Server Counter: {count}</p>

      <Button
        onClick={() => {
          updateCount({ data: 1 }).then(() => {
            router.invalidate()
          })
        }}
      >
        Add
      </Button>
    </>
  )
}
