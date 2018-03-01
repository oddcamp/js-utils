const nativeEvents = [
  'click',
  'focus',
  'blur',
]

const getElements = (elements) => {
  if(typeof elements === 'string') {
    elements = document.querySelectorAll(elements)
  }
  else if(typeof elements.length === 'undefined') {
    elements = [elements]
  }
  return elements
}

/*
  Adds event listener to an element. Using namespaces is available.
*/

const addEventListener = (elements, eventNames, callback, options = false) => {

  elements = getElements(elements)

  elements.forEach((element) => {
    if(!element.hasOwnProperty('registeredEvents')) {
      element.registeredEvents = []
    }

    eventNames.split(' ').forEach((eventName) => {
      const [eventNameType] = eventName.split('.')

      element.registeredEvents.push({
        eventName: eventName,
        callback: callback,
        options: options,
      })

      element.addEventListener(
        nativeEvents.includes(eventNameType) ? eventNameType : eventName,
        callback,
        options
      )
    })
  })
}

/*
  Removes event listener from an element. Using namespaces is available.
*/

const removeEventListener = (elements, eventName = false, callback = false, options = false) => {

  elements = getElements(elements)

  elements.forEach((element) => {
    if(!element.hasOwnProperty('registeredEvents')) {
      return
    }

    // remove all event listeners

    if(!eventName && !callback && !options) {
      element.registeredEvents.forEach((regEvent) => {
        element.removeEventListener(
          regEvent.eventName.split('.')[0],
          regEvent.callback,
          regEvent.options
        )
      })

      element.registeredEvents = []
      return
    }

    // remove specific and/or namespaced event listeners

    const [eventNameType, eventNameSpace] = eventName.split('.')

    element.registeredEvents.forEach((regEvent) => {
      const [regEventNameType, regEventNameSpace] = regEvent.eventName.split('.')
      const regEventNameMatch = (
        regEvent.eventName === eventName ||
        !eventNameSpace && eventNameType && eventNameType === regEventNameType ||
        !eventNameType && eventNameSpace && eventNameSpace === regEventNameSpace
      )
      let doRemove = false

      // only 'eventName' provided
      if(eventName && !callback && !options) {
        if(regEventNameMatch) {
          doRemove = true
        }
      }

      // only 'callback' provided
      else if(!eventName && callback && !options) {
        if(callback === regEvent.callback) {
          doRemove = true
        }
      }

      // only 'options' provided
      else if(!eventName && !callback && options) {
        if(options === regEvent.options) {
          doRemove = true
        }
      }

      // 'eventName' and 'callback' provided
      else if(eventName && callback && !options) {
        if(regEventNameMatch && callback === regEvent.callback) {
          doRemove = true
        }
      }

      // 'eventName' and 'options' provided
      else if(eventName && callback && !options) {
        if(regEventNameMatch && options === regEvent.options) {
          doRemove = true
        }
      }

      // 'callback' and 'options' provided
      else if(!eventName && callback && options) {
        if(callback === regEvent.callback && options === regEvent.options) {
          doRemove = true
        }
      }

      // everything's provided
      else {
        if(regEventNameMatch && callback === regEvent.callback && options === regEvent.options) {
          doRemove = true
        }
      }

      if(doRemove) {
        element.removeEventListener(regEventNameType, regEvent.callback, regEvent.options)
        element.registeredEvents = element.registeredEvents.filter(e => e !== regEvent)
      }
    })
  })
}

/*
  Triggers event on an element. Using namespaces is available.
*/

const triggerEvent = (elements, eventNames, data = null) => {

  elements = getElements(elements)

  elements.forEach((element) => {
    eventNames.split(' ').forEach((eventName) => {
      const [eventNameType, eventNameSpace] = eventName.split('.')
      let eventTriggered = false

      // trigger registered events
      if(element.hasOwnProperty('registeredEvents')) {
        let eventsTriggered = []

        element.registeredEvents.forEach((registeredEvent) => {
          const [regEventNameType, regEventNameSpace] = registeredEvent.eventName.split('.')

          // do not trigger the exact events more than once
          if(eventsTriggered.includes(registeredEvent.eventName)) {
            return
          }

          if(
            // type (and namespace) trigger (e.g. 'click.goBaby')
            eventName === registeredEvent.eventName ||
            // type only trigger (e.g. 'click')
            !eventNameSpace && eventNameType === regEventNameType ||
            // namespace only trigger (e.g. '.goBaby')
            !eventNameType && eventNameSpace === regEventNameSpace
          ){
            // trigger native event
            if(nativeEvents.includes(regEventNameType)) {
              element[regEventNameType]()
            }
            // trigger custom event
            else {
              const event = new CustomEvent(registeredEvent.eventName, {detail: data})
              element.dispatchEvent(event)
            }

            eventsTriggered.push(registeredEvent.eventName)
            eventTriggered = true
          }
        })
      }

      // still trigger native event if it wasn't registered before
      if(!eventTriggered && eventNameType && nativeEvents.includes(eventNameType)) {
        element[eventNameType]()
      }
    })
  })

}

export {
  addEventListener,
  removeEventListener,
  triggerEvent,
}
