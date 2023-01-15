import Order from "./order";
import * as readline from "node:readline/promises";
import fs from "node:fs";
export default class Service {
  private orderList: Order[] = [];
  constructor(private dataFile: string) {}

  // diplay list of orders
  List() {
    this.readOrderFile(this.dataFile);
    this.orderList.sort(
      (prevOrder: Order, order: Order) => prevOrder.start - order.start
    );
    console.log("ORDER LIST");
    console.log(`ID\tSTART\tDURTN\tPRICE`);
    console.log(`--\t-----\t-----\t-----`);
    this.orderList.forEach((order: Order) => {
      console.log(
        `${order.id}\t${order.start}\t${order.duration}\t${order.price}`
      );
    });
    console.log();
  }

  async addOrder() {
    const rl = readline.createInterface(process.stdin);
    console.log("ADD AN ORDER");
    console.log("FORMAT  ID;START;DURATION;PRICE");
    const line: string = ((await rl.question("")) as string).toUpperCase();
    const fields = line.split(";");
    const field1 = fields[0];
    const fld2 = parseInt(fields[1], 10);
    const field3 = parseInt(fields[2], 10);
    const fld4 = parseFloat(fields[3]);
    const order = new Order(field1, fld2, field3, fld4);
    await this.readOrderFile(this.dataFile);
    this.orderList.push(order);
    this.writeOrders(this.dataFile);
  }

  async addOrderWithArgs(fields: string[]) {
    const field1 = fields[0];
    const fld2 = parseInt(fields[1], 10);
    const field3 = parseInt(fields[2], 10);
    const fld4 = parseFloat(fields[3]);
    const order = new Order(field1, fld2, field3, fld4);
    await this.readOrderFile(this.dataFile);
    this.orderList.push(order);
    this.writeOrders(this.dataFile);
  }

  // updating the file
  async delete() {
    const rl = readline.createInterface(process.stdin);
    console.log("DELETE ORDER");
    console.log("ID:");
    let key = await rl.question("");
    key = key.toUpperCase();
    await this.readOrderFile(this.dataFile);
    this.orderList = this.orderList.filter((order) => order.id !== key);
    this, this.writeOrders(this.dataFile);
  }

  async deleteOrderWithArgs(fields: string[]) {
    const key = fields[0].toUpperCase();
    await this.readOrderFile(this.dataFile);
    this.orderList = this.orderList.filter((order) => order.id !== key);
    this.writeOrders(this.dataFile);
  }

  rev(orders: Order[], debug: boolean): number {
    if (orders.length === 0) return 0.0;
    const order = orders[0];
    // doesn't work for orders with start beyond end of year
    // see report #4807
    const l = [];
    for (const o of orders) {
      if (o.start >= order.start + order.duration) {
        l.push(o);
      }
    }

    const l2 = [];
    for (const i of orders.slice(1)) {
      l2.push(orders[i]);
    }

    const r = order.price + this.rev(l, debug);
    const r2 = this.rev(l2, debug);

    if (debug) {
      console.log(`\t ${Math.max(r, r2)}`);
    }

    return Math.max(r, r2);
  }

  // write orders into a file
  writeOrders(fName: string) {
    let data = "Id;Start;Duration;Price\n";
    for (const order of this.orderList) {
      data += `${order.id};${order.start};${order.duration};${order.price}\n`;
    }
    fs.writeFile(fName, data, () => {
      console.log(`An error has occured when attempted to writing on ${fName}`);
    });
  }

  // read orders file and compute revenue
  async readOrderFile(filename: string) {
    try {
      fs.readFile(filename, (err, data: Buffer) => {
        if (err) throw err;

        this.orderList = [];
        const lines = data.toString().split("\n");
        for (let index = 0; index < lines.length; index += 1) {
          if (index > 0) {
            const values = lines[index].split(";");
            const field1 = values[0];
            const fld2 = parseInt(values[1], 10);
            const field3 = parseInt(values[2], 10);
            const fld4 = parseFloat(values[3]);
            const order = new Order(field1, fld2, field3, fld4);
            this.orderList.push(order);
          }
        }
      });
    } catch (err) {
      console.log("ORDER.CSV FILE NOT FOUND. CREATING FILE");
      this.writeOrders(this.dataFile);
    }
  }
}
