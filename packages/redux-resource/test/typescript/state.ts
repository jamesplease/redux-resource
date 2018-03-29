import { ResourceSlice, ResourceMeta, getStatus, getResources, setResourceMeta, upsertResources } from 'redux-resource';

interface Episode {
  id: number;
  title: string;
}

interface Meta extends ResourceMeta {
  selected: boolean;
}

const state: ResourceSlice<Episode, Meta> = {
  resourceType: 'episode',
  resources: {
    1: { id: 1, title: 'The Phantom Menace' },
    2: { id: 2, title: 'Attack of the Clones' },
    3: { id: 3, title: 'Revenge of the Sith' },
    4: { id: 4, title: 'A New Hope' },
    5: { id: 5, title: 'The Empire Strikes Back' },
    6: { id: 6, title: 'Return of the Jedi' },
    7: { id: 7, title: 'The Force Awakens' },
    8: { id: 8, title: 'The Last Jedi' },
    9: { id: 9, title: '???' },
  },
  meta: {
    1: {
      createStatus: 'FAILED',
      readStatus: 'FAILED',
      updateStatus: 'FAILED',
      deleteStatus: 'FAILED',
      selected: true,
    },
    7: {
      createStatus: 'SUCCEEDED',
      readStatus: 'SUCCEEDED',
      updateStatus: 'PENDING',
      deleteStatus: 'FAILED',
      selected: true,
    },
  },
  lists: {
    originals: [ 4, 5, 6 ],
    prequels: [ 1, 2, 3 ],
    sequels: [ 7, 8 ],
  },
  requests: {
    allEpisodes: {
      requestKey: 'allEpisodes',
      resourceType: 'episode',
      ids: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
      status: 'SUCCEEDED',
    }
  },
};

getStatus(state, 'meta[1].readStatus');
getStatus(state, [ 'meta[1].readStatus', 'requests.allEpisodes.status' ]);

getResources(state, 'original');
getResources(state, 'allEpisodes');
getResources(state, (resource, meta) => meta.selected);

setResourceMeta<Episode, Meta>({
  resources: [ 1, 2, 3 ],
  newMeta: {
    createStatus: 'PENDING',
    readStatus: 'PENDING',
    updateStatus: 'PENDING',
    deleteStatus: 'PENDING',
    selected: true,
  },
  mergeMeta: true,
  meta: {
    1: {
      createStatus: 'FAILED',
      readStatus: 'FAILED',
      updateStatus: 'FAILED',
      deleteStatus: 'FAILED',
      selected: false,
    },
  },
  initialResourceMeta: {
    createStatus: 'IDLE',
    readStatus: 'IDLE',
    updateStatus: 'IDLE',
    deleteStatus: 'IDLE',
    selected: true,
  },
});

upsertResources<Episode>(state.resources, [
  { id: 9, title: '???' },
], true);
