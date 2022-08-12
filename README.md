# xApi Client Library for OpenLearning

Install:

```
npm install @openlearning/xapi --save 
```

Usage:

```javascript
import {
  initLrs,
  saveStatement,
  saveAttachments,
  saveCompletion,
  saveActivityState,
  retrieveActivityState,
  savePassed,
  saveFailed
} from "@openlearning/xapi";
```

The webpage will be loaded with query string arguments that configure the LRS connection.
The `initLrs` function returns the configuration retrieved from the query (search) string.
```javascript
// on load
const lrsConfig = initLrs();
```

Once an LRS connection is configured, this config can be used with the other functions,
e.g. to mark this activity as completed:
```javascript
// mark as completed
saveCompletion(lrsConfig);

// mark as completed, saving additional (JSON serializable) data
saveCompletion(lrsConfig, myData);
```

Or to send file URLs to OpenLearning as attachments that can then be shared by the learner:
```javascript
// publish (replace) attachments (default, last argument is optional)
saveAttachments(lrsConfig, [{
  contentType: "text/plain",
  display: "attachment.txt",
  description: "A text file written by the learner",
  fileUrl: "https://www.example.com/attachment.txt"
}], "published");

// publish (replace) attachments and specify a thumbnail URL
saveAttachments(lrsConfig, [{
  contentType: "text/plain",
  display: "attachment.txt",
  description: "A text file written by the learner",
  fileUrl: "https://www.example.com/attachment.txt"
}], "published", "https://www.example.com/thumbnail.png");

// append attachments
saveAttachments(lrsConfig, [{
  contentType: "text/plain",
  display: "attachment.txt",
  description: "A text file written by the learner",
  fileUrl: "https://www.example.com/attachment.txt"
}], "attached");
```

Or to set a score:

```javascript
// save a passing scaled score
savePassed(lrsConfig, { scaled: 0.95 });

// save a failing raw score
saveFailed(lrsConfig, { min: 0, max: 10, raw: 3 })

```


Activity State can also be set and retrieved for the current user of this activity:

Note, to use these, the setting: "OpenLearning LRS: Use OpenLearning to store xAPI documents and state (Experimental)"
needs to be activated under Course Setup > Advanced.

```javascript
// store state (for the activity and current user)
saveActivityState(lrsConfig, stateId, state);

// retrieve state (for the activity and current user)
retrieveActivityState(lrsConfig, stateId).then((state) => {
  console.log(state);
});

```

## Standalone Bundle

If you're not using npm (e.g. you're not building with webpack, etc.) and want to just use a `<script>` tag, using:

```html
<script src="./bundle/openlearning-xapi.js"></script>
```

will define:
```javascript
window.xApi = {
  initLrs,
  saveStatement,
  saveAttachments,
  saveCompletion,
  saveActivityState,
  retrieveActivityState,
  savePassed,
  saveFailed
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
