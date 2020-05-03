import SmartArray from './SmartArray'
import {
  KEYS
} from './constants'
import { ElementsRefs } from './RefManager'
import Graph from './Graph'

class Audio {
  pitchSamples: SmartArray
  elementsRefs: ElementsRefs
  graph: Graph

  constructor(elementsRefs, graph) {
    this.pitchSamples = new SmartArray()
    this.elementsRefs = elementsRefs
    this.graph = graph
  }

  drawPitchMarkers(canvas2Context) {
    canvas2Context.fillStyle = 'firebrick'
    canvas2Context.font = '14px serif'
    for (let i = 25; i < 1200; i += 25) {
      const pos = i / 2
      canvas2Context.fillRect(65, pos, 4, 1)
      canvas2Context.fillText(i.toString(), 70, pos + 5)
    }
  }

  start():void {
    let audioReady = false
    let loudEnough = false
    const MIN_VOLUME = 10

    const ref = document.location.pathname.replace(/^\//, '')

    const audioContext = new window.AudioContext()
    const audioEl = this.elementsRefs[ref] || document.querySelector('audio')
    const analyser = audioContext.createAnalyser()

    const {
      sampleRate
    } = audioContext

    analyser.fftSize = 2048
    analyser.minDecibels = -90
    analyser.maxDecibels = -10
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const canvasContext = this.elementsRefs.canvas.getContext('2d')

    const userMediaConstraints = {
      audio: true
    }

    const getUserMediaSuccess = stream => {
      const audioSource = audioContext.createMediaStreamSource(stream)
      // this.elementsRefs.mic_audio.src = audioSource

      audioSource.connect(analyser)
      // comment/uncomment to play to speakers
      // audioSource.connect(audioContext.destination); // out to the speakers
      audioReady = true
    }

    const getUserMediaError = err => {
      err && console.error(err)
    }

    navigator.getUserMedia(userMediaConstraints, getUserMediaSuccess, getUserMediaError)

    let lastItem = 0
    const STEPS_THRESHOLD = 5

    const getKey = (): {pos: number; hz: number; name: string} => {
      const pitch = this.pitchSamples.mode
      let closestLower = KEYS[0]
      let closestHigher = KEYS[KEYS.length - 1]

      for (let i = 0; i < KEYS.length; i++) {
        if (KEYS[i].hz < pitch) closestLower = KEYS[i]
        if (KEYS[i].hz > pitch) {
          closestHigher = KEYS[i]
          break // going from low to high so we can stop here
        }
      }

      const distanceToLower = Math.abs(pitch - closestLower.hz)
      const distanceToHigher = Math.abs(pitch - closestHigher.hz)

      return Math.min(distanceToLower, distanceToHigher) === distanceToLower ?
        closestLower :
        closestHigher
    }

    const renderKey = ():void => {
      const key = getKey()
      this.graph.addPoint(Date.now(), key.pos)

      const keyEls = document.querySelectorAll('[piano-key]')

      for (const keyEl of keyEls) {
        keyEl.classList.remove('piano-key--lit')
      }

      const pressedKeyEl = this.elementsRefs[`key_${key.pos}`]
      pressedKeyEl.classList.add('piano-key--lit')

      this.pitchSamples.empty()
    }

    const drawWave = ():void => {
      if (!loudEnough) return
      canvasContext.fillStyle = 'firebrick'
      analyser.getByteTimeDomainData(dataArray)
      canvasContext.fillRect(0, 128, 1024, 2)

      let lastPos = 0
      dataArray.forEach((item, i) => {
        if (i > 0 && i < dataArray.length && item > 128 && lastItem <= 128) {
          const elapsedSteps = i - lastPos
          lastPos = i

          if (elapsedSteps > STEPS_THRESHOLD) {
            const hertz = 1 / (elapsedSteps / sampleRate) // sampleRate = 44100
            this.pitchSamples.push(hertz)
          }
        }

        canvasContext.fillRect(i, item, 2, 2) // point in the wave

        lastItem = item
      })
    }

    const drawFreq = ():void => {
      canvasContext.fillStyle = 'lightgray'
      analyser.getByteFrequencyData(dataArray)
      let volumeTotal = 0
      canvasContext.fillRect(0, (300 - (256 / 10)), 1024, 1)

      dataArray.forEach((item, i) => {
        canvasContext.fillRect(i, 300 - item, 1, item)
        volumeTotal += item
      })

      const volume = volumeTotal / dataArray.length
      const nowLoudEnough = volume > MIN_VOLUME

      if (loudEnough !== nowLoudEnough) {
        this.pitchSamples.empty()
      }

      loudEnough = nowLoudEnough
      this.elementsRefs.db.insertAdjacentText('afterend', `${volume}`)
    }

    const renderAudio = (): void => {
      window.requestAnimationFrame(renderAudio)

      if (!audioReady) return

      canvasContext.clearRect(0, 0, 1024, 300)

      drawFreq()
      drawWave()
    }

    renderAudio()

    setInterval(() => {
      loudEnough && renderKey()
    }, 250)

    window.addEventListener('keydown', e => {
      if (e.keyCode === 32) { // space
        audioEl.paused ? audioEl.play() : audioEl.pause()
      }
    })

    audioEl.play()
  }
}

export default Audio