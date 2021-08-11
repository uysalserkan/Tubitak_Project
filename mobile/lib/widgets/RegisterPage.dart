import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/helpers/MessageResponse.dart';
import 'package:mobile/models/QRCodeModel.dart';
import 'package:mobile/models/UserModel.dart';
import 'package:mobile/widgets/QRCodePage.dart';
import 'package:mobile/APIs/QRCodeAPI.dart';

import '../APIs/UserAPI.dart';

var isRegistered = false;
var firstname;
var lastname;
var userTcNo;
var tcValid = true;
final userAPI = new UserAPI();
var user;
TextEditingController firstNameController = new TextEditingController();
TextEditingController lastNameController = new TextEditingController();
TextEditingController tcNoController = new TextEditingController();

class RegisterPage extends StatefulWidget {
  final event;

  const RegisterPage({Key? key, required this.event}) : super(key: key);

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

// void xxclearSectors() {
//   tcValid = true;
//   lastNameController.text = "";
//   firstNameController.text = "";
//   tcNoController.text = "";
//   user = UserModel();
// }

class _RegisterPageState extends State<RegisterPage> {
  final qrCodeAPI = new QRCodeAPI();
  QRCodeModel qrCodeModel = new QRCodeModel(
    creationDate: "",
    eventId: "",
    eventName: "",
    firstName: "",
    lastName: "",
    userTcNo: "",
  );

  Future<void> clearSectors() async {
    setState(() {
      lastNameController.text = "";
      firstNameController.text = "";
      tcNoController.text = "";
      user = UserModel();
    });
  }

  Future<void> clearNames() async {
    setState(() {
      lastNameController.text = "";
      firstNameController.text = "";
      user = UserModel();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            clearSectors();
            Navigator.pop(context);
          },
        ),
        title: Text(widget.event.eventName),
        backgroundColor: Color(0XFF205473),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.only(top: 50),
        child: Padding(
          padding: const EdgeInsets.all(18.0),
          child: Column(
            children: <Widget>[
              TextFormField(
                initialValue: widget.event.eventId.toString(),
                readOnly: true,
                textAlign: TextAlign.center,
                decoration: InputDecoration(
                  labelText: "Event ID",
                  labelStyle: TextStyle(
                    fontSize: 18,
                  ),
                ),
              ),
              TextFormField(
                initialValue: widget.event.eventName.toString(),
                readOnly: true,
                textAlign: TextAlign.center,
                decoration: InputDecoration(
                  labelText: "Event Name",
                  labelStyle: TextStyle(
                    fontSize: 18,
                  ),
                ),
              ),
              TextField(
                // enabled: false,
                // controller: TextEditingController(),

                keyboardType: TextInputType.number,
                onChanged: (value) {
                  setState(() {
                    userTcNo = value;
                  });
                },
                maxLength: 11,
                controller: tcNoController,
                decoration: InputDecoration(
                  labelText: "T.C Number",
                  labelStyle: TextStyle(
                    fontSize: 18,
                  ),
                  hintText: "25110819980",
                  icon: Icon(Icons.confirmation_number),
                  errorText: tcValid == true ? null : "Invalid TC Number",
                ),
              ),
              TextField(
                controller: firstNameController,
                enabled: !isRegistered,
                keyboardType: TextInputType.text,
                decoration: InputDecoration(
                  labelText: "First Name",
                  labelStyle: TextStyle(
                    fontSize: 18,
                  ),
                  hintText: "Serkan", // ZSo<3
                  icon: Icon(Icons.first_page),
                ),
              ),
              TextField(
                controller: lastNameController,
                enabled: !isRegistered,
                keyboardType: TextInputType.text,
                decoration: InputDecoration(
                  labelText: "Last Name",
                  labelStyle: TextStyle(
                    fontSize: 18,
                  ),
                  hintText: "UYSAL", // 25o<3ZS
                  icon: Icon(Icons.last_page),
                ),
              ),
              ButtonBar(
                alignment: MainAxisAlignment.spaceAround,
                children: <Widget>[
                  ElevatedButton(
                    onPressed: () {
                      clearSectors();
                      Navigator.pop(context);
                    },
                    child: Text("Cancel"),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(
                        Colors.red,
                      ),
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      if (userTcNo == null || userTcNo.length < 11) {
                        setState(() {
                          clearSectors();
                        });
                      } else {
                        userAPI.getUser(userTcNo).then(
                              (value) => {
                                if (value.firstName != null &&
                                    value.lastName != null &&
                                    value.tcNo != null)
                                  {
                                    setState(() {
                                      user = value;
                                      tcValid = true;
                                      isRegistered = true;
                                      firstNameController.text =
                                          value.firstName;
                                      lastNameController.text = value.lastName;
                                      tcNoController.text = value.tcNo;
                                    }),
                                  }
                                else
                                  {
                                    setState(
                                      () {
                                        isRegistered = false;
                                        tcValid = true;
                                        clearNames();
                                        // clearSectors();
                                      },
                                    )
                                  }
                              },
                            );
                      }
                    },
                    child: Text("Check"),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(
                        Colors.lightBlueAccent,
                      ),
                    ),
                  ),
                  if (tcValid
                      // && !isRegistered
                      &&
                      user != null)
                    ElevatedButton(
                      onPressed: () {
                        MessageResponse returnMessage = new MessageResponse(
                            message: "", messageResponseType: "");
                        userAPI
                            .registerUserToEvent(widget.event.eventId, user)
                            .then((value) => {
                                  returnMessage = value,
                                });

                        // print("returnMessage");
                        // print(returnMessage);
                        // // print(returnMessage.asStream());
                        // returnMessage.map((event) => {
                        //       print("event"),
                        //       print(event),
                        //       returnMessage = event,
                        //     });

                        // print("returnMessage::::");
                        // print(returnMessage.message);
                        var response = qrCodeAPI.getQRCode(
                          widget.event.eventId.toString(),
                          tcNoController.text,
                        );
                        response.then((value) =>
                            {qrCodeModel = value, print(qrCodeModel)});

                        Future.delayed(Duration(milliseconds: 300), () {
                          Navigator.push(context,
                              MaterialPageRoute(builder: (context) {
                            return QRCOdePage(
                              qrCode: new QRCodeModel(),
                              clearSectors: clearSectors,
                              eventId: widget.event.eventId,
                              tcNo: tcNoController.text,
                              messageResponse: returnMessage,
                              qrData: qrCodeModel,
                            );
                          }));
                        });
                      },
                      child: Text("Register"),
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(
                          Colors.blueAccent,
                        ),
                      ),
                    ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
