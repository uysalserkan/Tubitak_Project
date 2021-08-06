class EventModel {
  final int eventId;
  final String eventName;
  final String startDate;
  final String endDate;
  final int quota;
  final String latitude;
  final String longtitude;
  final String eventCategory;

  EventModel({
    required this.eventId,
    required this.eventName,
    required this.startDate,
    required this.endDate,
    required this.quota,
    required this.latitude,
    required this.longtitude,
    required this.eventCategory,
  });

  factory EventModel.fromJson(Map<String, dynamic> json) {
    return EventModel(
        quota: json['id'],
        latitude: json['location']['latitude'],
        longtitude: json['location']['longtitude'],
        startDate: json['startDate'],
        eventName: json['eventName'],
        eventCategory: json['eventCategory'],
        endDate: json['endDate'],
        eventId: json['id']);
  }
}

/*
*  private final String startDate;
*  private final String endDate;
*  private final boolean eventStatus;
*  private final int quota;
*  private final LocationResponse location;
*  private final EventCategory eventCategory;
* */