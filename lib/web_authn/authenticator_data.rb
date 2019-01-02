module WebAuthn
  class AuthenticatorData
    RP_ID_HASH_LENGTH = 32 # RP_ID_HASHの長さ
    FLAGS_LENGTH = 1
    COUNTER_LENGTH = 4

    def initialize(data)
      @data = data
    end

    def flags
      @flags ||= data_at(RP_ID_HASH_LENGTH, FLAGS_LENGTH).unpack1('b*')
    end

    def rp_id_hash
      @rp_id_hash ||= data_at(0, RP_ID_HASH_LENGTH)
    end

    private

    def data_at(position, length = nil)
      position_end = length.nil? ? -1 : position + length - 1
      @data[position..position_end]
    end
  end
end
