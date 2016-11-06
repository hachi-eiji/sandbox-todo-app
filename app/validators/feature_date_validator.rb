# 未来日日付のバリデータ
class FeatureDateValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value && value < Time.now
      record.errors[attribute] << (options[:message] || "can't include past date")
    end
  end
end
