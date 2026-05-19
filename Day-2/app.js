const chalk = require('chalk');
console.log(chalk.yellow('Hello Rishav'));

console.log(chalk.blue("Node Version:", process.version));
console.log(chalk.green("Platform:",process.platform));
console.log(chalk.red("Architecture:", process.arch));
console.log(chalk.cyan("Current Directory:", process.cwd()));
console.log(chalk.magenta("Memory Usage:", process.memoryUsage()));
console.log(chalk.yellow("Uptime:", process.uptime(), "seconds"));

console.log(chalk.black("This file is at"), __filename);
console.log(chalk.black("This directory is at"), __dirname);

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);

const PORT =process.env.PORT || 5000;
console.log(chalk.green("Server is running on port:",PORT));