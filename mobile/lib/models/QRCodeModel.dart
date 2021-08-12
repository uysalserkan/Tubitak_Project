//     eventId: Number;
//     eventName: String;
//     firstName: String;
//     lastName: String;
//     userTcNo: String;
//     creationDate: String

class QRCodeModel {
  final eventId;
  final eventName;
  final firstName;
  final lastName;
  final userTcNo;
  final creationDate;

  QRCodeModel({
    this.eventId,
    this.eventName,
    this.firstName,
    this.lastName,
    this.userTcNo,
    this.creationDate,
  });

  factory QRCodeModel.fromJson(Map<String, dynamic> json) {
    return new QRCodeModel(
      eventId: json["eventId"],
      eventName: json["eventName"],
      firstName: json["firstName"],
      lastName: json["lastName"],
      userTcNo: json["userTcNo"],
      creationDate: json["creationDate"],
    );
  }

  Map<String, dynamic> toJson() => {
        'firstName': firstName,
        'lastName': lastName,
        'tcNo': userTcNo,
        'eventId': eventId,
        'eventName': eventName,
        'creationDate': creationDate,
      };
}
