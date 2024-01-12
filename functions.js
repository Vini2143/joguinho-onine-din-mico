//funções

export function emitEvent(eventName, ...eventData) {
    return JSON.stringify({
        event: eventName,
        data: eventData
    })
}

export function receiveEvent(message, event, action) {
    let messageData = JSON.parse(message)

    if (event == messageData.event) {
        action(...messageData.data)
    }
}

