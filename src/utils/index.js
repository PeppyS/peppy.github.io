export const getSessionId = () => {
    return sessionID
}

export const generateSessionId = () => {
    return Math.ceil(Math.random() * 100000000)
}

const sessionID = generateSessionId()
