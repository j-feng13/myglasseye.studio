import boto3
import PIL
from PIL import Image
from io import BytesIO
from os import path

s3 = boto3.resource('s3')
s3_bucket = 'myglasseye.studio.photos'
width_size_small = 650
width_size_large = 1920

def lambda_handler(event, context):
    for key in event.get('Records'):
        object_key = key['s3']['object']['key']

        # Split the key name into `new_` and `IMAGE_NAME.jpg` Then remove `.jpg`
        key_prefix = object_key.split('_', 1)[1][:-4]

        obj = s3.Object(
            bucket_name=s3_bucket,
            key=object_key,
        )

        obj_body = obj.get()['Body'].read()
        img = Image.open(BytesIO(obj_body))
        (img_width, img_height) = img.size

        wpercent_small = (width_size_small / float(img_width))
        hsize_small = int(float(img_height) * float(wpercent_small))
        img_small = img.resize((width_size_small, hsize_small), PIL.Image.ANTIALIAS)

        wpercent_large = (width_size_large / float(img_width))
        hsize_large = int(float(img_height) * float(wpercent_large))
        img_large = img.resize((width_size_large, hsize_large), PIL.Image.ANTIALIAS)

        buffer_small = BytesIO()
        buffer_large = BytesIO()

        img_small.save(buffer_small, 'JPEG', quality=80, optimize=True, progressive=True)
        img_large.save(buffer_large, 'JPEG', quality=80, optimize=True, progressive=True)

        buffer_small.seek(0)
        buffer_large.seek(0)

        # Uploading the image
        obj_small = s3.Object(
            bucket_name=s3_bucket,
            key=key_prefix + "/small.jpg",
        )

        obj_large = s3.Object(
            bucket_name=s3_bucket,
            key=key_prefix + "/large.jpg"
        )

        obj_small.put(Body=buffer_small)
        obj_large.put(Body=buffer_large)
        s3.Object(s3_bucket, object_key).delete()
