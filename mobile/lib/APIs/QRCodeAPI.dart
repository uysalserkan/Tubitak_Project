import 'dart:convert';

import 'package:http/http.dart';
import 'package:mobile/models/QRCodeModel.dart';
import 'package:mobile/models/EventModel.dart';

class QRCodeAPI {
  final baseUrl = 'http://10.0.2.2:8080/qrcode/';

  Future<QRCodeModel> getQRCode(String eventId, String tcno) async {
    Response resp = await get(Uri.parse(baseUrl + "$eventId/$tcno/"));
    if (resp.statusCode == 200) {
      var obj = jsonDecode(resp.body);

      return new QRCodeModel(
        creationDate: obj['creationDate'],
        eventId: obj['eventId'],
        userTcNo: obj['userTcNo'],
        eventName: obj['eventName'],
        firstName: obj['firstName'],
        lastName: obj['lastName'],
      );
    }

    return new QRCodeModel();
    // `http://localhost:8080/qrcode/${eventId}/${tcNo}`
  }

  Future<List<EventModel>> getAllQRCodes(String tcNo) async {
    Response resp = await get(Uri.parse(baseUrl + "$tcNo"));
    List<EventModel> registeredEvents = new List<EventModel>.generate(
      0,
      (index) => new EventModel(
          eventId: 0,
          eventName: "",
          startDate: "",
          endDate: "",
          quota: 0,
          latitude: "",
          longtitude: "",
          eventCategory: ""),
    );
    if (resp.statusCode == 200) {
      var obj = jsonDecode(resp.body);

      for (int i = 0; i < obj.length; i++) {
        registeredEvents
          ..add(new EventModel(
              eventId: obj[i]['id'],
              eventName: obj[i]['eventName'],
              startDate: obj[i]['startDate'],
              endDate: obj[i]['endDate'],
              quota: obj[i]['quota'],
              latitude: (obj[i]['location']['latitude']),
              longtitude: (obj[i]['location']['longtitude']),
              eventCategory: obj[i]['eventCategory'] == null
                  ? 'OTHER'
                  : obj[i]['eventCategory']));
      }
    }

    return registeredEvents;

    // http://localhost:8080/qrcode/${tcNo}
  }
}
