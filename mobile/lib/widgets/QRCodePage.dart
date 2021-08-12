import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:mobile/helpers/MessageResponse.dart';
import 'package:mobile/models/QRCodeModel.dart';
import 'package:path_provider/path_provider.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';

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
  final qrKey = GlobalKey();
  File? file;
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
            RepaintBoundary(
              key: qrKey,
              child: QrImage(
                // data: "${widget.qrData.toJson()}",
                data: "${jsonEncode(widget.qrData)}",
                size: 256,
              ),
            ),
            ElevatedButton(
              child: Text('Save QR Code'),
              onPressed: () async {
                widget.clearSectors();
                print("saving qr code");
                try {
                  RenderRepaintBoundary boundary = qrKey.currentContext!
                      .findRenderObject() as RenderRepaintBoundary;

                  var image = await boundary.toImage();

                  ByteData? byteData =
                      await image.toByteData(format: ImageByteFormat.png);

                  Uint8List pngBytes = byteData!.buffer.asUint8List();
                  final appDir = await getApplicationDocumentsDirectory();
                  var datetime = new DateTime.now();

                  file = await File("${appDir.path}/$datetime.png").create();
                  await file?.writeAsBytes(pngBytes);

                  await Share.shareFiles(
                    [file!.path],
                    mimeTypes: ["image/png"],
                    text: "Share the QR Code",
                  );
                } catch (e) {
                  print("::e::");
                  print(e);
                }
                // Navigator.pop(context);
                // Navigator.popUntil(context, (route) => route.isFirst);
              },
            ),
            ElevatedButton(onPressed: () {}, child: Text("Add Remainder"))
          ],
        ),
      ),
    );
  }
}
