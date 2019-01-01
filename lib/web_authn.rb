module WebAuthn
  class << self
    def credential_options(user_id:, user_name:, display_name: user_name)
      {
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        rp: {
          id: Settings.webauthn.rp.id, name: Settings.webauthn.rp.name
        },
        user: {
          name: user_name,
          id: Base64.strict_encode64(user_id.to_s),
          display_name: display_name,
          icon: Settings.webauthn.user.icon
        },
        attestation: Settings.webauthn.attestation
      }
    end
  end
end
