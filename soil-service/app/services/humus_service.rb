# Here we calculate Humus Delta
class HumusService
  include Singleton

  CONSECUTIVE_YEAR_MULTIPLIER = 1.3

  def calculate_humus_balance fields
    fields.each do |field|
      previous_crop = nil
      field[:humus] = 0

      sorted = field[:crops].sort_by {|crop| crop[:year]}
      sorted.each do |s|
        crop = s[:crop]
        field[:humus] += (previous_crop == crop ? crop[:humus_delta] * CONSECUTIVE_YEAR_MULTIPLIER : crop[:humus_delta])
        previous_crop = crop
      end
    end
  end
end
