//if the app is in development we will use our mock api data, otherwise we will return the root, which is where our express server static data is served (pretending to be the real database) - so we have real mock data + mock real data!! 

export default function getBaseUrl() {
    const inDevelopment = window.location.hostname === 'localhost';
    return inDevelopment ? 'http://localhost:3001' : '/'; 
}