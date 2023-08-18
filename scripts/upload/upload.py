from io import BufferedReader
from typing import Tuple
import click
from auth import Auth
import requests
from endpoints import Endpoint
from constants import *
from helpers import log

class Platform():
    ALL = 'all'
    ANDROID = 'android'
    IOS = 'ios'

auth = Auth()

def auth_get(url: str) -> requests.Response:
    return requests.get(auth.auth_url(url))

def auth_post(url: str, data: dict, files: dict = None) -> requests.Response:
    return requests.post(auth.auth_url(url), data=data, files=files)

def upload_android() -> Tuple[requests.Response, BufferedReader]:
    url, data, files, payload = Endpoint.upload(APK_PATH)
    return auth_post(url, data=data, files=files), payload

def upload_ios() -> Tuple[requests.Response, BufferedReader]:
    url, data, files, payload = Endpoint.upload(IPA_PATH)
    return auth_post(url, data=data, files=files), payload

@click.command()
@click.option('--platform', default=Platform.ALL, help='Platform to upload')
@click.option("--deploy", default=None, help="Deploy to the store")
def upload(platform, deploy):
    auth.login()
    file_register = None
    if (platform == Platform.ALL or platform == Platform.ANDROID):
        log("Uploading android...")
        response, file_register = upload_android()
        log(response.json(), isolate=True)
    # if (platform == Platform.ALL or platform == Platform.IOS):
    #     log("Uploading ios...")
    #     response, file_register = upload_ios()
    #     log(response.json(), isolate=True)
    file_register.close()

