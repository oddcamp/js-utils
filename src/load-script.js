/*
  ------------------------------------------------------------------------------
  Loads external script file

  @param {String} src The path of the file
  @param {Bool} cache Cache or bust the cache
*/

const loadScript = (src, cache = true) => {
  return new Promise((resolve, reject) => {
    if (!cache) {
      const time = new Date().getTime()
      src = `${src}${src.includes(`?`) ? `&` : `?`}cachebust${time}=${time}`
    }

    const script = document.createElement(`script`)
    script.addEventListener(`load`, resolve)
    script.addEventListener(`error`, () =>
      reject(new Error(`Error loading script`))
    )
    script.addEventListener(`abort`, () =>
      reject(new Error(`Script loading aborted`))
    )
    script.async = true
    script.src = src
    document.head.appendChild(script)
  })
}

/*
  ------------------------------------------------------------------------------
*/

export default loadScript
