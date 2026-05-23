import os
import sys
import urllib.request
import zipfile
import subprocess
import shutil
import time

# 强行设置标准输出编码为 UTF-8，彻底解决 Windows 控制台默认 cp1252 导致 print 中文报错崩溃的问题
if sys.version_info >= (3, 7):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

def log(msg):
    print(f"[*] {msg}")
    sys.stdout.flush()

def download_file(url, filepath):
    log(f"开始从以下地址下载 FFmpeg Essentials Build (约 24MB):\n    {url}")
    
    # 带有重试和防超时机制的下载器
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    req = urllib.request.Request(url, headers=headers)
    
    start_time = time.time()
    try:
        with urllib.request.urlopen(req, timeout=60) as response, open(filepath, 'wb') as out_file:
            meta = response.info()
            file_size = int(meta.get("Content-Length", 0))
            log(f"文件总大小: {file_size / (1024*1024):.2f} MB")
            
            downloaded = 0
            block_size = 1024 * 256  # 256KB block
            while True:
                buffer = response.read(block_size)
                if not buffer:
                    break
                downloaded += len(buffer)
                out_file.write(buffer)
                percent = (downloaded / file_size) * 100 if file_size else 0
                # 每下载 10% 打印一次进度，避免刷屏
                if downloaded % (block_size * 20) < block_size or downloaded == file_size:
                    log(f"已下载: {downloaded / (1024*1024):.2f} MB ({percent:.1f}%)")
        
        duration = time.time() - start_time
        log(f"下载完成！耗时: {duration:.1f} 秒，平均速度: {file_size / (1024*1024) / duration:.2f} MB/s")
        return True
    except Exception as e:
        log(f"[-] 下载失败: {e}")
        return False

def main():
    workspace = r"c:\Users\User\Downloads\KIM LONG WEBSITE"
    scratch_dir = os.path.join(workspace, "scratch")
    if not os.path.exists(scratch_dir):
        os.makedirs(scratch_dir)
        
    zip_path = os.path.join(scratch_dir, "ffmpeg.zip")
    extract_dir = os.path.join(scratch_dir, "ffmpeg_extracted")
    
    # 高速代理源与官方 GyanD Essentials 备份源
    urls = [
        "https://mirror.ghproxy.com/https://github.com/GyanD/codexffmpeg/releases/download/7.0.1/ffmpeg-7.0.1-essentials_build.zip",
        "https://github.com/GyanD/codexffmpeg/releases/download/7.0.1/ffmpeg-7.0.1-essentials_build.zip"
    ]
    
    # 1. 下载 FFmpeg Essentials Build
    download_success = False
    for url in urls:
        if download_file(url, zip_path):
            download_success = True
            break
        log("[-] 尝试下一个备用下载源...")
        
    if not download_success:
        log("[-] 所有 FFmpeg 下载源均失败，请检查网络连接！")
        return
        
    # 2. 解压缩
    log("正在解压 FFmpeg.zip...")
    try:
        if os.path.exists(extract_dir):
            shutil.rmtree(extract_dir)
        os.makedirs(extract_dir)
        
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_dir)
        log("解压成功！")
    except Exception as e:
        log(f"[-] 解压失败: {e}")
        return
        
    # 3. 寻找 ffmpeg.exe 路径
    ffmpeg_exe = None
    for root, dirs, files in os.walk(extract_dir):
        if "ffmpeg.exe" in files:
            ffmpeg_exe = os.path.join(root, "ffmpeg.exe")
            break
            
    if not ffmpeg_exe or not os.path.exists(ffmpeg_exe):
        log("[-] 未在解压目录中找到 ffmpeg.exe 可执行文件！")
        return
    log(f"定位到 FFmpeg: {ffmpeg_exe}")
    
    # 4. 开始压缩视频
    videos_dir = os.path.join(workspace, "public", "videos")
    video_tasks = [
        {
            "name": "banquet-bg.mp4",
            "crf": "28",
            "desc": "首屏背景视频 A (原 40MB)"
        },
        {
            "name": "banquet-bg-2.mp4",
            "crf": "30", # CRF=30 提供极高性价比的极限体积压缩，控制在 5MB 左右
            "desc": "首屏背景视频 B (原 247MB)"
        }
    ]
    
    for task in video_tasks:
        video_name = task["name"]
        input_path = os.path.join(videos_dir, video_name)
        output_name = f"optimized_{video_name}"
        output_path = os.path.join(videos_dir, output_name)
        backup_path = os.path.join(videos_dir, f"backup_{video_name}")
        
        if not os.path.exists(input_path):
            log(f"[!] 找不到视频文件: {input_path}，跳过该项。")
            continue
            
        log(f"\n==========================================")
        log(f"🎬 开始压缩: {task['desc']}")
        log(f"==========================================")
        
        # 组装高防、高质、极致压缩的 FFmpeg 命令行参数：
        # -y: 自动覆盖
        # -i: 输入视频
        # -vcodec libx264: 使用兼容性最广的 H.264
        # -crf: 压制系数 (28-30)
        # -r 24: 降帧至电影级 24 帧
        # -an: 彻底剔除音轨，避开浏览器流量和静音安全拦截
        # -vf scale=1280:-2: 等比收缩至 720P 高清晰背景规格
        cmd = [
            ffmpeg_exe,
            "-y",
            "-i", input_path,
            "-vcodec", "libx264",
            "-crf", task["crf"],
            "-r", "24",
            "-an",
            "-vf", "scale=1280:-2",
            output_path
        ]
        
        log(f"执行命令: {' '.join(cmd)}")
        try:
            start_comp = time.time()
            # 开启进程运行
            process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)
            
            # 实时打印 FFmpeg 的编码输出
            last_print = time.time()
            while True:
                line = process.stdout.readline()
                if not line and process.poll() is not None:
                    break
                if line:
                    line = line.strip()
                    # 只打印带 progress、time 或 size 的关键输出，防止日志爆炸
                    if time.time() - last_print > 4 and ("time=" in line or "fps=" in line or "size=" in line):
                        log(f"压缩中... [FFmpeg] {line}")
                        last_print = time.time()
            
            rc = process.poll()
            if rc == 0:
                duration_comp = time.time() - start_comp
                orig_size = os.path.getsize(input_path) / (1024*1024)
                new_size = os.path.getsize(output_path) / (1024*1024)
                log(f"✅ 压缩成功！耗时: {duration_comp:.1f} 秒")
                log(f"   原文件大小: {orig_size:.2f} MB")
                log(f"   压缩后大小: {new_size:.2f} MB (压缩率: {(1 - new_size/orig_size)*100:.1f}%)")
                
                # 5. 备份与重命名替换
                log("正在替换原视频...")
                if os.path.exists(backup_path):
                    os.remove(backup_path)
                os.rename(input_path, backup_path)
                os.rename(output_path, input_path)
                log(f"   替换完成！原视频已安全备份为: backup_{video_name}")
            else:
                log(f"[-] 压缩执行失败，返回值: {rc}")
        except Exception as e:
            log(f"[-] 压缩过程出错: {e}")
            
    # 6. 清理临时安装垃圾
    log("\n==========================================")
    log("正在清理临时文件，保持系统整洁...")
    try:
        if os.path.exists(zip_path):
            os.remove(zip_path)
        if os.path.exists(extract_dir):
            shutil.rmtree(extract_dir)
        log("清理完成！")
    except Exception as e:
        log(f"[!] 清理临时文件失败: {e}")
        
    log("✨ 恭喜！FFmpeg 自动下载、安装及双视频极致压缩备份流程全部圆满完成！")

if __name__ == "__main__":
    main()
