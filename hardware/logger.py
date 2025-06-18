from datetime import datetime


def get_current_datetime():
  return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def log(log_file, message):
  with open(log_file, 'a') as f:
    f.write("[%s] %s\n" % (get_current_datetime(), message))
