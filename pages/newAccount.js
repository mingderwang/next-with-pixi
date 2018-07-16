import dynamic from 'next/dynamic'
const NewAccount = dynamic(import('../components/NewAccount'), {ssr: false})

export default () => {
  return (
    <div>
      <NewAccount />
    </div>
  )
}