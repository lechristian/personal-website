/* ==========================================================================
 * ./src/server/router/message.js
 *
 * /api/message
 * ========================================================================== */

import tracer from 'tracer';
import slack from 'slack-notify';

const logger = tracer.colorConsole();

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK || 'https://hooks.slack.com/services/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';
const messenger = slack(SLACK_WEBHOOK);

const MESSAGE_SENT_ROUTE = '/message/sent';

export function sendMessage(req, res) {
  const { name, email, message, client } = req.body;

  messenger.send({
    username: name,
    icon_url: 'https://dl.dropboxusercontent.com/u/11836382/Icon_inverted.png',
    icon_emoji: null,
    attachments: [
      {
        fallback: `Message: ${ message }\nEmail: ${ email }`,
        color: '#55B4D6',
        fields: [
          {
            title: ':memo: Message',
            value: message,
            short: false
          },
          {
            title: ':email: Email',
            value: email,
            short: false
          }
        ]
      }
    ]
  }, (err) => {
    if (err) {
      logger.error(`Slack API error: ${ JSON.stringify(err, null, 2) }`);
    }
  });

  if (client) {
    return res.json({
      sent: true 
    });
  }

  res.redirect(MESSAGE_SENT_ROUTE);
};
