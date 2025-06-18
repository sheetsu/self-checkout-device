from evdev import InputDevice, categorize, ecodes, list_devices
from send_code import send_post_request
from logger import log
import sys



key_map = {
  'KEY_0': '0', 'KEY_1': '1', 'KEY_2': '2', 'KEY_3': '3', 'KEY_4': '4', 'KEY_5': '5', 'KEY_6': '6', 'KEY_7': '7',
  'KEY_8': '8', 'KEY_9': '9', 'KEY_A': 'a', 'KEY_B': 'b', 'KEY_C': 'c', 'KEY_D': 'd', 'KEY_E': 'e', 'KEY_F': 'f',
  'KEY_G': 'g', 'KEY_H': 'h', 'KEY_I': 'i', 'KEY_J': 'j', 'KEY_K': 'k', 'KEY_L': 'l', 'KEY_M': 'm', 'KEY_N': 'n',
  'KEY_O': 'o', 'KEY_P': 'p', 'KEY_Q': 'q', 'KEY_R': 'r', 'KEY_S': 's', 'KEY_T': 't', 'KEY_U': 'u', 'KEY_V': 'v',
  'KEY_W': 'w', 'KEY_X': 'x', 'KEY_Y': 'y', 'KEY_Z': 'z'
}
log_file = '../log/card_reader.log'
ok_card_readers = [
  { 'product': 53, 'vendor': 65535, 'version': 272 },
  { 'product': 1040, 'vendor': 2520, 'version': 257 },
  { 'product': 53, 'vendor': 65535, 'version': 272 },
]



def device_params(device):
  return {
    'product': device.info.product,
    'vendor': device.info.vendor,
    'version': device.info.version
  }


def is_ok_card_reader(device):
  params = device_params(device)
  for reader in ok_card_readers:
    if reader == params:
      return True
  return False


def select_device():
  devices = [InputDevice(device) for device in list_devices()]
  for device in devices:
    if is_ok_card_reader(device):
      return device
  return None



if __name__ == "__main__":
  try:
    device = select_device()
    if device is None:
      log(log_file, 'No card reader found connected to the machine.')
      sys.exit(1)

    log(log_file, "Listening on %s (%s)" % (device.path, device.name))

    scanned_code = ''

    for event in device.read_loop():
      try:
        if event.type == ecodes.EV_KEY:
          data = categorize(event)
          if data.keystate == 1: # Key down
            key_symbol = data.keycode
            if key_symbol in key_map:
              character = key_map[key_symbol]
              scanned_code += character

            elif key_symbol == 'KEY_ENTER':
              print('Scanned code:' + scanned_code)
              log(log_file, 'Scanned code: ' + scanned_code)
              status, body = send_post_request(scanned_code, 'card')
              log(log_file, 'Server response: ' + str(status) + ' ' + str(body))
              scanned_code = ''

      except Exception as e:
        scanned_code = ''
        log(log_file, "An error occurred: %s" % e)

  except Exception as e:
    log(log_file, "An error occurred: %s" % e)
