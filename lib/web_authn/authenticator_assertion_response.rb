module WebAuthn
  class AuthenticatorAssertionResponse
    def initialize(attestation_object:, client_data_json:)
      @attestation_object = CBOR.decode(Base64.strict_decode64(attestation_object))
      @client_data_json = client_data_json
    end

    # https://www.w3.org/TR/2018/CR-webauthn-20180807/#registering-a-new-credential
    def valid?(current_challenge:, origin_url:, rp_id: nil)
      return false unless valid_origin?(origin_url) &&
        valid_challenge?(current_challenge) &&
        valid_type? &&
        valid_flag? &&
        valid_rp_id?(rp_id || rp_id_from_origin(origin_url))
      attestation_statement.valid?(authenticator_data, @client_data_json)
    end

    private

    # originの検証
    def valid_origin?(origin_url)
      client_data['origin'] == origin_url
    end

    def valid_challenge?(current_challenge)
      # base64urlでエンコードされている
      Base64.urlsafe_decode64(client_data['challenge']) == current_challenge
    end

    def valid_type?
      client_data['type'] == 'webauthn.create'
    end

    def valid_flag?
      # byteをbitに変換して中を見る
      flags = authenticator_data.flags
      # 0bit目がUP, 2bit目がUV
      flags[0] == '1' || flags[2] == '1'
    end

    def valid_rp_id?(rp_id)
      OpenSSL::Digest::SHA256.digest(rp_id) == authenticator_data.rp_id_hash
    end

    def client_data
      @client_data ||= JSON.parse(Base64.strict_decode64(@client_data_json))
    end

    def authenticator_data
      @authenticator_data ||= AuthenticatorData.new(@attestation_object['authData'])
    end

    def attestation_statement
      WebAuthn::AttestationStatement::Packed.new(@attestation_object['attStmt'])
    end

    def rp_id_from_origin(origin_url)
      URI.parse(origin_url).host
    end
  end
end
