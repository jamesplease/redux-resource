import { ResourceAction } from 'redux-resource';

const action1: ResourceAction<{}> = {
  type: 'READ_RESOURCES_IDLE',
  resourceType: 'books',
};

interface Book {
  id: number;
}

const action2: ResourceAction<Book> = {
  type: 'READ_RESOURCES_SUCCEEDED',
  resourceType: 'books',
  resources: [{ id: 1 }],
};
