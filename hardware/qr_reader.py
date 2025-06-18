import serial
from send_code import send_post_request
from logger import log



if __name__ == "__main__":
	log_file = '../log/qr_reader.log'
	serial_port = '/dev/ttyACM0'
	baud_rate = 9600

	try:
		with serial.Serial(serial_port, baud_rate, timeout=1) as ser:
			print("Listening for QR codes on %s..." % serial_port)

			while True:
				data = ser.readline()
				qr_code = data.decode('utf-8').strip()

				if qr_code:
					print("Scanned QR Code: %s" % qr_code)
					log(log_file, 'Scanned code: ' + qr_code)
					status, body = send_post_request(qr_code, 'qr')
					log(log_file, 'Server response: ' + str(status) + ' ' + str(body))

	except serial.SerialException as e:
		print("Error accessing %s: %s" % (serial_port, e))
		log(log_file, "Error accessing %s: %s" % (serial_port, e))
	except KeyboardInterrupt:
		print('Exiting program.')
	except Exception as e:
		log(log_file, "An error occurred: %s" % e)
