@rem uses Chocolatey https://chocolatey.org/ to install everything I use for this project

call choco install git
call choco install github
call choco install visualstudiocode
call choco install nodejs
call choco install npm

@rem call npm install -g typescript Not yet
call npm install -g bower

echo done
