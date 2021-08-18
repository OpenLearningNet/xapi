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
  retrieveActivityState
} from "@openlearning/xapi";

// on load
const lrsConfig = initLrs();

// mark as completed
saveCompletion(lrsConfig);

// mark as completed, saving additional (JSON serializable) data
saveCompletion(lrsConfig, myData);

// publish attachments (default, optional last argument)
saveAttachments(lrsConfig, [{
  contentType: "text/plain",
  display: "attachment.txt",
  description: "A text file written by the learner",
  fileUrl: "https://www.example.com/attachment.txt"
}], "published");

// append attachments
saveAttachments(lrsConfig, [{
  contentType: "text/plain",
  display: "attachment.txt",
  description: "A text file written by the learner",
  fileUrl: "https://www.example.com/attachment.txt"
}], "attached");
```

Activity State:

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
