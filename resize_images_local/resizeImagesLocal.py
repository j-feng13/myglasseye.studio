from PIL import Image
from io import BytesIO
from os import path
import sys
import os

width_size_small = 650
width_size_large = 1920

def resize_image(image_path):
    img = Image.open(os.getcwd() + '/' + image_path)
    (img_width, img_height) = img.size

    wpercent_small = (width_size_small / float(img_width))
    hsize_small = int((float(img_height) * float(wpercent_small)))
    img_small = img.resize((width_size_small, hsize_small), Image.ANTIALIAS)

    wpercent_large = (width_size_large / float(img_width))
    hsize_large = int((float(img_height) * float(wpercent_large)))
    img_large = img.resize((width_size_large, hsize_large), Image.ANTIALIAS)

    img_small.save("small.jpg", 'JPEG', quality=80, optimize=True, progressive=True)
    img_large.save("large.jpg", 'JPEG', quality=80, optimize=True, progressive=True)

image_path = sys.argv[1]
resize_image(image_path)