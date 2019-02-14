require 'cbor'

module WebAuthn
  module Fake
    class Create
      def initialize(challenge: fake_challenge, origin: 'http://localhost', rp_id: 'localhost', options: {})
        @challenge = challenge
        @origin = origin
        @rp_id = rp_id
        @options = options
      end

      def encode_client_data_json
        Base64.strict_encode64(client_data_json)
      end

      def encode_attestation_object
        Base64.strict_encode64(attestation_object)
      end

      def attestation_object
        CBOR.encode({ fmt: 'packed', attStmt: {}, authData: authenticator_data })
      end

      def authenticator_data
        @authenticator_data ||= rp_id_hash + flags + raw_sign_count + attested_credential_data
      end

      def flags
        ["#{options[:up_flag] || 1}0#{options[:uv_flag] || 1}000#{attested_credential_data.empty? ? 0 : 1}0"].pack('b*')
      end

      private

      attr_reader :options

      # @see https://www.w3.org/TR/2018/CR-webauthn-20180807/#sec-client-data
      def client_data_json
        @client_data_json ||= {
          type: options[:type] || 'webauthn.create',
          challenge: Base64.urlsafe_encode64(@challenge),
          origin: @origin
        }.to_json
      end

      def fake_challenge
        SecureRandom.random_bytes(32)
      end


      def rp_id_hash
        OpenSSL::Digest::SHA256.digest(@rp_id)
      end

      def raw_sign_count
        [options[:sign_count] || 0].pack('L>')
      end

      def attested_credential_data
        aaguid + [credential_id.length].pack('n*') + credential_id + credential_public_key
      end


      def aaguid
        @aaguid ||= SecureRandom.random_bytes(16)
      end

      def credential_id
        @credential_id ||= SecureRandom.random_bytes(16)
      end

      def credential_public_key
        # TODO: ここなんでこのロジックなんだ？
        # 公開鍵暗号アルゴリズムを実現するための多倍長整数演算をする
        # to_s(2)で自身の絶対値を big-endian の符号無し整数のバイナリ列に変換する
        # https://docs.ruby-lang.org/ja/latest/class/OpenSSL=3a=3aBN.html#I_TO_S
        key_bytes = credential_key.public_key.to_bn.to_s(2)
        fake_cose_credential_key(
          x_coordinate: key_bytes[1..32],
          y_coordinate: key_bytes[33..64],
        )
      end

      # https://www.w3.org/TR/2018/CR-webauthn-20180807/#sctn-encoded-credPubKey-examples
      def fake_cose_credential_key(x_coordinate: nil, y_coordinate: nil)
        CBOR.encode(
          1 => 2, # kty: EC2 key type
          3 => -7, # alg: ES256 signature algorithm
          -1 => 1, #  crv: P-256 curve
          -2 => x_coordinate || SecureRandom.random_bytes(32), # x-coordinate as byte string 32 bytes in length
          -3 => y_coordinate || SecureRandom.random_bytes(32) # y-coordinate as byte string 32 bytes in length
        )
      end

      def credential_key
        @credential_key ||= OpenSSL::PKey::EC.new("prime256v1").generate_key
      end
    end
  end
end
