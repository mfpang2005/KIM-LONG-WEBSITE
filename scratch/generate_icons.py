import os
from PIL import Image

def generate_icons():
    base_path = r"c:\Users\User\Downloads\KIM LONG WEBSITE"
    logo_path = os.path.join(base_path, "public", "images", "logo.jpg")
    app_path = os.path.join(base_path, "app")
    
    if not os.path.exists(logo_path):
        print(f"Error: logo.jpg not found at {logo_path}")
        return
        
    print(f"Loading logo from {logo_path}...")
    img = Image.open(logo_path)
    
    # Ensure image is in RGBA format for ICO generation to satisfy Next.js Turbopack
    img_rgba = img.convert("RGBA")
    
    # 1. Generate favicon.ico (multi-size RGBA)
    favicon_path = os.path.join(app_path, "favicon.ico")
    img_rgba.save(favicon_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Generated favicon.ico (RGBA) at {favicon_path}")
    
    # 2. Generate icon.png (standard icon)
    icon_png_path = os.path.join(app_path, "icon.png")
    img_rgba.save(icon_png_path, format="PNG")
    print(f"Generated icon.png at {icon_png_path}")
    
    # 3. Generate apple-icon.png (typical Apple touch icon, 180x180)
    apple_icon_path = os.path.join(app_path, "apple-icon.png")
    img_apple = img_rgba.resize((180, 180), Image.Resampling.LANCZOS)
    img_apple.save(apple_icon_path, format="PNG")
    print(f"Generated apple-icon.png at {apple_icon_path}")

if __name__ == "__main__":
    generate_icons()
