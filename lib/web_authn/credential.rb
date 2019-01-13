module WebAuthn
  class Credential
    attr_reader :id, :public_key

    def initialize(id, public_key)
      @id = id
      @public_key = public_key
    end
  end
end
