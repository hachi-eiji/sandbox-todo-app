require 'cose/key/ec2'

module WebAuthn
  class AttestedCredentialData
    AAGUID_LENGTH = 16
    CREDENTIAL_ID_LENGTH_LENGTH = 2

    def initialize(data)
      @data = data
    end

    def credential
      @credential ||= WebAuthn::Credential.new(credential_id, credential_public_key)
    end

    def credential_id
      @credential_id ||= data_at(AAGUID_LENGTH + CREDENTIAL_ID_LENGTH_LENGTH, credential_id_length)
    end

    def credential_public_key
      public_key = data_at(AAGUID_LENGTH + CREDENTIAL_ID_LENGTH_LENGTH + credential_id_length)
      cose_key = COSE::Key::EC2::from_cbor(public_key)
      # xとyを連結して先頭に0x04をつけるとpublic_keyがとれる
      # https://w3c.github.io/webauthn/#fido-u2f-attestation
      "\x04" + cose_key.x_coordinate + cose_key.y_coordinate
    end

    def credential_id_length
      # Byte length L of Credential ID, 16-bit unsigned big-endian integer.
      @credential_id_length ||= data_at(AAGUID_LENGTH, CREDENTIAL_ID_LENGTH_LENGTH).unpack1('n*')
    end

    def data_at(position, length = nil)
      position_end = if length.nil?
                       -1
                     else
                       position + length - 1
                     end
      @data[position..position_end]
    end
  end
end

