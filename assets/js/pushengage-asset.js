var PushEngage = window.PushEngage || [];

/**
 * Set up PushEngage_Integration object.
 */
(function (exports, $) {

    /**
     * PushEngage_Integration expects a jQuery this.form object.
     */
    var PushEngage_Integration = function (form) {

        /**
         * Set up event handlers for donation forms.
         *
         * @return  void
         */
        var init = function () {
            // Adding event listener for pushengage subscription checkbox.
            $('#pushengage_send_updates').on('change', function (event) {
                var checkbox = $(this);
                if (checkbox && checkbox.is(':checked')) {
                    var segment = checkbox.data('segment');
                    PushEngage.push(async function () {
                        var subscriberID = await PushEngage.getSubscriberId();
                        // If user is already subscribed then add subscriber ID to the segment.
                        if (subscriberID) {
                            var response = await PushEngage.addSegment(segment);
                            console.log(response);
                        } else {
                            // If user is not subscribed then show the native permission prompt.
                            var response = await PushEngage.showNativePermissionPrompt();
                            console.log(response);
                            // If user is subscribed then add subscriber ID to the segment.
                            if (response?.subscriber_id) {
                                PushEngage.addSegment(segment);
                            }
                        }
                    })
                }
            });
        }

        init();
    };
    PushEngage_Integration();
})(window, jQuery);