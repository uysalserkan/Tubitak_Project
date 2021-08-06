import 'dart:convert';

import 'package:mobile/models/EventModel.dart';
import 'package:http/http.dart';

class EventAPI {
  Future<List<EventModel>> getEvents() async {
    DateTime today = new DateTime.now();
    String dateSlug =
        "${today.year.toString()}-${today.month.toString().padLeft(2, '0')}-${today.day.toString().padLeft(2, '0')}";

    Response resp = await get(Uri.parse('http://10.0.2.2:8080/events'));
    List<EventModel> events = List<EventModel>.generate(
        999,
        (index) => new EventModel(
            eventId: 0,
            eventName: "",
            startDate: "",
            endDate: "",
            quota: 0,
            latitude: "",
            longtitude: "",
            eventCategory: ""));
    if (resp.statusCode == 200) {
      final obj = jsonDecode(resp.body);

      for (var i = 0; i < obj.length; i++) {
        if (DateTime.parse(obj[i]["endDate"])
            .isAfter(DateTime.parse(dateSlug))) {
          events.add(new EventModel(
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
    }
    for (int i = 0; i < events.length; i++) {
      print(events[i].eventCategory);
    }
    return events;
  }

  Future<EventModel> getEventById(int id) async {
    Response resp =
        await get(Uri.parse('http://10.0.2.2:8080/events/' + id.toString()));

    if (resp.statusCode == 200) {
      final obj = jsonDecode(resp.body);
      print("obj");
      print(obj);
      return new EventModel(
          eventId: obj['id'],
          eventName: obj['eventName'],
          startDate: obj['startDate'],
          endDate: obj['endDate'],
          quota: obj['quota'],
          latitude: (obj['location']['latitude']),
          longtitude: (obj['location']['longtitude']),
          eventCategory:
              obj['eventCategory'] == null ? 'OTHER' : obj['eventCategory']);
    } else {
      throw "Bulunamadı";
    }
  }
}

/* 
 * 1: 205473
 * 2: bf240f
 * 3: 609491
 * 4: 7b77b5
 */