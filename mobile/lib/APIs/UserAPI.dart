import 'dart:convert';
import 'package:mobile/helpers/MessageResponse.dart';
import 'package:mobile/models/UserModel.dart';
import 'package:http/http.dart';

class UserAPI {
  final BASE_URL = "http://10.0.2.2:8080/users/";

  Future<UserModel> getUser(String tcNo) async {
    var response = await get(Uri.parse(BASE_URL + tcNo));

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

  Future<MessageResponse> registerUserToEvent(
      int eventId, UserModel userModel) async {
    var response = await post(
      Uri.parse(BASE_URL + "${eventId.toString()}"),
      body: jsonEncode(userModel),
      headers: {'Content-Type': 'application/json'},
      // encoding: Encoding.getByName("UTF-8"),
    );

    print("toJson Output");
    print(userModel.toJson());

    final obj = jsonDecode(response.body);

    print("obj.message");
    print(obj['message']);

    print("obj.type");
    print(obj['messageResponseType']);

    return new MessageResponse(
      message: obj["message"],
      messageResponseType: obj["messageResponseType"],
    );
  }
}
