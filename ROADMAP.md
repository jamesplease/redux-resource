# Roadmap

### Project Goals

- Remain reasonably sized (< 4kb)
- Changes should simplify the learning curve whenever possible
- When possible, reduce the number of assumptions to increase flexibility
- Ensure reasonable migration paths

### Future Versions

#### v3.0.0

**Breaking**

- Rename `NULL` to be `IDLE`.

- Remove deprecated getResources API: `getResources(state, resourceName, filter)`

- Calling getResources with no filter will return all of the resources

**New Features**

- A new API to update resource information directly, independent from requests. This will support
  a few new use cases, including gRPC streaming endpoints.

- "named requests" will be split into two concepts: `requestKey` and `requestName`. Keys will be used
  for caching and lookups. Names are used for humans debugging the code.

- A new `requestAttributes` attribute for request action types so that developers can put any
  information that they want onto the request.

#### v3.1.0

- A new reducer specifically for requests. This allows for requests to be tracked independent
  from a specific resource type, paving the road for multi-operation and multi-resource requests.

- New, simpler request action types. Right now, there are 16 action types for modifying requests.
  There should just be 4 with an action attribute where you can specify what the crud action is.
  This will deprecate the old action types. This has a few benefits:
  
  - it will be easier to learn and understand
  - prepare the library for supporting multi-operation requests
  - make the code smaller

- Multiple resource types supported within request actions. This will deprecate the "included
  resources" plugin by bringing that functionality in the core library.

- Deprecating use of the `mergeListMeta` feature. Imperatively update the list instead.

#### Future

- React bindings to simplify use of Redux Resource with React.

- Deprecating request tracking on resource slices. The standalone request slice will be recommended instead.

