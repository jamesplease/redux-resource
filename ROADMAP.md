# Roadmap

### Project Goals

- Remain reasonably sized (< 4kb)
- Changes should simplify the learning curve whenever possible
- When possible, reduce the number of assumptions to increase flexibility
- Ensure reasonable migration paths

### Future Versions

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

- Adopting the Standard Resource standard to add support for Computed Attributes and Relationships
