import ClientCounter from '~/components/Counter/ClientCounter'
import ServerCounter from '~/components/Counter/ServerCounter'

export default function Component() {
  return (
    <>
      <h1 className='text-2xl font-bold'>Counter</h1>
      <ClientCounter />
      <ServerCounter />
    </>
  )
}
