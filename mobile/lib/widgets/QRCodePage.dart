import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/helpers/MessageResponse.dart';
import 'package:mobile/models/QRCodeModel.dart';
import 'package:qr_flutter/qr_flutter.dart';

Future<String> getQRData(QRCodeModel model) async {
  print("QRDATAGET:::");
  print(model.creationDate);
  print(model.eventName);
  print(model.firstName);
  print(model.lastName);
  // return jsonEncode(model);
  return "";
}

class QRCOdePage extends StatefulWidget {
  final eventId;
  final tcNo;
  final QRCodeModel qrCode;
  final clearSectors;
  final MessageResponse messageResponse;
  final QRCodeModel qrData;
  const QRCOdePage({
    Key? key,
    required this.qrCode,
    required this.clearSectors,
    required this.eventId,
    required this.tcNo,
    required this.messageResponse,
    required this.qrData,
  }) : super(key: key);

  @override
  _QRCOdePageState createState() => _QRCOdePageState();
}

class _QRCOdePageState extends State<QRCOdePage> {
  // final qrCodeAPI = new QRCodeAPI();
  // QRCodeModel qrCodeModel = new QRCodeModel(
  //   creationDate: "",
  //   eventId: "",
  //   eventName: "",
  //   firstName: "",
  //   lastName: "",
  //   userTcNo: "",
  // );

  // @override
  // void initState() {
  //   super.initState();
  //   print("bu ne zman?::::::::");
  //   var response =
  //       qrCodeAPI.getQRCode(this.widget.eventId.toString(), this.widget.tcNo);
  //   response.then((value) => {qrCodeModel = value});
  // }

  @override
  Widget build(BuildContext context) {
    // print("qrCode");
    // print(qrCode.creationDate);

    // print("Message Response");
    // print(widget.messageResponse.message);

    // var response =
    //     qrCodeAPI.getQRCode(this.widget.eventId.toString(), this.widget.tcNo);
    // response.then((value) => {qrCodeModel = value});

    // Timer(Duration(seconds: 1), () {
    //   print("1 saniye sonra qrCodeModel");
    //   print(qrCodeModel.eventName);
    //   print(qrCodeModel.eventId);
    //   print(qrCodeModel.creationDate);
    //   print(qrCodeModel.firstName);
    //   print(qrCodeModel.lastName);
    //   print(qrCodeModel.userTcNo);

    //   getQRData(qrCodeModel);
    // });

    // setState(() {
    //   print("bu ne zaman çalışıyor::");

    //   Timer((Duration(milliseconds: 500)), () {
    //     print(qrCodeModel.eventName);
    //     qrCodeModel = qrCodeModel;
    //   });
    // });

    // print(jsonEncode(qrCodeModel));

    // print("qrData");
    // print(widget.qrData);
    // print(widget.qrData.eventName);
    // print(widget.qrData.firstName);
    // print(widget.qrData.userTcNo);

    return Scaffold(
      appBar: AppBar(
        title: Text("Save QRCode"),
        leading: IconButton(
          icon: Icon(Icons.exit_to_app),
          onPressed: () {
            widget.clearSectors();
            Navigator.popUntil(context, (route) => route.isFirst);
          },
        ),
      ),
      body: Container(
        alignment: Alignment.center,
        padding: EdgeInsets.only(top: 120),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            QrImage(
              // data: "${widget.qrData.toJson()}",
              data: "${jsonEncode(widget.qrData)}",
              size: 256,
            ),
            ElevatedButton(
              child: Text('Save QR Code'),
              onPressed: () {
                widget.clearSectors();
                // Navigator.pop(context);
                // Navigator.popUntil(context, (route) => route.isFirst);
              },
            )
          ],
        ),
      ),
    );
  }
}
