
export const getData = async (url) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json()
    } catch (err) {
        console.log(err)
    }
}


export const getGameData = async () => {
    try {
        const url = 'http://localhost:3000/api/banana/getData';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

export const saveScore = async (obj) => {
    try {
        const {userid, level, points} = obj
        let url = 'http://localhost:3000/game/saves-score';
        const response = await fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userid, level, points}),
        })
        const result = await response.json();
        console.log("Score saved:", result);
    } catch (error) {
        console.log(error);
    }
}

export const getUserData = async () => {
    const response = await fetch('/request/user', {
        method: 'GET',
        credentials: "include",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data
}