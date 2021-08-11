import 'package:flutter/material.dart';
import 'package:mobile/models/EventModel.dart';

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

class RegisteredEventPage extends StatefulWidget {
  final registeredEvents;
  const RegisteredEventPage({
    Key? key,
    required this.registeredEvents,
  }) : super(key: key);

  @override
  _RegisteredEventPageState createState() => _RegisteredEventPageState();
}

class _RegisteredEventPageState extends State<RegisteredEventPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Registered Events"),
          centerTitle: true,
          leading: IconButton(
            icon: Icon(Icons.arrow_back_ios_new_outlined),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
        body: FutureBuilder<List<EventModel>>(
          future: widget.registeredEvents,
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
                                      getIcon(
                                          snapshot.data![index].eventCategory),
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
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
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
                                        mainAxisAlignment:
                                            MainAxisAlignment.end,
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
                        ],
                      ),
                    ),
                  );
                },
              );
            } else if (snapshot.hasError) {
              return Text("Has Error" + snapshot.toString());
            }
            return CircularProgressIndicator();
          },
        )

        //  widget.registeredEvents,
        );
  }
}
