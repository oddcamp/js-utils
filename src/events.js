/*
  Adds event listener to an element. Using namespaces is available.
*/

const addEventListener = (elements, eventName, callback, options = false) => {

  if(typeof elements.length === 'undefined') {
    elements = [elements]
  }

  eventName = eventName.trim()

  elements.forEach((element) => {
    if(!element.hasOwnProperty('registeredEvents')) {
      element.registeredEvents = []
    }

    eventName.split(' ').forEach((eventName) => {
      element.registeredEvents.push({
        eventName: eventName,
        callback: callback,
        options: options,
      })

      element.addEventListener(eventName.split('.')[0], callback, options)
    })
  })
}

/*
  Removes event listener from an element. Using namespaces is available.
*/

const removeEventListener = (elements, eventName = false, callback = false, options = false) => {

  if(typeof elements.length === 'undefined') {
    elements = [elements]
  }

  if(eventName) {
    eventName = eventName.trim()
  }

  elements.forEach((element) => {
    if(!element.hasOwnProperty('registeredEvents')) {
      return
    }

    // remove all event listeners

    if(!eventName && !callback && !options) {
      element.registeredEvents.forEach((entry) => {
        element.removeEventListener(
          entry.eventName.split('.')[0],
          entry.callback,
          entry.options
        )
      })

      element.registeredEvents = []
      return
    }

    // remove specific and/or namespaced event listeners

    const eventNameSplit = eventName ? eventName.split('.') : []
    const eventType = eventNameSplit[0] || false
    const eventNamespace = eventNameSplit[1] || false

    element.registeredEvents.forEach((entry) => {
      const entryEventNameSplit = entry.eventName.split('.')
      const entryEventType = entryEventNameSplit[0] || false
      const entryEventNamespace = entryEventNameSplit[1] || false
      const entryEventNameMatch = (
        entry.eventName === eventName ||
        !eventNamespace && eventType && eventType === entryEventType ||
        !eventType && eventNamespace && eventNamespace === entryEventNamespace
      )
      let doRemove = false

      // only 'eventName' provided
      if(eventName && !callback && !options) {
        if(entryEventNameMatch) {
          doRemove = true
        }
      }

      // only 'callback' provided
      else if(!eventName && callback && !options) {
        if(callback === entry.callback) {
          doRemove = true
        }
      }

      // only 'options' provided
      else if(!eventName && !callback && options) {
        if(options === entry.options) {
          doRemove = true
        }
      }

      // 'eventName' and 'callback' provided
      else if(eventName && callback && !options) {
        if(entryEventNameMatch && callback === entry.callback) {
          doRemove = true
        }
      }

      // 'eventName' and 'options' provided
      else if(eventName && callback && !options) {
        if(entryEventNameMatch && options === entry.options) {
          doRemove = true
        }
      }

      // 'callback' and 'options' provided
      else if(!eventName && callback && options) {
        if(callback === entry.callback && options === entry.options) {
          doRemove = true
        }
      }

      // everything's provided
      else {
        if(entryEventNameMatch && callback === entry.callback && options === entry.options) {
          doRemove = true
        }
      }

      if(doRemove) {
        element.removeEventListener(entryEventType, entry.callback, entry.options)
        element.registeredEvents = element.registeredEvents.filter(e => e !== entry)
      }
    })
  })
}

export {
  addEventListener,
  removeEventListener,
}
