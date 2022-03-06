export const getSubCategories = async() => {
    return fetch('/api/subcategories', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(res => res.json())
};

export const addSubCategory = async( site_id, name, description, sub_category_id) => {
    return fetch('/api/subcategories?action=create',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: { site_id : site_id, name : name, description : description , sub_category_id : sub_category_id}
    }).then(res => res.json())
};