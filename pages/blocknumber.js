import dynamic from 'next/dynamic'
const BlockNumber = dynamic(import('../components/Block'), {ssr: false})

export default () => {
  return (
    <div>
      <BlockNumber />
    </div>
  )
}