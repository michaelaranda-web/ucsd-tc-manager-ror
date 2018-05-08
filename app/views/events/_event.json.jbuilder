json.extract! event, :id, :name, :date, :event_summary, :comments, :volunteer_hours, :driving_distance, :start_time, :end_time, :created_at, :updated_at
json.url event_url(event, format: :json)
