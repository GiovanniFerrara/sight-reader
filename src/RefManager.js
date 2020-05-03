class RefManager {
  constructor (refs) {
    this.refs = Object.keys(refs).length ? refs : {}
  }

  getRefs () {
    const refEls = document.querySelectorAll('[data-ref]')
    for (const refEl of refEls) {
      const ref = refEl.getAttribute('data-ref')
      this.refs[ref] = refEl
    }
  }
}

export default RefManager
