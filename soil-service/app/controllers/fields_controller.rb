class FieldsController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def index
    render json: FieldsService.instance.fetch_fields
  end

  def create
    render json: FieldsService.instance.fetch_fields(params[:fields])
  end
end
