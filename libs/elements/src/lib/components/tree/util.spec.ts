import { treeNodeDateToTreeState } from './util';

describe('true-util', () => {
  it('treeNodeDateToTreeState', () => {
    const data = [
      { id: 'a', name: 'a', sort: 0 },
      { id: 'b', name: 'b', parentId: 'a', sort: 1 }
    ];
    const newData = treeNodeDateToTreeState(data);
    expect(newData).toEqual([
      { children: [{ id: 'b', name: 'b', parentId: 'a', sort: 1 }], id: 'a', name: 'a', sort: 0 }
    ]);
  });

  it('treeNodeDateToTreeState sort', () => {
    const data = [
      { id: 'a', name: 'a', sort: 0 },
      { id: 'b', name: 'b', parentId: 'a', sort: 1 },
      { id: 'b2', name: 'b2', parentId: 'a', sort: 2 }
    ];
    const newData = treeNodeDateToTreeState(data);
    expect(newData).toEqual([
      {
        id: 'a',
        name: 'a',
        sort: 0,
        children: [
          { id: 'b', name: 'b', parentId: 'a', sort: 1 },
          { id: 'b2', name: 'b2', parentId: 'a', sort: 2 }
        ]
      }
    ]);
  });

  it('treeNodeDateToTreeState sort', () => {
    const data = [
      { id: 'a', name: 'a', sort: 0 },
      { id: 'b', name: 'b', parentId: 'a', sort: 1 },
      { id: 'b2', name: 'b2', parentId: 'a', sort: 2 }
    ];
    const newData = treeNodeDateToTreeState(data);
    expect(newData).toEqual([
      {
        id: 'a',
        name: 'a',
        sort: 0,
        children: [
          { id: 'b', name: 'b', parentId: 'a', sort: 1 },
          { id: 'b2', name: 'b2', parentId: 'a', sort: 2 }
        ]
      }
    ]);
  });

  it('treeNodeDateToTreeState sort', () => {
    const data = [
      { id: 'a', name: 'a', sort: 0 },
      { id: 'b', name: 'b', parentId: 'a', sort: 1 },
      { id: 'b2', name: 'b2', parentId: 'a', sort: -2 }
    ];
    const newData = treeNodeDateToTreeState(data);
    expect(newData).toEqual([
      {
        id: 'a',
        name: 'a',
        sort: 0,
        children: [
          { id: 'b2', name: 'b2', parentId: 'a', sort: -2 },
          { id: 'b', name: 'b', parentId: 'a', sort: 1 }
        ]
      }
    ]);
  });

  it('treeNodeDateToTreeState sort', () => {
    const data = [
      { id: 'b', name: 'b', sort: 1 },
      { id: 'b2', name: 'b2', sort: -2 }
    ];
    const newData = treeNodeDateToTreeState(data);
    expect(newData).toEqual([
      { id: 'b2', name: 'b2', sort: -2 },
      { id: 'b', name: 'b', sort: 1 }
    ]);
  });
});
