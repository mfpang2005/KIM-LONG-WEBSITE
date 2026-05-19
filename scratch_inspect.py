import os
from PIL import Image

src_path = r"C:\Users\User\.gemini\antigravity\brain\ecae9dbb-99ba-4d55-ab5e-9ce60b9b2ed8\media__1779203749631.jpg"
dest_dir = r"c:\Users\User\Downloads\KIM LONG WEBSITE\public\images"
dest_path = os.path.join(dest_dir, "award-2.png")

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

try:
    img = Image.open(src_path)
    print(f"Image format: {img.format}, size: {img.size}, mode: {img.mode}")
except Exception as e:
    print(f"Error opening image: {e}")
