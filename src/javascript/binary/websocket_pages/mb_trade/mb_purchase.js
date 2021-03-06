const MBNotifications = require('./mb_notifications').MBNotifications;
const MBPrice         = require('./mb_price').MBPrice;
const ViewPopupWS     = require('../user/view_popup/view_popupws').ViewPopupWS;

/*
 * Purchase object that handles all the functions related to
 * contract purchase response
 */

const MBPurchase = (function () {
    'use strict';

    const display = function (response) {
        if (response.error) {
            MBPrice.hidePriceOverlay();
            MBNotifications.show({ text: response.error.message, uid: 'BUY_ERROR', dismissible: true });
        } else {
            MBNotifications.hide('BUY_ERROR');
            ViewPopupWS.init($('<div />', { contract_id: response.buy.contract_id }).get(0));
        }
    };

    return {
        display: display,
    };
})();

module.exports = {
    MBPurchase: MBPurchase,
};
