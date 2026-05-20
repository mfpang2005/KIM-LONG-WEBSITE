@echo off
:: 设置控制台为 UTF-8 编码，防止中文乱码
chcp 65001 >nul
title 金龙网站本地预览服务启动器
echo ==========================================================
echo               金龙网站 (Kim Long Website)
echo            正在为您启动本地预览服务，请稍候...
echo ==========================================================
echo.

:: 切换到网站项目的实际根目录
cd /d "C:\Users\User\Downloads\KIM LONG WEBSITE"

:: 检查 package.json 是否存在
if not exist "package.json" (
    echo [错误] 找不到 package.json 文件！
    echo 请确认您的项目是否在 C:\Users\User\Downloads\KIM LONG WEBSITE 目录中。
    pause
    exit /b
)

echo [提示] 已成功进入项目目录，正在执行启动命令...
echo.
npm run dev

echo.
echo [提示] 服务已停止。
pause
