// config for custom routes
const routes = [
    {
        path: '/',
        component: '/index'
    },
    {
        path: '/about',
        component: 'about'
    }
];

// match the path and
// return the corresponding item from route config defined above
const router = (path) => {
    let route = null;

    for (const item of routes) {
        if (item.path === path) {
            return item;
        }
    }
}

module.exports = router;