const ethers = require("ethers");
const fs = require("fs");

const generate = async () => {
  const amount = process.argv[2];

  if (isNaN(amount) || amount < 1) {
    throw new Error("Invalid amount.");
  }
  const wallets = [];
  let length = (await fs.promises.readdir(`./wallets`, (err, files) => {return files.length})).length;

  for (let x = 0; x < amount; x++) {
    const { address, privateKey } = ethers.Wallet.createRandom();
    wallets.push({ address, privateKey });
  }

  fs.writeFile(
    `./wallets/wallets${length}.json`,
    JSON.stringify(wallets, null, 4),
    (err) => {
      if (err) throw err;
      console.log("Wallets generated.");
    }
  );
};


generate();
