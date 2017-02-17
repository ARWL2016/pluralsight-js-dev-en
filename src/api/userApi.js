//polyfill for browsers with no fetch support  
//this is a bit like the repository pattern (used to abstract away db access in a course-grained API)
//this is a centralised place to handle all API calls 
import 'whatwg-fetch'; 
import getBaseUrl from './baseUrl'; 

const baseUrl = getBaseUrl(); 

//public function for export 
export function getUsers() {
    return get('users'); 
}

export function deleteUser(id) {
    return del(`users/${id}`); 
}

//the actual fetch function only needs the url and returns a promise  
function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}

//privatised and centralised delete function  
function del(url) {
    const request = new Request(baseUrl + url, {
        method: 'DELETE'
    });

    return fetch(request).then(onSuccess, onError); 
}

function onSuccess(response) {
    return response.json(); 
}

//centralised error handling  
function onError(error) {
    console.log(error); //eslint-disable-line no-console
}