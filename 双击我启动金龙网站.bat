@echo off
:: 设置控制台为 UTF-8 编码，防止中文乱码
chcp 65001 >nul
title 金龙网站本地预览服务启动器
color 0A

echo ==========================================================
echo               金龙网站 (Kim Long Website)
echo            正在为您启动本地预览服务，请稍候...
echo ==========================================================
echo.

:: 切换到网站项目根目录
cd /d "C:\Users\User\Downloads\KIM LONG WEBSITE"

:: 检查 package.json 是否存在
if not exist "package.json" (
    echo [错误] 找不到 package.json 文件！
    echo 请确认项目在 C:\Users\User\Downloads\KIM LONG WEBSITE 目录中。
    pause
    exit /b 1
)

echo [提示] 项目目录确认正常...
echo [提示] 正在启动服务，请稍候 4 秒后浏览器将自动打开...
echo [提示] 如需停止服务，请直接关闭此窗口。
echo.

:: 4秒后自动打开浏览器（等服务器启动完毕）
start "" cmd /c "timeout /t 5 >nul && start http://localhost:3000"

:: 直接使用 Node.js 完整路径启动，不依赖 PATH 环境变量
"C:\Program Files\nodejs\npm.cmd" run dev

echo.
echo [提示] 服务已停止。按任意键关闭...
pause >nul
