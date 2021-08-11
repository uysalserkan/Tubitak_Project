import 'package:flutter/material.dart';
import 'package:mobile/APIs/EventAPI.dart';
import 'package:mobile/widgets/Homepage.dart';
import 'package:mobile/widgets/SearchRegisteredDialogBox.dart';

EventAPI eventAPI = new EventAPI();

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'uysalserkan08',
      theme: ThemeData(
        primaryColor: Color(0XFF609491),
        // primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Events App | Tubitak '),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
        leading: OutlinedButton(
          onPressed: () {
            // QR Code Scanner
          },
          child: Icon(
            Icons.camera,
            color: Colors.white70,
          ),
        ),
        actions: <Widget>[
          IconButton(
            onPressed: () {
              showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return SearchRegisteredDialogBox();
                  });
            },
            icon: Icon(Icons.list_alt_outlined),
          )
        ],
      ),
      body: Homepage(
        events: eventAPI.getEvents(),
      ),
      /* floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),*/
    );
  }
}
