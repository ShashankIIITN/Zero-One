import base85

def decode_base85(ciphertext):
  """Decodes a base85 encoded string.

  Args:
    ciphertext: A string containing the base85 encoded data.

  Returns:
    A string containing the decoded data.
  """

  decoded_data = base85.b85decode(ciphertext)
  return decoded_data.decode()

ciphertext = "0110 00 1010 101 0100 0 / 010 00 1010 101 / 00 000 / 1 0000 0 / 1000 0 000 1"
decoded_data = decode_base85(ciphertext)

print(decoded_data)