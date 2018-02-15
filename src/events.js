/*
  Adds event listener to an element. Using namespaces is available.
*/

const addEventListener = (element, eventName, callback, options = false) => {

  if(!element.hasOwnProperty('registeredEvents')) {
    element.registeredEvents = []
  }

  element.registeredEvents.push({
    eventName: eventName,
    callback: callback,
    options: options,
  })

  element.addEventListener(eventName.split('.')[0], callback, options)
}

/*
  Removes event listener from an element. Using namespaces is available.
*/

const removeEventListener = (element, eventName = false, callback = false, options = false) => {

  // remove all event listeners
  if(!eventName) {
    if(element.hasOwnProperty('registeredEvents')) {
      element.registeredEvents.forEach((entry) => {
        element.removeEventListener(
          entry.eventName.split('.')[0],
          entry.callback,
          entry.options
        )
      })

      element.registeredEvents = []
    }
    return
  }

  // TODO: throw if eventName is not a string
  const eventNameSplit = eventName.split('.')
  const eventType = eventNameSplit[0]
  const eventNamespace = eventNameSplit.length > 1 ? eventNameSplit[1] : false

  // remove namespaced event listeners
  if(eventNameSplit.length > 1) {
    if(element.hasOwnProperty('registeredEvents')) {
      element.registeredEvents.forEach((entry) => {
        const entryEventNameSplit = entry.eventName.split('.')
        const entryEventType = entryEventNameSplit[0]
        const entryEventNamespace = entryEventNameSplit.length > 1 ? entryEventNameSplit[1] : false

        if(
          entry.eventName == eventName ||
          !eventNamespace && eventType && eventType == entryEventType ||
          !eventType && eventNamespace && eventNamespace == entryEventNamespace
        ){
          element.removeEventListener(eventType, entry.callback, entry.options)
          // TODO: delete this from registeredEvents
        }
      })
    }
    return
  }

  // remove event listeners of the provided callback
  if(callback) {
    element.removeEventListener(eventType, callback, options)
    return
  }

  // element.removeEventListener(
  //   eventName.split('.')[0],
  //   element.registeredEvents[eventName].callback,
  //   element.registeredEvents[eventName].options
  // )
  //
  // delete element.registeredEvents[eventName]
}

export {
  addEventListener,
  removeEventListener,
}
