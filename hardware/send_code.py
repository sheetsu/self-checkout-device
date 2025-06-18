import requests
import yaml



def load_config():
  with open('../config.yml', 'r') as file:
    config = yaml.safe_load(file)
  return { 'client_url': config['client_url'] }


def send_post_request(code, kind):
  config = load_config()
  params = {'code': code, 'kind': kind}
  response = requests.post(config['client_url'] + "/process-scanned-code", json=params,
                           timeout=10)

  return response.status_code, response.json()
