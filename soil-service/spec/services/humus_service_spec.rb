require 'rails_helper'

RSpec.describe HumusService do
  describe '#calculate_humus_balance' do
    subject(:calculate_humus_balance) { described_class.instance.calculate_humus_balance FieldsService.instance.fetch_fields }

    it 'returns calculated fields objects' do
      expect(calculate_humus_balance).to all(
        include(
          id: an_instance_of(Integer),
          name: an_instance_of(String),
          area: an_instance_of(Float),
          crops: an_instance_of(Array),
          humus: be_a_kind_of(Numeric),
        )
      )
    end

    it 'has crops for 5 years' do
      calculate_humus_balance.each do |field|
        expect(field[:crops]).to match_array(
          [
            include(year: 2020),
            include(year: 2021),
            include(year: 2022),
            include(year: 2023),
            include(year: 2024),
          ]
        )
      end
    end

    it 'has calculated humus correctly' do
      expect(calculate_humus_balance).to match_array(
        [
          include(humus: -12.399999999999999),
          include(humus: -3),
          include(humus: 2),
        ]
      )
    end
  end
end
