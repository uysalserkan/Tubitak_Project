import 'package:flutter/material.dart';

class ScanQRCodePage extends StatefulWidget {
  const ScanQRCodePage({Key? key}) : super(key: key);

  @override
  _ScanQRCodePageState createState() => _ScanQRCodePageState();
}

class _ScanQRCodePageState extends State<ScanQRCodePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Scan QR Code'),
        centerTitle: true,
      ),
      body: Stack(
        children: <Widget>[
          TextButton(
            child: Text("Scan QR Code"),
            onPressed: () {
              print("QR Scan");
            },
          ),
        ],
      ),
    );
  }
}
