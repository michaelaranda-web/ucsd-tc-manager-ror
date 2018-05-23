class EventsController < ApplicationController
  skip_before_action :protect_from_forgery
  protect_from_forgery with: :null_session
  
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  # GET /events
  # GET /events.json
  def index
    @events = Event.all
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find(params[:id])
    @attendees = @event.attendees
  end

  # GET /events/new
  def new
    @event = Event.new
    @members = Member.all
    
    event_types = []
    EventType.all.each do |event_type|
      event_type_data = {
        id: event_type.id,
        name: event_type.name,
        volunteer_hours: event_type.volunteer_hours,
        driving_distance: event_type.driving_distance,
        start_time_hour: event_type.try(:start_time).try(:hour),
        start_time_minutes: event_type.try(:start_time).try(:min),
        end_time_hour: event_type.try(:end_time).try(:hour),
        end_time_minutes: event_type.try(:end_time).try(:min)
      }
      
      event_types.push(event_type_data)
    end
    @event_types = event_types
    
  end

  # GET /events/1/edit
  def edit
  end
  
  def search
    @events = Event.search_by_name(params[:event_name])
    
    render 'index'
  end

  # POST /events
  # POST /events.json
  def create
    puts "*" * 80
    puts event_params
    puts attendees_param
    puts "*" * 80
    
    @event = Creators::Event.new.create_from_post(attendees_param, event_params)
    
    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(
        :name,
        :date,
        :event_summary,
        :comments,
        :volunteer_hours,
        :driving_distance,
        :start_time,
        :end_time,
        :event_type_id
        )
    end
    
    def attendees_param
      params.permit(:attendees => [])[:attendees]
    end
end
