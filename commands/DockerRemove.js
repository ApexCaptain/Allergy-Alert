const exec = require("child_process").exec;
const runPromisifiedCommand = async (cmd, required = false, showLog = true) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err && required) reject(err);
      else {
        const rst = stdout ? stdout : stderr;
        if (showLog) console.log(rst);
        resolve(rst);
      }
    });
  });
};
const createDockerContainer = async () => {
  console.info("Stop Previous Running Container");
  await runPromisifiedCommand(
    `docker container stop ${process.env.npm_package_config_containerName}`
  );
  console.info("Remove previous container");
  await runPromisifiedCommand(
    `docker rm ${process.env.npm_package_config_containerName}`
  );
};
createDockerContainer();
