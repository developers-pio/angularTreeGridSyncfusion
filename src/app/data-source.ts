export function getData(dataCount?: number): object {
  let taskName: string[] = ['Planning', 'Design', 'Implementation Phase'];
  let subtasksType1: string[] = [
    'Plan timeline',
    'Plan budget',
    'Allocate resources',
    'Planning complete'
  ];
  let subtasksType2: string[] = [
    'Develop prototype',
    'Get approval of design',
    'Design Documentation',
    'Design complete'
  ];
  let subtasksType3: string[] = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

  function getSubTaskName(task, index) {
    if (task === 'Planning') {
      return subtasksType1[index];
    } else if (task === 'Design') {
      return subtasksType2[index];
    } else if (task === 'Implementation Phase') {
      return subtasksType3[index];
    }
  }

  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  let priority: string[] = ['Normal', 'High'];
  let approved: boolean[] = [true, false];
  if (typeof dataCount === 'string') {
    dataCount = parseInt(dataCount);
  }
  let subtasks: string = 'subtasks';
  let code = 10001;
  let parent: number = -1;
  for (let i: number = 0; i <= dataCount; i++) {
    if (i % 5 === 0) {
      parent = i;
    }
    const task = taskName[Math.floor(Math.random() * taskName.length)];
    if (i % 5 !== 0) {
      let num: number = isNaN((virtualData.length % parent) - 1)
        ? 0
        : (virtualData.length % parent) - 1;
      virtualData[num][subtasks].push({
        taskID: code++,
        startDate: randomDate(new Date(2021, 0, 1), new Date()),
        endDate: randomDate(new Date(2021, 5, 1), new Date()),
        taskName: task,
        priority: priority[Math.floor(Math.random() * priority.length)],
        duration: Math.floor(Math.random() * 10),
        progress: Math.floor(Math.random() * 100),
        approved: approved[Math.floor(Math.random() * approved.length)],
        subtasks: [
          {
            taskID: code++,
            startDate: randomDate(new Date(2021, 0, 1), new Date()),
            endDate: randomDate(new Date(2021, 5, 1), new Date()),
            taskName: getSubTaskName(task, 0),
            priority: priority[Math.floor(Math.random() * priority.length)],
            duration: Math.floor(Math.random() * 10),
            progress: Math.floor(Math.random() * 100),
            approved: approved[Math.floor(Math.random() * approved.length)]
          },
          {
            taskID: code++,
            startDate: randomDate(new Date(2021, 0, 1), new Date()),
            endDate: randomDate(new Date(2021, 5, 1), new Date()),
            taskName: getSubTaskName(task, 1),
            priority: priority[Math.floor(Math.random() * priority.length)],
            duration: Math.floor(Math.random() * 10),
            progress: Math.floor(Math.random() * 100),
            approved: approved[Math.floor(Math.random() * approved.length)]
          },
          {
            taskID: code++,
            startDate: randomDate(new Date(2021, 0, 1), new Date()),
            endDate: randomDate(new Date(2021, 5, 1), new Date()),
            taskName: getSubTaskName(task, 2),
            priority: priority[Math.floor(Math.random() * priority.length)],
            duration: Math.floor(Math.random() * 10),
            progress: Math.floor(Math.random() * 100),
            approved: approved[Math.floor(Math.random() * approved.length)]
          },
          {
            taskID: code++,
            startDate: randomDate(new Date(2021, 0, 1), new Date()),
            endDate: randomDate(new Date(2021, 5, 1), new Date()),
            taskName: getSubTaskName(task, 3),
            priority: priority[Math.floor(Math.random() * priority.length)],
            duration: Math.floor(Math.random() * 10),
            progress: Math.floor(Math.random() * 100),
            approved: approved[Math.floor(Math.random() * approved.length)]
          }
        ]
      });
    } else {
      virtualData.push({
        taskID: code++,
        startDate: randomDate(new Date(2021, 0, 1), new Date()),
        endDate: randomDate(new Date(2021, 5, 1), new Date()),
        taskName: task,
        priority: priority[Math.floor(Math.random() * priority.length)],
        duration: Math.floor(Math.random() * 10),
        progress: Math.floor(Math.random() * 100),
        approved: approved[Math.floor(Math.random() * approved.length)],
        subtasks: []
      });
    }
  }
  return virtualData;
}

export let virtualData: any[] = [];
