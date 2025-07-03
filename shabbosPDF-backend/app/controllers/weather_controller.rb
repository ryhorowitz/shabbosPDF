class WeatherController < ApplicationController
  require 'httparty'

  def friday_night
    lat = 39.9524
    lon = -75.1636
    response = HTTParty.get("https://api.openweathermap.org/data/2.5/forecast/daily?lat=39.95&lon=-75.16&cnt=7&appid=8d24d9c33ac6504e11d5a30675342a24
&units=standard")
    render json: response
  end
end
