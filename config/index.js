var configValues = require('./config');

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb://' + configValues.uname + 
        ':' +configValues.pwd + 
        '@ds019054.mlab.com:19054/nodetodosample';
    }
}