interface closest {
  (arg0: string): any;
}

interface target {
  closest: closest;
  value: any;
}

export interface event {
  target: target;
}
