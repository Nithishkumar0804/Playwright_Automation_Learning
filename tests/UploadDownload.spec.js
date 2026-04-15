const Excel = require("exceljs");
const test = require("@playwright/test");

async function readExcel(existingValue, updatingValue, path) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.getWorksheet("Sheet1");
    const result = await writeExcel(
        existingValue,
        updatingValue,
        workbook,
        path,
        worksheet
    );
}

async function writeExcel(existingValue, updatingValue, workbook, path, worksheet) {
    const result = { row: -1, col: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value === existingValue) {
                result.row = rowNumber;
                result.col = columnNumber;
            }
        });
    });
    const cell = worksheet.getCell(result.row, result.col);
    cell.value = updatingValue;
    await workbook.xlsx.writeFile(path);
    return result;
}

test("UploadDownload Validation",async({page})=>{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole("button", { name: "Download" }).click()
    ]);
    const filePath='/Users/Nithishkumar/Downloads/download.xlsx';
    await download.saveAs(filePath);
    readExcel("Mango", "Watermelon", filePath);
    await page.waitForTimeout(2000);
    await page.locator("#fileinput").setInputFiles(filePath);
});