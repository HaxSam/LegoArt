import netz_conf as opt
import utime as time
import network

ap = network.WLAN(network.AP_IF)
nic = network.WLAN(network.STA_IF)
ip = None

nic.active(True)
for i in opt.netzwerken:
  nic.connect(i[0], i[1])
  time.sleep(2)
  print(".", end="")
  time.sleep(2)
  print(".", end="")
  if nic.isconnected():
    print(" Connected to", i[0])
    print(nic.ifconfig())
    ip = nic.ifconfig()[0]
    break

if nic.isconnected() == False:
  nic.active(False)
  ap.active(True)
  ap.config(essid="ESP_AP", authmode=0)
  ip = ap.ifconfig()[0]
  print(" AP activted")