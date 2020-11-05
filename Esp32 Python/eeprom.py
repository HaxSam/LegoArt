import random
from machine import Pin, I2C

##CONSTANTS
v2 = True
null = bytes([0x00])
def toBytes(n):
  return bytes([n])
def clear(addr=0x00):
  if addr != 0x00:
    write(addr, bytes(14))
  else:
    write(addr, bytes(256))

##I2C connection
i2c = I2C(scl=Pin(22), sda=Pin(21))
eepromAddr = 84
      
def changePointer(addr, payload=False):
  if type(addr) == bytes:
    if v2: 
      packed = null + addr
    else:
      packed = addr
  else:
    if v2: 
      packed = null + bytes([addr])
    else:
      packed = bytes([addr])

  if payload:
    return packed
  i2c.writeto(eepromAddr, packed)

def read(addr, leng):
  changePointer(addr)
  data = i2c.readfrom(eepromAddr, leng)
  return data

def write(addr, data):
  packed = changePointer(addr, True)

  if type(data) == str:
    packed += data
  elif type(data) == bytes:
    packed += data
  elif type(data) == list & type(data[0]) == bytes:
    for n in data:
      packed += data
  else:
    for n in data:
      packed += bytes([n])
      
  i2c.writeto(eepromAddr, packed)

def freeSpace():
  freeSpaceAddr = list(map(toBytes,range(0x00, 0x10)))
  data = list(map(toBytes, range(0x10, 0x100, 14)[:-1]))
  changePointer(0x00)
  for n in freeSpaceAddr:
    addr = i2c.readfrom(eepromAddr, 1)
    if addr == null:
      while True:
        pointer = random.choice(data)
        if read(pointer, 1) == null:
          break
      write(n, pointer)
      return pointer

def imgInput(data):
  pointer = freeSpace()
  write(pointer, data)