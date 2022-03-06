export const getCategories = async() => {
    return fetch('/api/categories', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};



