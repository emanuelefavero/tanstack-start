import ClientCounter from '~/components/Counter/ClientCounter'
import ServerCounter from '~/components/Counter/ServerCounter'

export default function Counter() {
  return (
    <>
      <ClientCounter />
      <ServerCounter />
    </>
  )
}
