import Audio from './Audio'
import Piano from './Piano'
import RefManager from './RefManager'

const start = () => {
  // build refs object
  const refEls = document.querySelectorAll('[data-ref]')
  const refs = {}

  for (const refEl of refEls) {
    const ref = refEl.getAttribute('data-ref')
    refs[ref] = refEl
  }

  const piano = new Piano()
  piano.render()

  // build the refs after rendering the piano
  const refManager = new RefManager(refs)
  refManager.getRefs()

  const audio = new Audio(refs)
  audio.start()
  console.log('start')
}
export default start
