# Direct contact delivery

Published dd3a5cb / Pages39179691305. Contact form sends through FormSubmit to the existing configured recipient. JavaScript uses AJAX with reply-to, sending/result states, request timeout, duplicate-submit prevention, input limits and honeypot; native POST works without JavaScript. Failed requests preserve the message for retry.

Lint/typecheck,16 route tests,7 export tests and Pages build passed. Existing contact assertions updated for direct POST. Live form filling and retry/error behavior verified. AJAX initially returned the error state. A native live POST then rendered the provider confirmation: “This form needs Activation. We've sent you an email containing an 'Activate Form' link.” Browser script execution was temporarily disabled to test native fallback and restored afterward.

Recipient activation is required before inbox delivery can be verified. Owner asked to activate via email; do not claim delivered until a subsequent live test and recipient confirmation. Screenshot: chat outputs/Sticky_Header/contact-activation.png. Documentation: https://formsubmit.co/ and https://formsubmit.co/ajax-documentation .
