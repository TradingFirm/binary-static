const ConnectionsUI   = require('./connections.ui').ConnectionsUI;
const ConnectionsData = require('./connections.data').ConnectionsData;
const url             = require('../../../../../base/url').url;

const Connections = (function() {
    'use strict';

    const responseHandler = function(response) {
        if (response.error && response.error.message) {
            return ConnectionsUI.displayError(response.error.message);
        }
        if (response.connect_add || response.connect_del) { // call list on finish
            return ConnectionsData.list();
        }
        return ConnectionsUI.update(response.connect_list);
    };

    const init = function() {
        ConnectionsUI.init();
        BinarySocket.init({
            onmessage: ConnectionsData.calls(responseHandler),
        });
        const connection_token = url.param('connection_token');
        if (typeof connection_token !== 'undefined') {
            ConnectionsData.add(connection_token);
        } else {
            ConnectionsData.list();
        }
    };

    const clean = function() {
        ConnectionsUI.clean();
    };

    return {
        init : init,
        clean: clean,
    };
})();

module.exports = {
    Connections: Connections,
};
