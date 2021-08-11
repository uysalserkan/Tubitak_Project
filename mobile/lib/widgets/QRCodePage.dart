import 'package:flutter/material.dart';
import 'package:mobile/models/QRCodeModel.dart';

class QRCOdePage extends StatelessWidget {
  final QRCodeModel qrCode;
  const QRCOdePage({
    Key? key,
    required this.qrCode,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print("qrCode");
    print(qrCode.creationDate);

    return Scaffold(
      appBar: AppBar(
        title: Text("Save QRCode"),
        leading: IconButton(
          icon: Icon(Icons.exit_to_app),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Container(
        padding: EdgeInsets.only(top: 120),
        child: Column(
          children: <Widget>[
            ElevatedButton(
              child: Text('QR Code'),
              onPressed: () {
                Navigator.pop(context);
              },
            )
          ],
        ),
      ),
    );
  }
}
