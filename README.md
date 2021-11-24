# Redux Store Subscribe Middleware

Using the Redux Store Subscribe Middleware, we can subscribes to value changes in the store.

## How to install?

    npm install --save redux-store-subscribe

## How to use?

[Source Code](https://github.com/HamadTheIronside/redux-store-subscribe/tree/main/examples/simple-example)

store.js

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { storeSubScribeMiddleWare } from "redux-store-subscribe";
import { exampleReducer } from "./slice";

export const store = configureStore({
  reducer: {
    exampleReducer,
  },
  middleware: [storeSubScribeMiddleWare()],
});
```

AnyWhere.js

```javascript
import { useEffect } from "react";
import { subScribeToStore, unSubScribeFromStore } from "redux-store-subscribe";

useEffect(() => {
  const id1 = subScribeToStore(
    "exampleReducer.count1",
    ({ prevValue, nextValue }) => {
      alert(`count1 changed from ${prevValue} to ${nextValue}`);
    }
  );

  const id2 = subScribeToStore(
    "exampleReducer.count2",
    ({ prevValue, nextValue }) => {
      alert(`count2 changed from ${prevValue} to ${nextValue}`);
    }
  );

  return () => {
    unSubScribeFromStore(id1);
    unSubScribeFromStore(id2);
  };
}, []);
```

## How to use with TypeScript?

...

## Roadmap

- Providing More Examples
- Providing TypeScript Examples
- Writing Tests
