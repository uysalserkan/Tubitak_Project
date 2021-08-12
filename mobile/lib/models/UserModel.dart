// tcNo: String;
// firstName: String;
// lastName: String;

class UserModel {
  final tcNo;
  final firstName;
  final lastName;

  UserModel({this.tcNo, this.firstName, this.lastName});

  factory UserModel.fromJson(Map<String, String> json) {
    return new UserModel(
      tcNo: json["tcNo"],
      firstName: json["firstName"],
      lastName: json["lastName"],
    );
  }

  Map<String, String> toJson() => {
        'firstName': firstName,
        'lastName': lastName,
        'tcNo': tcNo,
      };

  // String toJson() {
  //   return "{" +
  //       "\"firstName\":" +
  //       "\"" +
  //       firstName.toString() +
  //       "\"" +
  //       "," +
  //       "\"lastName\":" +
  //       "\"" +
  //       lastName.toString() +
  //       "\"" +
  //       "," +
  //       "\"tcNo\":" +
  //       "\"" +
  //       tcNo.toString() +
  //       "\"" +
  //       "}";
  // }
}
