import netz
import eeprom
import socket

imgData = bytes()

##Socket Server
s = socket.socket()
s.bind((netz.ip, 3000))
s.listen(1)
print(netz.ip)

while True:
  cl, addr = s.accept()
  print("client conncted from", addr)
  try:
    while True:
      msg = cl.recv(26)
      msg += b"\x00"
      if not msg:
        break
      for n in range(0, 26, 2):
         chace = (msg[n] << 4) + msg[n+1]
         imgData += bytes([chace])
      print(msg)
      print(imgData)
      eeprom.imgInput(imgData)
      imgData = bytes()
  except:
    pass