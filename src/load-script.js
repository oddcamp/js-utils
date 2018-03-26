/*
  ------------------------------------------------------------------------------
  Loads external script file
*/

const loadScript = (src, cache = true) => {

  return new Promise((resolve, reject) => {
    if(!cache) {
      const time = (new Date()).getTime()
      src = `${src}${src.includes('?') ? '&' : '?'}cachebust${time}=${time}`
    }

    const script = document.createElement('script')
    script.addEventListener('load', resolve)
    script.addEventListener('error', () => reject('Error loading script'))
    script.addEventListener('abort', () => reject('Script loading aborted'))
    script.async = true
    script.src = src
    document.head.appendChild(script)
  })

}

/*
  ------------------------------------------------------------------------------
*/

export default loadScript
