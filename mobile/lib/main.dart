import 'package:flutter/material.dart';
import 'package:mobile/APIs/EventAPI.dart';
import 'package:mobile/models/EventModel.dart';
import 'package:mobile/widgets/Homepage.dart';

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
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        leading: OutlinedButton(
          onPressed: () {
            print("buraya basıldığında QR tarama ekranı gelecek");
          },
          child: Icon(
            Icons.camera,
            color: Colors.white70,
          ),
        ),
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
