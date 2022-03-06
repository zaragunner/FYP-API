// export const getVatRates = async() => {
//     return fetch('/api/categories', {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'get'
//     }).then(res => res.json())
// };

// export const addVatRate = async( site_id, name, rate, vat_id) => {
//     return fetch('/api/vat?action=create',{
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'post',
//         body: { site_id : site_id, name : name, rate: rate , vat_id : vat_id}
//     }).then(res => res.json())
// };