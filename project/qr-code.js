const QRCode = require('qrcode');
const { jsPDF } = require('jspdf');
const setting = require('../settings.json');

text = `Voltage: ${setting.Voltage}V. Ampere: ${setting.Ampere}A. Manufacturing Date: ${setting.Date}.`;

QRCode.toDataURL(text, function (err, imgData) {
    if (err) {
        console.log(err);
    }
    const doc = new jsPDF('p', 'mm', [108, 140]);
    let y = 1.5;
    for (let i = 0; i < 5; i++) {
        doc.addImage(imgData, 'PNG', 17, y + (25 - 20) / 2, 20, 20);
        doc.addImage(imgData, 'PNG', 71, y + (25 - 20) / 2, 20, 20);
        y += 28;
    }
    doc.save(`../output/${setting.FileName}.pdf`);
});