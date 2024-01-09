import fs from "fs";
import path from "path";
import readline from "readline";

interface Student {
  name: string;
  age: number;
  address: string;
}

class OOP {
  private danhsach: Student[];
  private filePath: string;
  private rl: readline.Interface;
  constructor() {
    this.danhsach = [];
    this.filePath = path.resolve("./danh_sach.txt");
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  menu = `Chuong trinh quan li danh sach sinh vien
1. Nhap danh sach
2. Hien thi danh sach
3. Tim kiem theo ten
0. Thoat chuong trinh`;

  public main(): void {
    this.rl.question(this.menu, (choice) => {
      switch (choice) {
        case "1":
          this.nhapDanhsach();
          break;
        case "2":
          console.log(this.danhsach);
          this.main();
          break;
        case "3":
          this.findByName();
          break;
        default:
          console.log("Chương trình đã kết thúc");
          this.rl.close();
          break;
      }
    });
  }
  question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  async nhapDanhsach(): Promise<void> {
    const name = await this.question("Mời bạn nhập tên: ");
    const age = parseInt(await this.question("Mời bạn nhập tuổi: "));
    const address = await this.question("Mời bạn nhập địa chỉ: ");

    this.danhsach.push({ name, age, address });
    await this.writeFile();
    const answer = await this.question(
      "Bạn có muốn nhập tiếp danh sách? (Y/n): ",
    );
    if (answer.toLowerCase() === "y") {
      await this.nhapDanhsach();
    } else {
      console.log("Danh sách đã nhập xong");
      this.main();
    }
  }

  findByName(): void {
    this.rl.question("Mời bạn nhập tên cần tìm: ", (name) => {
      const result = this.danhsach.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase());
      });
      console.log(result);
      this.main();
    });
  }

  async writeFile(): Promise<void> {
    fs.writeFileSync(this.filePath, JSON.stringify(this.danhsach));
    console.log("Danh sách đã được ghi vào tệp danh_sach.txt");
  }
}

const oop = new OOP();
oop.main();
