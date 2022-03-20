const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');
const setting = require('../settings.json');

text = `Voltage: ${setting.Voltage}V. Ampere: ${setting.Ampere}A. Manufacturing Date: ${setting.Date}. Company Name: ${setting.CompanyName}.`;

QRCode.toDataURL(text, function (err, imgData) {
    if (err) {
        console.log(err);
    }

    const doc = new jsPDF('p', 'mm', [101.6, 101.6]); // W X H
    // const companyTextWidth = doc.getTextWidth(setting.CompanyName);
    // doc.text(13,  y + 0, setting.CompanyName);
    // doc.setFontSize(9);

    let y = 0;
    for (let i = 0; i < 4; i++) {
        doc.addImage(imgData, 'PNG', 15.2, y + 0, 20, 20);
        doc.addImage(imgData, 'PNG', 65.7, y + 0, 20, 20);
        y += 26.5;
    }

    doc.save(`../output/${setting.FileName}.pdf`);
});