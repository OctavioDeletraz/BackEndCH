function messagesDTO(messages, _id, timestamp) {
    return {
        ...messages,
        _id,
        timestamp
    }
}

export default messagesDTO