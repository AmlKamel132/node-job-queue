const {
  handlerFailure,
  handlerCompleted,
  handlerStalled,
} = require("./handler");
const { connectQueue } = require("./config");
const fs = require("fs");

const nameQueue = "request-json-file";
const cases = connectQueue(nameQueue);

const processJob = (job, done) => {
  try {
    fs.writeFile(
      `${job.data.param}.json`,
      JSON.stringify(job.data),
      function (err) {
        if (err) throw err;
      }
    );
    done(null, "succes");
  } catch (error) {
    done(null, error);
  }
};

const initJob = () => {
  console.info("job is working!");
  cases.process(processJob);
  cases.on("failed", handlerFailure);
  cases.on("completed", handlerCompleted);
  cases.on("stalled", handlerStalled);
};

initJob();
