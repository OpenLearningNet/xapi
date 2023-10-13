# xApi Client Library for OpenLearning

Install:

```
npm install @openlearning/xapi --save 
```

Usage:

```javascript
import {
  initTinCan,
  initCmi5,

  saveActivityState,
  retrieveActivityState,
  
  sendCompleted,
  sendPassed,
  sendFailed,
  sendTerminated,
  sendAttachments,

  getDuration
} from "@openlearning/xapi";
```

The webpage will be loaded with query string arguments that configure the LRS connection.
The `initCmi5` or `initTinCan` functions return the configuration loaded after the launch has initialised.

e.g.

```javascript
initCmi5().then((config) => {
  // retrieve the mastery score
  const masteryScore = config.launchData.masteryScore;
});
```

Once an LRS connection is configured, this config can be used with the other functions,
e.g. to mark this activity as completed:
```javascript
// mark as completed
sendCompleted(config);

// mark as passed
sendPassed(config);

// mark as failed
sendFailed(config);
```

Or to set a score:

```javascript
// send a passing scaled score
sendPassed(config, { scaled: 0.95 });

// send a failing raw score
sendFailed(config, { min: 0, max: 10, raw: 3 })

```
Or to send file URLs to OpenLearning as attachments that can then be shared by the learner:
```javascript
// publish (replace) attachments (default, last argument is optional)
sendAttachments(config, [{
  contentType: "text/plain",
  display: "attachment.txt",
  description: "A text file written by the learner",
  fileUrl: "https://www.example.com/attachment.txt"
}], "published");

// publish (replace) attachments and specify a thumbnail URL
sendAttachments(config, [{
  contentType: "text/plain",
  display: "attachment.txt",
  description: "A text file written by the learner",
  fileUrl: "https://www.example.com/attachment.txt"
}], "published", "https://www.example.com/thumbnail.png");

// append attachments
sendAttachments(config, [{
  contentType: "text/plain",
  display: "attachment.txt",
  description: "A text file written by the learner",
  fileUrl: "https://www.example.com/attachment.txt"
}], "attached");
```

Activity State can also be set and retrieved for the current user of this activity:

```javascript
// store state (for the activity and current user)
saveActivityState(config, stateId, state);

// retrieve state (for the activity and current user)
retrieveActivityState(config, stateId).then((state) => {
  console.log(state);
});

```

## Standalone Bundle

If you're not using npm and want to just use a `<script>` tag:

```html
<script src="./bundle/openlearning-xapi.js"></script>
```

will define:
```javascript
window.xApi = {
  initTinCan,
  initCmi5,

  saveActivityState,
  retrieveActivityState,
  
  sendCompleted,
  sendPassed,
  sendFailed,
  sendTerminated,
  sendAttachments,

  getDuration
};
```

## Development

Build the `./dist` folder:
```
npm run build
```

Build the standalone bundle: `./bundle/openlearning-xapi.js`:
```
npm run bundle
```
