import 'package:flutter/material.dart';
import 'package:mobile/APIs/QRCodeAPI.dart';
import 'package:mobile/widgets/RegisteredEventPage.dart';

TextEditingController searchFiledController = new TextEditingController();

class SearchRegisteredDialogBox extends StatefulWidget {
  const SearchRegisteredDialogBox({Key? key}) : super(key: key);

  @override
  _SearchRegisteredDialogBoxState createState() =>
      _SearchRegisteredDialogBoxState();
}

class _SearchRegisteredDialogBoxState extends State<SearchRegisteredDialogBox> {
  var tcValid = false;
  final qrCodeAPI = new QRCodeAPI();

  @override
  void dispose() {
    super.dispose();
    tcValid = false;
    searchFiledController.text = "";
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(
          25.0,
        ),
      ),
      elevation: 0,
      backgroundColor: Colors.transparent,
      child: Stack(
        children: <Widget>[
          Text("sa"),
          Container(
            padding: EdgeInsets.all(25.0),
            margin: EdgeInsets.only(top: 15.0),
            decoration: BoxDecoration(
                shape: BoxShape.rectangle,
                color: Colors.white,
                borderRadius: BorderRadius.circular(25.0),
                boxShadow: [
                  BoxShadow(
                      color: Colors.black,
                      offset: Offset(0, 10),
                      blurRadius: 10),
                ]),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Text(
                  "Search Registered Events",
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
                ),
                SizedBox(
                  height: 15,
                ),
                TextField(
                  onChanged: (_) {
                    if (searchFiledController.text.length < 11) {
                      setState(() {
                        tcValid = false;
                      });
                    } else {
                      setState(() {
                        tcValid = true;
                      });
                    }
                  },
                  maxLength: 11,
                  controller: searchFiledController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: "T.C Number",
                    labelStyle: TextStyle(
                      fontSize: 18,
                    ),

                    hintText: "25110819980", // 25o<3ZS
                    icon: Icon(Icons.confirmation_number_rounded),
                    errorText: tcValid == true ? null : "Invalid TC Number",
                  ),
                ),
                SizedBox(
                  height: 22,
                ),
                Align(
                  alignment: Alignment.bottomRight,
                  child: TextButton(
                    onPressed: () {
                      if (tcValid == true) {
                        Navigator.push(context,
                            MaterialPageRoute(builder: (context) {
                          return RegisteredEventPage(
                              registeredEvents: qrCodeAPI.getAllQRCodes(
                            searchFiledController.text,
                          ));
                        }));
                      }
                    },
                    child: Text(
                      "Search",
                      style: TextStyle(fontSize: 18),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
