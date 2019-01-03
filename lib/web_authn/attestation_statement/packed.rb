module WebAuthn
  module AttestationStatement
    class Packed
      def initialize(statement)
        @statement = statement
      end

      # see https://www.w3.org/TR/webauthn/#packed-attestation
      def valid?(authenticator_data, client_data_json)
        return false unless valid_format?

        # x5cが存在するときは ECDAAではないので
        if x5c
          valid_certificate_chain? &&
            valid_for_x5c?(authenticator_data, client_data_json) &&
            meet_certificate_requirement?
        elsif ecdaa_key_id
          # ここはまだドラフトなので未実装
          raise 'Not Support ECDAA'
        else
          raise 'Not Implement yet'
        end
      end

      private

      def valid_format?
        # alg,sigが必ず存在する
        # x5cとECDAAが両方あるのは不正
        if !(alg && sig) || x5c && ecdaa_key_id
          false
        else
          true
        end
      end

      def valid_certificate_chain?
        public_keys = certificate_chain.map(&:public_key)
        public_keys.all? do |public_key|
          public_key.is_a?(OpenSSL::PKey::EC) && public_key.check_key
        end
      end

      def valid_for_x5c?(authenticator_data, client_data_json)
        # sigが有効なsignatureか確認をする
        # authenticatorData とclientDataHashを連結させたものと比較する
        # SHA256を使っているのはalgが-7(ES256 ECDSA using P-256 curve and SHA-256 hash)であるため
        certificate_chain.first.public_key.verify(
          'SHA256',
          sig,
          authenticator_data.data + client_data_json
        )
      end

      def meet_certificate_requirement?
        certificate = certificate_chain.first
        subject = certificate.subject.to_a # 配列の配列になってる
        certificate.version == 2 &&
          subject.assoc('OU').at(1) == 'Authenticator Attestation' &&
          certificate.extensions.find { |ext| ext.oid == 'basicConstraints' }.value == 'CA:FALSE'
      end

      def valid_for_self_attestation?(public_key_object, client_data_json)
        public_key_object.verify(
          'SHA256',
          sig,
          authenticator_data.data + client_data_json
        )
      end

      def alg
        @statement['alg']
      end

      def ecdaa_key_id
        @statement['ecdaaKeyId']
      end

      def x5c
        @statement['x5c']
      end

      def sig
        @statement['sig']
      end

      # @return [Array]
      def certificate_chain
        x5c.map { |cert| OpenSSL::X509::Certificate.new(cert) }
      end
    end
  end
end
