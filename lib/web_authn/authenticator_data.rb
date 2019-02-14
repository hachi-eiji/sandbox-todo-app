module WebAuthn
  class AuthenticatorData
    RP_ID_HASH_LENGTH = 32 # RP_ID_HASHの長さ
    FLAGS_LENGTH = 1
    COUNTER_LENGTH = 4

    attr_reader :data

    def initialize(data)
      @data = data
    end

    def attested_cred_data
      # 文字の最後まで取得する
      @attested_cred_data ||= WebAuthn::AttestedCredentialData.new(data_at(RP_ID_HASH_LENGTH + FLAGS_LENGTH + COUNTER_LENGTH))
    end

    def flags
      @flags ||= data_at(RP_ID_HASH_LENGTH, FLAGS_LENGTH).unpack1('b*')
    end

    def rp_id_hash
      @rp_id_hash ||= data_at(0, RP_ID_HASH_LENGTH)
    end

    def signature_count
      # 32-bit unsigned big-endian integer.
      @sign_count ||= data_at(RP_ID_HASH_LENGTH + FLAGS_LENGTH, COUNTER_LENGTH).unpack1('L>')
    end

    private

    def data_at(position, length = nil)
      position_end = length.nil? ? -1 : position + length - 1
      @data[position..position_end]
    end
  end
end
