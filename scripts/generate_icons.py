import os
import math
from PIL import Image, ImageDraw, ImageFilter

def create_pwa_icon(size: int, is_maskable: bool = False) -> Image.Image:
    # High resolution supersampling for smooth antialiasing
    scale = 4
    canvas_size = size * scale
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    center = canvas_size / 2
    
    # Background
    if is_maskable:
        # Full bleed rectangle with subtle gradient
        for y in range(canvas_size):
            ratio = y / canvas_size
            r = int(2 + ratio * (7 - 2))
            g = int(132 - ratio * (132 - 40))
            b = int(199 - ratio * (199 - 130))
            draw.line([(0, y), (canvas_size, y)], fill=(r, g, b, 255))
    else:
        # Rounded squircle
        corner_radius = canvas_size * 0.22
        # Draw background rounded rect
        draw.rounded_rectangle(
            [canvas_size * 0.04, canvas_size * 0.04, canvas_size * 0.96, canvas_size * 0.96],
            radius=corner_radius,
            fill=(3, 105, 161, 255),
            outline=(56, 189, 248, 255),
            width=int(canvas_size * 0.015)
        )

    # Subsurface / Aquifer Geological Layers
    layer_y_start = canvas_size * 0.58
    layer_height = canvas_size * 0.1
    
    # Layer 1: Alluvial/Silt layer
    draw.polygon([
        (canvas_size * 0.15, layer_y_start),
        (canvas_size * 0.85, layer_y_start),
        (canvas_size * 0.85, layer_y_start + layer_height),
        (canvas_size * 0.15, layer_y_start + layer_height)
    ], fill=(14, 165, 233, 70))
    
    # Layer 2: Deep Aquifer formation (water-bearing sand & gravel)
    draw.polygon([
        (canvas_size * 0.15, layer_y_start + layer_height),
        (canvas_size * 0.85, layer_y_start + layer_height),
        (canvas_size * 0.85, canvas_size * 0.85),
        (canvas_size * 0.15, canvas_size * 0.85)
    ], fill=(2, 132, 199, 140))

    # Aquifer water waves
    for i in range(3):
        wave_y = layer_y_start + layer_height * (1.2 + i * 0.6)
        wave_points = []
        for x in range(int(canvas_size * 0.2), int(canvas_size * 0.8), 10):
            y_offset = math.sin((x / canvas_size) * 12 + i) * (canvas_size * 0.018)
            wave_points.append((x, wave_y + y_offset))
        for p in range(len(wave_points) - 1):
            draw.line([wave_points[p], wave_points[p+1]], fill=(56, 189, 248, 220), width=int(canvas_size * 0.012))

    # Stylized Water Droplet with Scientific Core
    drop_top = (center, canvas_size * 0.18)
    drop_width = canvas_size * 0.26
    drop_bottom = canvas_size * 0.54
    
    # Water drop body
    drop_poly = [drop_top]
    steps = 40
    for s in range(steps + 1):
        angle = math.pi * (s / steps)
        # Semicircle bottom
        x = center + (drop_width / 2) * math.cos(angle)
        y = (drop_bottom - drop_width / 2) + (drop_width / 2) * math.sin(angle)
        drop_poly.append((x, y))
    drop_poly.append(drop_top)
    
    draw.polygon(drop_poly, fill=(240, 249, 255, 255), outline=(56, 189, 248, 255))
    
    # Inner droplet glow (emerald subtle accent for pure groundwater detection)
    inner_drop_top = (center, canvas_size * 0.24)
    inner_drop_width = canvas_size * 0.18
    inner_drop_bottom = canvas_size * 0.50
    inner_poly = [inner_drop_top]
    for s in range(steps + 1):
        angle = math.pi * (s / steps)
        x = center + (inner_drop_width / 2) * math.cos(angle)
        y = (inner_drop_bottom - inner_drop_width / 2) + (inner_drop_width / 2) * math.sin(angle)
        inner_poly.append((x, y))
    inner_poly.append(inner_drop_top)
    draw.polygon(inner_poly, fill=(16, 185, 129, 230))

    # Sonar / Depth Detection Ring radiating from droplet
    for r_factor in [0.38, 0.44]:
        draw.arc(
            [center - canvas_size * r_factor, center - canvas_size * r_factor,
             center + canvas_size * r_factor, center + canvas_size * r_factor],
            start=30, end=150,
            fill=(125, 211, 252, 180),
            width=int(canvas_size * 0.014)
        )
        
    # Vertical borehole sounding measurement needle
    draw.line(
        [(center, canvas_size * 0.45), (center, canvas_size * 0.85)],
        fill=(255, 255, 255, 230),
        width=int(canvas_size * 0.016)
    )
    # Measurement depth ticks
    for tick_y in [0.55, 0.65, 0.75]:
        draw.line(
            [(center - canvas_size * 0.03, canvas_size * tick_y),
             (center + canvas_size * 0.03, canvas_size * tick_y)],
            fill=(255, 255, 255, 200),
            width=int(canvas_size * 0.012)
        )

    # Downscale smoothly using high-quality LANCZOS
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

def main():
    os.makedirs("public/icons", exist_ok=True)
    
    # Generate 192x192
    icon_192 = create_pwa_icon(192)
    icon_192.save("public/icons/icon-192x192.png", "PNG")
    print("Generated public/icons/icon-192x192.png")
    
    # Generate 512x512
    icon_512 = create_pwa_icon(512)
    icon_512.save("public/icons/icon-512x512.png", "PNG")
    print("Generated public/icons/icon-512x512.png")
    
    # Generate 512x512 maskable
    icon_maskable = create_pwa_icon(512, is_maskable=True)
    icon_maskable.save("public/icons/icon-maskable-512x512.png", "PNG")
    print("Generated public/icons/icon-maskable-512x512.png")

    # Generate favicon (64x64 ico)
    icon_64 = create_pwa_icon(64)
    icon_64.save("public/favicon.ico", format="ICO")
    print("Generated public/favicon.ico")

if __name__ == "__main__":
    main()
