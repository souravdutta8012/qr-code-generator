@echo off
echo Creating QR code....
cd project
call npm install
call npm run build
echo Done! Get you QR pdf from output folder....
@pause