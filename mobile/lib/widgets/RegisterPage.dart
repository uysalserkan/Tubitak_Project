import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/models/QRCodeModel.dart';
import 'package:mobile/models/UserModel.dart';
import 'package:mobile/widgets/QRCodePage.dart';
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

class _RegisterPageState extends State<RegisterPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            tcValid = false;
            lastNameController.text = "";
            firstNameController.text = "";
            tcNoController.text = "";
            user = UserModel();
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
                      tcValid = false;
                      lastNameController.text = "";
                      firstNameController.text = "";
                      tcNoController.text = "";
                      user = UserModel();
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
                          tcValid = false;
                        });
                      } else {
                        userAPI.getUser(userTcNo).then(
                              (value) => {
                                if (value.firstName != null &&
                                    value.lastName != null &&
                                    value.tcNo != null)
                                  {
                                    setState(
                                      () {
                                        user = value;
                                        tcValid = true;
                                        isRegistered = true;
                                        firstNameController.text =
                                            value.firstName;
                                        lastNameController.text =
                                            value.lastName;
                                        tcNoController.text = value.tcNo;
                                      },
                                    )
                                  }
                                else
                                  {
                                    setState(
                                      () {
                                        user = new UserModel();
                                        isRegistered = false;
                                        tcValid = true;
                                        firstNameController.text = "";
                                        lastNameController.text = "";
                                        tcNoController.text = "";
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
                  // if (tcValid && isRegistered && user != null)
                  //   ElevatedButton(
                  //     onPressed: () {},
                  //     child: Text("Get QRCode"),
                  //     style: ButtonStyle(
                  //       backgroundColor: MaterialStateProperty.all(
                  //         Colors.blueAccent,
                  //       ),
                  //     ),
                  //   )
                  // else
                  if (tcValid
                      // && !isRegistered
                      &&
                      user != null)
                    ElevatedButton(
                      onPressed: () {
                        var xyz = userAPI.registerUserToEvent(
                            widget.event.eventId, user);
                        print("xyz");
                        print(xyz);
                        print("xyz.message");
                        print(xyz.asStream().first);
                        Navigator.push(context,
                            MaterialPageRoute(builder: (context) {
                          return QRCOdePage(
                            qrCode: new QRCodeModel(),
                          );
                        }));
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
