import dynamic from 'next/dynamic'
const Pixi = dynamic(import('../components/Pixi'), {ssr: false})

export default () => {
  return (
    <div>
      <Pixi />
    </div>
  )
}
