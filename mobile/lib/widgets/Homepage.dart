import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/models/EventModel.dart';
import 'package:mobile/widgets/RegisterPage.dart';

Icon getIcon(String category) {
  /*
   * CODE
   * GAME
   * MUSIC
   * RACE
   * EDUCATION
   * BUSINESS
  */

  var catColor = Colors.blueGrey;

  if (category == "GAME") {
    return Icon(Icons.sports_esports_outlined);
  } else if (category == "CODE") {
    return Icon(
      Icons.code_outlined,
      color: catColor,
    );
  } else if (category == "MUSIC") {
    return Icon(
      Icons.library_music_outlined,
      color: catColor,
    );
  } else if (category == "RACE") {
    return Icon(
      Icons.sports_motorsports_outlined,
      color: catColor,
    );
  } else if (category == "EDUCATION") {
    return Icon(
      Icons.cast_for_education_outlined,
      color: catColor,
    );
  } else if (category == "BUSINESS") {
    return Icon(
      Icons.business_center_outlined,
      color: catColor,
    );
  } else {
    return Icon(
      Icons.pie_chart_outline_sharp,
      color: catColor,
    );
  }
}

List<Widget> getAllEvents(events) {
  List<Widget> children = new List<Widget>.generate(0, (index) => Card());
  for (var each in events) {
    children.add(new Card(
      key: Key(each.eventId.toString()),
      child: InkWell(
        child: Text(each.eventName),
      ),
    ));
  }

  // print("tüm eventler alındı");

  // events.map((e) => {
  //       // children.add(new Card(
  //       //   key: Key(e.eventId.toString()),
  //       //   child: InkWell(
  //       //     onTap: () {
  //       //       print("On Tab @ ${e.eventName}");
  //       //     },
  //       //     child: Column(
  //       //       children: <Widget>[
  //       //         Text(e.eventName),
  //       //         Text(e.startDate),
  //       //         Text(e.endDate),
  //       //       ],
  //       //     ),
  //       //   ),
  //       // ))
  //     });

  print(children);

  return children;
}

class Homepage extends StatefulWidget {
  const Homepage({
    Key? key,
    @required this.events,
  }) : super(key: key);
  final events;

  @override
  _HomepageState createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<EventModel>>(
      future: widget.events,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return ListView.builder(
            itemCount: snapshot.data!.length,
            itemBuilder: (context, index) {
              return Card(
                color: Colors.lightGreenAccent,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(
                    Radius.circular(
                      17.5,
                    ),
                  ),
                  side: BorderSide(
                    style: BorderStyle.solid,
                    color: Colors.green,
                    width: 1,
                  ),
                ),
                margin: EdgeInsets.only(
                  left: 10,
                  right: 10,
                  top: 7.5,
                  bottom: 7.5,
                ),
                child: Container(
                  // height: 150,
                  child: Column(
                    children: <Widget>[
                      Column(
                        children: <Widget>[
                          ListTile(
                            leading: Container(
                              child: Column(
                                children: <Widget>[
                                  getIcon(snapshot.data![index].eventCategory),
                                  Text(
                                    "${snapshot.data![index].eventCategory}",
                                    style: TextStyle(
                                      color: Colors.grey,
                                    ),
                                  ),
                                ],
                              ),
                              margin: EdgeInsets.only(
                                top: 10.0,
                              ),
                            ),
                            title: Padding(
                              padding: const EdgeInsets.only(top: 12.0),
                              child: Text(
                                snapshot.data![index].eventName,
                                style: TextStyle(
                                  fontWeight: FontWeight.w700,
                                  fontSize: 18.0,
                                ),
                              ),
                            ),
                            subtitle: Container(
                              margin: EdgeInsets.only(top: 10.0),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Text(
                                        "Start Date: ",
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(snapshot.data![index].startDate),
                                    ],
                                  ),
                                  Column(
                                    mainAxisAlignment: MainAxisAlignment.end,
                                    children: [
                                      Text(
                                        "End Date: ",
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(snapshot.data![index].endDate),
                                    ],
                                  )
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      MaterialButton(
                        padding: EdgeInsets.all(7.5),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) {
                              return RegisterPage(
                                  key: Key(
                                      snapshot.data![index].eventId.toString()),
                                  event: snapshot.data![index]);
                            }),
                          );
                        },
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: <Widget>[
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Icon(
                                      Icons.person,
                                      color: Colors.blueGrey,
                                    ),
                                    Text("     Register Event"),
                                  ],
                                ),
                                Text(
                                  "Remain quota: " +
                                      snapshot.data![index].quota.toString(),
                                  style: TextStyle(
                                    color: Colors.black45,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        } else if (snapshot.hasError) {
          return Text("Has Error");
        }
        return CircularProgressIndicator();
      },
    );
  }
}
