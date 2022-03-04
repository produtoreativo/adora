class StartCycle {
  author: string;
  taskId: string;
  name: string;
  commit: string;
  commits: JSON[];
  data: {
    ref: string;
    eventType: string;
    name: string;
  };
}
export default StartCycle;
