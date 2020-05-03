import Audio from './Audio'
import Piano from './Piano'
import RefManager from './RefManager'

const start = () => {
  // build the refs after rendering the piano
  const refManager = new RefManager()
  refManager.getRefs()

  const piano = new Piano(refManager.refs)
  piano.render()
  refManager.getRefs()

  const audio = new Audio(refManager.refs)
  audio.start()
}

export default start
