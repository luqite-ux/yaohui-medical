"""Create product-detail crops from the customer-supplied Yaohui brochure.

Source: D:/Cursor/暂存/1422-安吉耀辉医疗用品/宣传册/*.jpg
The crop boxes intentionally exclude brochure copy, legacy contact details and certificates.
"""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


SOURCE = Path(r"D:\Cursor\暂存\1422-安吉耀辉医疗用品\宣传册")
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "images" / "products" / "gallery"

CROPS = {
    "plaster-of-paris-bandage": [
        ("4.jpg", (244, 1250, 850, 1682), "packaging"),
        ("4.jpg", (860, 1250, 1540, 1708), "product-range"),
        ("4.jpg", (244, 1710, 850, 2115), "unrolled-texture"),
        ("4.jpg", (860, 1710, 1190, 2115), "packing-options"),
        ("4.jpg", (1190, 1710, 1540, 2115), "roll-detail"),
        ("5.jpg", (1005, 1560, 1542, 2042), "colour-options"),
    ],
    "orthopedic-padding": [
        ("4.jpg", (2630, 1250, 3185, 1665), "roll-range"),
        ("4.jpg", (2630, 1730, 3185, 2140), "material-detail"),
        ("7.jpg", (175, 1600, 850, 2110), "unrolled-padding"),
        ("7.jpg", (865, 1600, 1540, 2110), "padding-rolls"),
    ],
    "elastic-bandage": [
        ("5.jpg", (1810, 1170, 2255, 1518), "unbleached"),
        ("5.jpg", (2260, 1170, 2718, 1518), "red-line"),
        ("5.jpg", (2725, 1170, 3180, 1518), "blue-line"),
        ("5.jpg", (1810, 1665, 2265, 2025), "skin-colour"),
        ("5.jpg", (2265, 1665, 2725, 2025), "bleached"),
    ],
}


def render(source_name: str, box: tuple[int, int, int, int], destination: Path) -> None:
    with Image.open(SOURCE / source_name) as original:
        crop = original.convert("RGB").crop(box)
        crop = ImageOps.fit(crop, (1200, 900), method=Image.Resampling.LANCZOS)
        crop = ImageEnhance.Brightness(crop).enhance(1.09)
        crop = ImageEnhance.Contrast(crop).enhance(1.035)
        crop = ImageEnhance.Color(crop).enhance(0.98)
        crop = crop.filter(ImageFilter.UnsharpMask(radius=1.1, percent=70, threshold=4))
        crop.save(destination, "WEBP", quality=92, method=6)


def main() -> None:
    for slug, items in CROPS.items():
        directory = OUTPUT / slug
        directory.mkdir(parents=True, exist_ok=True)
        for index, (source_name, box, label) in enumerate(items, start=1):
            destination = directory / f"{index:02d}-{label}.webp"
            render(source_name, box, destination)
            print(destination.relative_to(OUTPUT.parent.parent.parent))


if __name__ == "__main__":
    main()
