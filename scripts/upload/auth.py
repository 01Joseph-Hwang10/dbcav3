from credentials import USERNAME, PASSWORD
from endpoints import Endpoint
import requests

class Auth():
    def __init__(self, json=None):
        if json != None:
            self.did = json['data']['did']
            self.sid = json['data']['sid']
    
    def set(self, json):
        self.did = json['data']['did']
        self.sid = json['data']['sid']

    def login(self):

        result = requests.get(Endpoint.auth(USERNAME, PASSWORD)).json()

        assert result['success'] == True

        self.set(result)

    def auth_url(self, base_url: str) -> str:
        return "%s&_sid=%s" % (base_url, self.sid)
