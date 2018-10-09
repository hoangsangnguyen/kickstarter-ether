const routes = require('next-routes')();

routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/back', '/campaigns/back')    
    .add('/campaigns/:address/test', '/campaigns/test')   
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
    .add('/fileupload/:filename', '/fileupload')
    .add('/author/login', '/author/login')
    .add('/author/signup', '/author/signup')
    
    
    ;

module.exports = routes;