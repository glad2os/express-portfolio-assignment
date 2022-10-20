module.exports = function authenticationSites(SITE) {
    const requiredAuthentication = [
        'business',
    ]
    return requiredAuthentication.findIndex(item => item === SITE) !== -1;
}