//funções

export function emitEvent(eventName, ...eventData) {
    return JSON.stringify({
        event: eventName,
        data: eventData
    })
}

export function receiveEvent(message, event, action) {
    const messageData = JSON.parse(message)

    if (event == messageData.event) {
        action(...messageData.data)
    }
}

export function normalize(vector) {
    const vectorModule = Math.sqrt(vector[0]**2 + vector[1]**2)
    const normalizedVector = vectorModule ? [vector[0] / vectorModule, vector[1] / vectorModule] : vector

    return normalizedVector
}

