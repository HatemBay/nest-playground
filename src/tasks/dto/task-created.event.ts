export class TaskCreatedEvent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
