import Audio from './Audio'
import Piano from './Piano'
import RefManager from './RefManager'
import Graph from './Graph'

const start = () => {
  // build the refs after rendering the piano
  const refManager = new RefManager()
  refManager.getRefs()

  const piano = new Piano(refManager.refs)
  piano.render()
  refManager.getRefs()

  const graph = new Graph(refManager.refs['graph'])
  const audio = new Audio(refManager.refs, graph)
  audio.start()
}

export default start