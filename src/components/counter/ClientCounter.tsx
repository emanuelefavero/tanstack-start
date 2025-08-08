import { useState } from 'react'
import Button from '~/components/shared/Button'

export default function ClientCounter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='mt-1'>Client Counter: {count}</p>

      <Button
        onClick={() => {
          setCount((c) => c + 1)
        }}
      >
        Add
      </Button>
    </>
  )
}
