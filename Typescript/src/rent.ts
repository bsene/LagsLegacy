import Service from "./service";
const dataFile = process.env.LAGS_ORDER_FILE2;
const service = new Service(dataFile);

if (process.argv.length > 0) {
  const cmd = process.argv[0];
  if (cmd === "-a") {
    if (process.argv.length < 5) {
      console.log("usage ts-node rent -a START DURTN PRICE");
      process.exit();
    }

    service.addOrderWithArgs(process.argv.slice(1));
    process.exit();
  }

  if (cmd === "-l") {
    service.list();
    process.exit();
  }

  if (cmd === "-d") {
    if (process.argv.length < 2) {
      console.log("usage: ts-node rent -d ID");
      process.exit();
    }

    service.deleteOrderWith;
  }
}
