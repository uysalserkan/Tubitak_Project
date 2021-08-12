import 'dart:convert';
import 'package:mobile/helpers/MessageResponse.dart';
import 'package:mobile/models/UserModel.dart';
import 'package:http/http.dart';

class UserAPI {
  final baseUrl = "http://10.0.2.2:8080/users/";

  Future<UserModel> getUser(String tcNo) async {
    var response = await get(Uri.parse(baseUrl + tcNo));

    var obj = jsonDecode(response.body);

    if (response.statusCode == 200) {
      return UserModel(
        firstName: obj["firstName"],
        lastName: obj["lastName"],
        tcNo: obj["tcNo"],
      );
    }
    return UserModel();
  }

  Future<MessageResponse> createUser(UserModel user) async {
    var response = await post(
      Uri.parse(baseUrl),
      body: jsonEncode(user),
      headers: {'Content-Type': 'application/json'},
    );

    final obj = jsonDecode(response.body);

    return new MessageResponse(
      message: obj["message"],
      messageResponseType: obj["messageResponseType"],
    );
  }

  Future<MessageResponse> registerUserToEvent(
      int eventId, UserModel userModel) async {
    // print("usermodel:::");
    // print(userModel.firstName);
    // print(userModel.lastName);
    // print(userModel.tcNo);
    // await post(
    //   Uri.parse(baseUrl),
    //   body: jsonEncode(userModel),
    //   headers: {'Content-Type': 'application/json'},
    // );

    var response = await post(
      Uri.parse(baseUrl + "${eventId.toString()}"),
      body: jsonEncode(userModel),
      // body: userModel.toJson(),
      headers: {'Content-Type': 'application/json'},
      // encoding: Encoding.getByName("UTF-8"),
    );

    final obj = jsonDecode(response.body);

    return new MessageResponse(
      message: obj["message"],
      messageResponseType: obj["messageResponseType"],
    );
  }
}
