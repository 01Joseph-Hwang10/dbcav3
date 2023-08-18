from io import BufferedReader
from typing import Optional, Tuple
from urllib.parse import urljoin
import os
from credentials import SYNOLOGY_URL
from helpers import log

def process_endpoint(endpoint):
    log(urljoin(SYNOLOGY_URL, endpoint), label="Endpoint")
    return urljoin(SYNOLOGY_URL, endpoint)

class Endpoint():

    @staticmethod
    def auth(username: str, password: str) -> str:
        endpoint = "/webapi/auth.cgi?api=SYNO.API.Auth&version=3&method=login&account=%s&passwd=%s&session=FileStation&format=sid" % (username, password)
        return process_endpoint(endpoint)

    @staticmethod
    def list_share() -> str:
        endpoint = "/webapi/entry.cgi?api=SYNO.FileStation.List&version=2&method=list_share"
        return process_endpoint(endpoint)

    @staticmethod
    def list(folder_path: str) -> str:
        endpoint = "/webapi/entry.cgi?api=SYNO.FileStation.List&version=2&method=list&folder_path=%s" % folder_path
        return process_endpoint(endpoint)

    @staticmethod
    def upload(file_path: str, folder_path: Optional[str] = "/Labis/Releases") -> Tuple[str, dict, dict, BufferedReader]:
        endpoint = "/webapi/entry.cgi?api=SYNO.FileStation.Upload&version=2&method=upload"
        payload = open(file_path, 'rb')
        filename = os.path.basename(file_path)
        data = {
            "path": folder_path,
            "create_parents": True,
            "overwrite": True,
        }
        files = {'file': (filename, payload, 'application/octet-stream')}
        return process_endpoint(endpoint), data, files, payload
