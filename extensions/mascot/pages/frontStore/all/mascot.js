const { buildUrl } = require("@evershop/evershop/src/lib/router/buildUrl");

module.exports = (request, response, delegate, next) => {
    const { currentRoute } = request;
    
    // If user has already visited mascot page, let them proceed
    console.log(request.session.visitedMascot);
    if (request.session && request.session.visitedMascot) {
        return next();
    }

    // If user is currently on mascot page, mark it as visited and let them proceed
    if (currentRoute.id === "mascot") {
        if (request.session) {
            request.session.visitedMascot = true;
        }
        return next();
    }
    
    // For all other routes, if user hasn't seen mascot, redirect to mascot page
    return response.redirect(buildUrl("mascot"));
};