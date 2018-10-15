(() => {
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

  function template({quote, error}) {
    const stackOverflow = encodeURI(`https://stackoverflow.com/search?q=[js] ${error.message}`)

    return `
      <div class="scene error-scene" style="opacity: 0">
      <link rel='stylesheet' href='./believe.css' />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Dosis:400">

        <div id="particles"></div>

        <div class="close-button">
          <svg viewBox="0 0 24 24">
            <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
          </svg>
        </div>

        <div class="backdrop">
          <div class="container">
            <h1 style="opacity: 0">${quote}</h1>

            <div class="error" style="opacity: 0">
              <h2>
                <a href="${stackOverflow}" target="_blank">
                  ${error.name}: ${error.message}
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    `
  }

  const random = list => list[Math.floor(Math.random() * list.length)]
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  const db = {
    errors: 0,
    key: 'stats.errors',

    save(value) {
      localStorage.setItem(this.key, JSON.stringify(this))
    },
    
    load() {
      const stats = JSON.parse(localStorage.getItem(this.key))

      for (const stat in stats) {
        this[stat] = stats[stat]
      }

      return stats
    }
  }

  async function onError({error}) {
    db.load()
    db.errors += 1
    db.save()

    const quote = random(quotes)

    const html = template({
      quote: '',
      error
    })

    const rootNode = document.createElement('div')
    rootNode.innerHTML = html
    document.body.appendChild(rootNode)

    const scene = rootNode.querySelector('.scene')

    await delay(60)
    scene.style.opacity = 1

    particlesJS.load('particles', 'particles.json')

    const closeButton = scene.querySelector('.close-button')

    closeButton.addEventListener('click', async () => {
      await delay(60)

      scene.style.opacity = 0

      await delay(1800)

      document.body.removeChild(rootNode)
    })

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
})()