class HomeController < ApplicationController
  def index
    @user_is_admin = current_user.has_role? :admin
  end
end
