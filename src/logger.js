import { SERVER_URL } from "./helper/constants";


export const logToServer = async (level, message, meta = {}) => {

    try {

        await SERVER_URL.post('/api/logs', { level, message, meta });

        // await fetch('/api/logs', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ level, message, meta }),
        // });

    } catch (error) {

        console.error('Failed to send log to server:', error);

    }

};

export const logger = {

    info: (message, meta) => logToServer('info', message, meta),
    warn: (message, meta) => logToServer('warn', message, meta),
    error: (message, meta) => logToServer('error', message, meta),

};