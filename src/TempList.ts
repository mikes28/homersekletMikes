import type { DateTemp } from "./DateTemp";

export default class TempList {
  temps: DateTemp[] = [];

  add(item: DateTemp): void {
    this.temps.push(item);
  }

  remove(item: DateTemp): void {
    this.temps = this.temps.filter(
      (i) => i.day !== item.day || i.temperature !== item.temperature,
    );
  }

}
