@echo off
echo Creating QR code....
mkdir output
cd project
call npm install
call npm run build
cd ..
echo Done! Get you QR pdf from output folder....
@pause