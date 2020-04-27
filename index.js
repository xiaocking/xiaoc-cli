#!/usr/bin/env node
const fs = require("fs");
const program = require("commander");
const download = require("download-git-repo");
const handlebars = require("handlebars");
const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");

program
  .version("1.0.0", "-v, --version")
  .command("init <name>")
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer
        .prompt([
          {
            name: "description",
            message: "请输入项目描述",
          },
          {
            name: "author",
            message: "请输入作者名称",
          },
        ])
        .then((answers) => {
          const spinner = ora("正在下载模板...");
          spinner.start();
          download(
            "https://github.com:xiaocking/xiaoc-cli#master",
            name,
            { clone: true },
            (err) => {
              if (err) {
                spinner.fail();
                console.log(symbols.error, chalk.red(err));
              } else {
                spinner.succeed();
                const fileName = `${name}/package.json`;
                const meta = {
                  name,
                  description: answers.description,
                  author: answers.author,
                };
                if (fs.existsSync(fileName)) {
                  const content = fs.readFileSync(fileName).toString();
                  const result = handlebars.compile(content)(meta);
                  fs.writeFileSync(fileName, result);
                }
                console.log(symbols.success, chalk.green("项目初始化完成"));
                console.log("");
                console.log(chalk.green(`cd ${name}`));
                console.log(chalk.green(`npm run serve`));
                console.log("");
              }
            }
          );
        });
    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red("项目已存在"));
    }
  });

program.on("--help", () => {
  console.log("");
  console.log("-v | --version 查看版本");
  console.log("init <ProjectName> 创建项目");
  console.log("");
});

program.parse(process.argv);
