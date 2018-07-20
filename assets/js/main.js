var p = document.querySelector('.markdown p')

var emojis = window.emojis || ['🤔']

var span = document.createElement('span')
span.className = 'emoji'
span.addEventListener('animationend', function (e) { next() })

var current

var state = 'hidden'

renderRandomEmoji()
p.appendChild(span)
next()

function updateState (newState) {
  state = newState
}

function next () {
  if (state === 'hidden') {
    updateState('zoomin')
    span.className = 'emoji zoomin'
    return
  }

  if (state === 'zoomin') {
    updateState('visible')
    setTimeout(function () { next() }, 4000)
    return
  }

  if (state === 'visible') {
    updateState('zoomout')
    span.className = 'emoji zoomout'
    return
  }

  if (state === 'zoomout') {
    updateState('hidden')
    setTimeout(function () {
      renderRandomEmoji()
      next()
    }, 800)
    return
  }

  console.error('It should not be possible to make it here')
}

function randomEmoji () {
  var num = Math.floor(Math.random() * emojis.length)
  var newCurrent = emojis.splice(num, 1)[0]

  if (current) { emojis.push(current) }
  current = newCurrent

  return newCurrent
}

function renderRandomEmoji () {
  var char = randomEmoji()
  var emoji = document.createTextNode(char)

  while (span.firstChild) { span.removeChild(span.firstChild) }

  span.appendChild(emoji)
}
