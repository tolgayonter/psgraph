const data = {
  id: "root",
  label: "Root Node",
  children: [
    {
      id: "child1",
      label: "Child 1",
      children: [
        {
          id: "grandchild1-1",
          label: "Grandchild 1-1",
          children: [
            {
              id: "greatgrandchild1-1-1",
              label: "Great Grandchild 1-1-1",
            },
            {
              id: "greatgrandchild1-1-2",
              label: "Great Grandchild 1-1-2",
            },
          ],
        },
        {
          id: "grandchild1-2",
          label: "Grandchild 1-2",
        },
      ],
    },
    {
      id: "child2",
      label: "Child 2",
      children: [
        {
          id: "grandchild2-1",
          label: "Grandchild 2-1",
          children: [
            {
              id: "greatgrandchild2-1-1",
              label: "Great Grandchild 2-1-1",
            },
          ],
        },
      ],
    },
    {
      id: "child3",
      label: "Child 3",
      children: [
        {
          id: "grandchild3-1",
          label: "Grandchild 3-1",
        },
        {
          id: "grandchild3-2",
          label: "Grandchild 3-2",
          children: [
            {
              id: "greatgrandchild3-2-1",
              label: "Great Grandchild 3-2-1",
            },
            {
              id: "greatgrandchild3-2-2",
              label: "Great Grandchild 3-2-2",
            },
            {
              id: "greatgrandchild3-2-3",
              label: "Great Grandchild 3-2-3",
            },
          ],
        },
      ],
    },
    { id: "child4", label: "Child 4" },
    { id: "child5", label: "Child 5" },
    { id: "child6", label: "Child 6" },
    { id: "child7", label: "Child 7" },
  ],
};
