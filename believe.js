const template = props => `
  <style>
    .scene {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      // background: #2d2d30;
      background: linear-gradient(45deg, #93278f, #00a99d);
      // background: linear-gradient(45deg, #3a3897, #a3a1ff);

      transition: opacity 0.4s ease-in-out;
    }

    #particles {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;

      z-index: 2;
    }

    .error {
      transition: opacity 0.4s ease-in-out;
    }

    .container h1, .container h2 {
      color: #fefefe;
      font-weight: 300;
      font-family: "Helvetica Neue";

      transition: opacity 0.4s ease-in-out;
    }

    .container h1 {
      font-size: 5em;
    }

    .container h2 {
      font-size: 1.7em;
    }
  </style>

  <div class="scene error-scene" style="opacity: 0">
    <div id='particles'></div>

    <div class="container">
      <h1 style="opacity: 0">${props.quote}</h1>

      <div class="error" style="opacity: 0">
        <h2>${props.error}</h2>
      </div>
    </div>
  </div>
`

// prettier-ignore
const quotes = [
  'I believe in you!',
  'Take a deep breath.',
  'Just Breathe.',
  'You can do it!',
  "You're almost there!",
  'Believe in yourself.',
  'Breathe in.'
]

const random = list => list[Math.floor(Math.random() * list.length)]
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function onError({error}) {
  const quote = random(quotes)

  const html = template({
    quote: '',
    error: error.message
  })

  document.write(html)

  const scene = document.querySelector('.scene')

  await delay(60)
  scene.style.opacity = 1

  particlesJS.load('particles', 'particles.json')

  const heading = scene.querySelector('h1')
  
  for (const char of quote.split('')) {
    await delay(60)
    
    heading.textContent += char

    if (heading.textContent.length === 1) {
      heading.style.opacity = 1
    }
  }

  await delay(200)

  const subheading = scene.querySelector('.error')
  subheading.style.opacity = 1

  return true
}

window.addEventListener("error", onError)

console.log('[+] Error Handling Active')