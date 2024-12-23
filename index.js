import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Mảng các commit message ngẫu nhiên
const commitMessages = [
  "Fix bug 🐛",
  "Add new feature 🚀",
  "Refactor code 🛠️",
  "Update README 📚",
  "Improve performance ⚡",
  "Fix typo ✏️",
  "Add unit tests ✅",
  "Optimize logic 🔧",
  "Update dependencies 📦",
  "General cleanup 🧹",
];

const markCommit = async (date, message) => {
  const data = { date: date.toISOString() };
  await jsonfile.writeFile(path, data);

  const git = simpleGit();
  await git.add([path]);
  await git.commit(message, { "--date": date.toISOString() });
};

const makeCommitsUntilToday = async (startDate) => {
  const git = simpleGit();
  const today = moment().startOf("day"); // Ngày hiện tại (bỏ giờ phút giây)
  let currentDay = moment(startDate);   // Ngày bắt đầu

  while (currentDay.isSameOrBefore(today)) {
    console.log(
      `Creating commits on ${currentDay.format("YYYY-MM-DD")}`
    );

    for (let i = 0; i < 300; i++) { // Tạo 300 commit mỗi ngày
      const randomMessage =
        commitMessages[random.int(0, commitMessages.length - 1)];

      console.log(
        `Commit ${i + 1} for ${currentDay.format("YYYY-MM-DD")} with message: "${randomMessage}"`
      );

      await markCommit(currentDay, randomMessage);
    }

    currentDay.add(1, "days"); 
    while (random.int(0, 10) > 0)
    currentDay.add(1, "days"); // Tăng ngày lên 1
  }

  console.log("Pushing all commits...");
  await git.push();
};

// Gọi hàm tạo commit từ ngày bắt đầu đến ngày hiện tại
makeCommitsUntilToday("2024-02-01");
