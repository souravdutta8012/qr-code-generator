const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');
const setting = require('../settings.json');

text = `Voltage: ${setting.Voltage}V. Ampere: ${setting.Ampere}A. Manufacturing Date: ${setting.Date}. Company Name: ${setting.CompanyName}.`;

QRCode.toDataURL(text, function (err, imgData) {
    if (err) {
        console.log(err);
    }

    const docPrinter = new jsPDF('p', 'mm', [101.6, 101.6]); // W X H
    let y = 0;
    for (let i = 0; i < 4; i++) {
        docPrinter.addImage(imgData, 'PNG', 15.2, y + 0, 20, 20);
        docPrinter.addImage(imgData, 'PNG', 65.7, y + 0, 20, 20);
        y += 26.5;
    }
    docPrinter.save(`../output/${setting.FileName}.pdf`);

    const docA4 = new jsPDF('p', 'mm', 'a4');
    let width = docA4.internal.pageSize.getWidth();
    docA4.setFontSize(12);
    const companyTextWidth = docA4.getTextWidth(setting.CompanyName);
    y = 0;
    for (let i = 0; i < 8; i++) {
        docA4.addImage(imgData, 'PNG', width / 8 - 25 / 2, y + 0, 25, 25);
        docA4.text(width / 8 - companyTextWidth / 2, y + 28, setting.CompanyName);
        docA4.addImage(imgData, 'PNG', width * 3 / 8 - 25 / 2, y + 0, 25, 25);
        docA4.text(width * 3 / 8 - companyTextWidth / 2, y + 28, setting.CompanyName);
        docA4.addImage(imgData, 'PNG', width * 5 / 8 - 25 / 2, y + 0, 25, 25);
        docA4.text(width * 5 / 8 - companyTextWidth / 2, y + 28, setting.CompanyName);
        docA4.addImage(imgData, 'PNG', width * 7 / 8 - 25 / 2, y + 0, 25, 25);
        docA4.text(width * 7 / 8 - companyTextWidth / 2, y + 28, setting.CompanyName);
        y += 37;
    }
    docA4.save(`../output/${setting.FileName}-a4.pdf`);
});