const fs = require("fs");
const path = require("path");
const readline = require("readline");
const filePath = path.resolve(__dirname, "danh_sach.txt");

let danhsach = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const oop = {
  choice: 0,
  menu: `Chuong trinh quan li danh sach sinh vien
1. Nhap danh sach
2. Hien thi danh sach
3. Tim kiem theo ten
0. Thoat chuong trinh`,
  main: function () {
    do {
      rl.question(this.menu, (choice) => {
        switch (choice) {
          case "1":
            this.nhapDanhsach();
            break;
          case "2":
            console.log(danhsach);
            this.main();
            break;
          case "3":
            this.findByName();
            break;
          default:
            console.log("Chương trình đã kết thúc");
            rl.close();
            break;
        }
      });
    } while (this.choice != 0);
  },
  nhapDanhsach: async function () {
    const question = (prompt) => {
      return new Promise((resolve) => {
        rl.question(prompt, resolve);
      });
    };

    const name = await question("Mời bạn nhập tên: ");
    const age = await question("Mời bạn nhập tuổi: ");
    const address = await question("Mời bạn nhập địa chỉ: ");

    danhsach.push({ name, age, address });
    await this.writeFile();
    const answer = await question("Bạn có muốn nhập tiếp danh sách? (Y/n): ");
    if (answer.toLowerCase() === "y") {
      await this.nhapDanhsach();
    } else {
      console.log("Danh sách đã nhập xong");
      this.main();
    }
  },
  findByName: async function () {
    rl.question("Mời bạn nhập tên cần tìm: ", (name) => {
      const result = danhsach.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase());
      });
      console.log(result);
      this.main();
    });
  },
  writeFile: async function () {
    fs.writeFileSync(filePath, JSON.stringify(danhsach));
    console.log("Danh sách đã được ghi vào tệp danh_sach.txt");
  },
};

oop.main();

//1. Nhap danh sach
//2. Hien thi danh sach
//3. Tim kiem theo ten
//4. thoat chuong trinh
