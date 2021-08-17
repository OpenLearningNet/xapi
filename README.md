# xApi Client Library for OpenLearning

```
npm install @openlearning/xapi --save 
```

```
import { initLrs, saveStatement, saveAttachments, saveCompletion } from "@openlearning/xapi";

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
  fileUrl: "https://www.example.com/attachment.txt"
}], "published");

// append attachments
saveAttachments(lrsConfig, [{
  contentType: "text/plain",
  display: "attachment.txt",
  fileUrl: "https://www.example.com/attachment.txt"
}], "attached");

```
