require 'rails_helper'

describe WebAuthn::AttestationStatement::Packed do
  describe '#valid?' do
    let(:attestation_statement) {
      WebAuthn::AttestationStatement::Packed.new(statement)
    }
    let(:authenticator_data) {
      double('authenticator_data', { data: pack('C289C5CA9B0460F9346AB4E42D842743404D31F4846825A6D065BE597A87051D410000000BF8A011F38C0A4D15800617111F9EDC7D00108959CEAD5B5C48164E8ABCD6D9435C6FA363616C6765455332353661785820F7C4F4A6F1D79538DFA4C9AC50848DF708BC1C99F5E60E51B42A521B35D3B69A61795820DE7B7D6CA564E70EA321A4D5D96EA00EF0E2DB89DD61D4894C15AC585BD23684')})
    }
    subject { attestation_statement.valid?(authenticator_data, client_data_json) }

    context 'has x5c' do
      # https://fidoalliance.org/specs/fido-v2.0-rd-20170927/fido-client-to-authenticator-protocol-v2.0-rd-20170927.html#commands の
      # example4を http://cbor.me/ で変換したもの
      # {
      # "fmt": "packed",
      # "authData": h'C289C5CA9B0460F9346AB4E42D842743404D31F4846825A6D065BE597A87051D410000000BF8A011F38C0A4D15800617111F9EDC7D00108959CEAD5B5C48164E8ABCD6D9435C6FA363616C6765455332353661785820F7C4F4A6F1D79538DFA4C9AC50848DF708BC1C99F5E60E51B42A521B35D3B69A61795820DE7B7D6CA564E70EA321A4D5D96EA00EF0E2DB89DD61D4894C15AC585BD23684',
      # "attStmt": {
      #   "alg": -7,
      #   "sig": h'3045022013F73C5D9D530E8CC15CC9BD96AD586D393664E462D5F0561235E6350F2B728902210090357FF910CCB56AC5B596511948581C8FDDB4A2B79959948078B09F4BDC6229',
      #   "x5c": [h'3082019330820138A003020102020900859B726CB24B4C29300A06082A8648CE3D0403023047310B300906035504061302555331143012060355040A0C0B59756269636F205465737431223020060355040B0C1941757468656E74696361746F72204174746573746174696F6E301E170D3136313230343131353530305A170D3236313230323131353530305A3047310B300906035504061302555331143012060355040A0C0B59756269636F205465737431223020060355040B0C1941757468656E74696361746F72204174746573746174696F6E3059301306072A8648CE3D020106082A8648CE3D03010703420004AD11EB0E8852E53AD5DFED86B41E6134A18EC4E1AF8F221A3C7D6E636C80EA13C3D504FF2E76211BB44525B196C44CB4849979CF6F896ECD2BB860DE1BF4376BA30D300B30090603551D1304023000300A06082A8648CE3D0403020349003046022100E9A39F1B03197525F7373E10CE77E78021731B94D0C03F3FDA1FD22DB3D030E7022100C4FAEC3445A820CF43129CDB00AABEFD9AE2D874F9C5D343CB2F113DA23723F3']
      #   }
      # }
      let(:statement) {
        {
          'alg' => -7,
          'sig' => pack('3045022013F73C5D9D530E8CC15CC9BD96AD586D393664E462D5F0561235E6350F2B728902210090357FF910CCB56AC5B596511948581C8FDDB4A2B79959948078B09F4BDC6229'),
          'x5c' => [pack('3082019330820138A003020102020900859B726CB24B4C29300A06082A8648CE3D0403023047310B300906035504061302555331143012060355040A0C0B59756269636F205465737431223020060355040B0C1941757468656E74696361746F72204174746573746174696F6E301E170D3136313230343131353530305A170D3236313230323131353530305A3047310B300906035504061302555331143012060355040A0C0B59756269636F205465737431223020060355040B0C1941757468656E74696361746F72204174746573746174696F6E3059301306072A8648CE3D020106082A8648CE3D03010703420004AD11EB0E8852E53AD5DFED86B41E6134A18EC4E1AF8F221A3C7D6E636C80EA13C3D504FF2E76211BB44525B196C44CB4849979CF6F896ECD2BB860DE1BF4376BA30D300B30090603551D1304023000300A06082A8648CE3D0403020349003046022100E9A39F1B03197525F7373E10CE77E78021731B94D0C03F3FDA1FD22DB3D030E7022100C4FAEC3445A820CF43129CDB00AABEFD9AE2D874F9C5D343CB2F113DA23723F3')]
        }
      }
      # {
      #   "clientDataHash": h'687134968222EC17202E42505F8ED2B16AE22F16BB05B88C25DB9E602645F141',
      #   "rp": {"id": "acme.com", "name": "Acme"},
      #   "user": {"id": h'3082019330820138A0030201023082019330820138A003020102308201933082', "icon": "https://pics.acme.com/00/p/aBjjjpqPb.png", "name": "johnpsmith@example.com", "displayName": "John P. Smith"},
      #   "pubKeyCredParams": [{"alg": -7, "type": "public-key"}, {"alg": -257, "type": "public-key"}],
      #   "options": {"keyStorageDevice": true}
      # }
      let(:client_data_json) {
        pack('687134968222EC17202E42505F8ED2B16AE22F16BB05B88C25DB9E602645F141')
      }
      it { is_expected.to be_truthy }
    end


    context 'alg and sig is not found' do
      let(:statement) {
        {
          'x5c' => [pack('3082019330820138A003020102020900859B726CB24B4C29300A06082A8648CE3D0403023047310B300906035504061302555331143012060355040A0C0B59756269636F205465737431223020060355040B0C1941757468656E74696361746F72204174746573746174696F6E301E170D3136313230343131353530305A170D3236313230323131353530305A3047310B300906035504061302555331143012060355040A0C0B59756269636F205465737431223020060355040B0C1941757468656E74696361746F72204174746573746174696F6E3059301306072A8648CE3D020106082A8648CE3D03010703420004AD11EB0E8852E53AD5DFED86B41E6134A18EC4E1AF8F221A3C7D6E636C80EA13C3D504FF2E76211BB44525B196C44CB4849979CF6F896ECD2BB860DE1BF4376BA30D300B30090603551D1304023000300A06082A8648CE3D0403020349003046022100E9A39F1B03197525F7373E10CE77E78021731B94D0C03F3FDA1FD22DB3D030E7022100C4FAEC3445A820CF43129CDB00AABEFD9AE2D874F9C5D343CB2F113DA23723F3')]
        }
      }
      let(:client_data_json) { pack('687134968222EC17202E42505F8ED2B16AE22F16BB05B88C25DB9E602645F141') }
      it { is_expected.to be_falsey }
    end

    context 'both x5c and ecdaaKeyId found ' do
      let(:statement) {
        {
          'ecdaaKeyId' => 'some value', # draft
          'alg' => -7,
          'sig' => pack('3045022013F73C5D9D530E8CC15CC9BD96AD586D393664E462D5F0561235E6350F2B728902210090357FF910CCB56AC5B596511948581C8FDDB4A2B79959948078B09F4BDC6229'),
          'x5c' => [pack('3082019330820138A003020102020900859B726CB24B4C29300A06082A8648CE3D0403023047310B300906035504061302555331143012060355040A0C0B59756269636F205465737431223020060355040B0C1941757468656E74696361746F72204174746573746174696F6E301E170D3136313230343131353530305A170D3236313230323131353530305A3047310B300906035504061302555331143012060355040A0C0B59756269636F205465737431223020060355040B0C1941757468656E74696361746F72204174746573746174696F6E3059301306072A8648CE3D020106082A8648CE3D03010703420004AD11EB0E8852E53AD5DFED86B41E6134A18EC4E1AF8F221A3C7D6E636C80EA13C3D504FF2E76211BB44525B196C44CB4849979CF6F896ECD2BB860DE1BF4376BA30D300B30090603551D1304023000300A06082A8648CE3D0403020349003046022100E9A39F1B03197525F7373E10CE77E78021731B94D0C03F3FDA1FD22DB3D030E7022100C4FAEC3445A820CF43129CDB00AABEFD9AE2D874F9C5D343CB2F113DA23723F3')]
        }
      }
      let(:client_data_json) {
        pack('687134968222EC17202E42505F8ED2B16AE22F16BB05B88C25DB9E602645F141')
      }
      it { is_expected.to be_falsey }
    end

    private

    def pack(str)
      [str].pack('H*')
    end
  end
end
